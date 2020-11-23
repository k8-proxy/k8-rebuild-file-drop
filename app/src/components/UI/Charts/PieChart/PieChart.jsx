import React from "react";
import { PieChart, Pie, Legend } from "recharts";

import "./pieGraph.scss";
import colours from "../../../../data/charts/colours.json";

/*
* TODO cyclic (chain detection) * FIXED *
*  1 hour
  {
    "date": "22",
    "Blocked By NCFS": 5,
    "Blocked By Policy": 120,
    "Allowed By Policy": 500,
    "Allowed By NCFS": 100,
    "safe": 5
  },
*
*/

/*
* TODO horizontal for >= 3 (resolution) * FIXED *
*  1 hour
  {
    "date": "22",
    "Blocked By NCFS": 15000,
    "Blocked By Policy": 1,
    "Allowed By Policy": 2,
    "Allowed By NCFS": 100,
    "safe": 55000
  },
*
*/


/*
* TODO horizontal for 2 (resolution) * FIXED *
*  1 hour
  {
    "date": "22",
    "Blocked By NCFS": 15000,
    "Blocked By Policy": 1,
    "Allowed By Policy": 2,
    "Allowed By NCFS": 10000,
    "safe": 55000
  },
*
*/


/*
* TODO horizontal long values (overlap detection, chain detection) * FIXED *
*  1 hour
  {
    "date": "22",
    "Blocked By NCFS": 10000,
    "Blocked By Policy": 1,
    "Allowed By Policy": 2,
    "Allowed By NCFS": 10000,
    "safe": 55000
  },
*
*/


/*
* TODO 45 degree (resolution? detection?) * FIXED *
*  1 hour
  {
    "date": "22",
    "Blocked By NCFS": 150,
    "Blocked By Policy": 15,
    "Allowed By Policy": 2,
    "Allowed By NCFS": 500,
    "safe": 900
  },
*
*/


/*
* TODO 135 degree (resolution? detection?) * FIXED *
*  1 hour
  {
    "date": "22",
    "Blocked By NCFS": 500,
    "Blocked By Policy": 15,
    "Allowed By Policy": 2,
    "Allowed By NCFS": 150,
    "safe": 900
  },
*
*/


/*
* TODO 270 degree * FIXED *
*  1 hour
  {
    "date": "22",
    "Blocked By NCFS": 1500,
    "Blocked By Policy": 15,
    "Allowed By Policy": 2,
    "Allowed By NCFS": 150,
    "safe": 300
  },
*
*/



const PieGraph = ({ rawData, labelInnerGapDegree = 1 }) => {
	const {max, min, abs, atan, round, PI, cos, sin} = Math;

	// Pie dimensions
	const chartWidth = 400;
	const chartHeight = 360;
	// const cx = chartWidth / 2;
	// const cy = chartHeight / 2;

	// internal settings of chart
	const initialAngle = 0; //PI / 2;
	const textScale = 1;
	const labelHeight = 22 / textScale;
	const charWidth = 9 / textScale;
	const outerLabelMargin = 20; // pixels - minimal gap between pie outer border to any label corner
	// const outerReferenceRadius = 1 + outerLabelMargin / textScale;
	const epsilon = 1e-5;
	const innerLabelCenterCircle = 0.5; // normalized to 1
	const outerRadius = 100;

	// for initialization only
	const x = 0;
	const y = 0;

	// Pie's data
	let labelMetrics
	let data;

	{
		// Pie raw data pre-processing
		let seriesTotal = 0;
		// minimal gap for fitting label in the sector. If not fit - use outer reference
		const labelInnerGap = 0; //labelInnerGapDegree * PI / 180;
		if (rawData && rawData.length) {
			data = colours
				.map((entry) => {
					let entries = Object.keys(entry);
					if (entries.length > 0) {
						const series = entries[0];
						const value = rawData.reduce((sum, spot) => sum + parseFloat(spot[series]) || 0, 0);
						const name = series[0].toUpperCase() + series.slice(1); // capitalize
						const fill = entry[series];
						return {
							value,
							name,
							fill
						};
					}
					return null;
				})
				.filter((d) => {
					if (d) {
						seriesTotal += d.value;
					}
					return d;
				});
		}

		const angles = data.map((series) => (series.value / seriesTotal) * PI * 2);

		labelMetrics = data.reduce((o, series, index) => {
			const startAngle = index > 0 ? o[index - 1].endAngle : initialAngle;
			const angle = angles[index];
			const endAngle = startAngle + angle;
			const midAngle = (startAngle + endAngle) / 2;
			const { name, fill } = series;
			const labelWidth = data[index].value.toString().length * charWidth;
			const coords = {
				tl: { x, y },
				tr: { x, y },
				bl: { x, y },
				br: { x, y },
				c: { x, y },
			};
			coords.bl.x = coords.tl.x = -labelWidth / 2;
			coords.bl.y = coords.br.y = labelHeight / 2;
			coords.br.x = coords.tr.x = labelWidth / 2;
			coords.tl.y = coords.tr.y = -labelHeight / 2;

			let hShift = cos(-midAngle) < 0;
			const basePoint = "b" + (hShift ? "r" : "l");

			const fitRect = moveToPolar(coords, {
				midAngle,
				r: innerLabelCenterCircle * outerRadius,
				clone: true
			});
			let fit = true;

			Object.values(fitRect).some((corner) => {
				let cornerAngle = angleByCoords(corner);

				if (cornerAngle + initialAngle < startAngle + labelInnerGap || cornerAngle + initialAngle > endAngle - labelInnerGap) {
					fit = false;
					return true;
				}
				return false;
			});

			o[index] = {
				index,
				angle,
				endAngle,
				midAngle,
				startAngle,
				coords,
				name,
				basePoint,
				labelWidth,
				fit,
				fill
			};
			return o;
		}, {});
	}

	const seriesCount = data.length;

	// explicit breaking flag to prevent accidentally un-ended loop
	let watchdog = 10;
	let vectors = {};
	let clones = {};
	let chains = {};
	let notDone = false;

	// iterative overlapping chain resolution
	do {
		const { overlapChains, done } = overlapStep(chains);
		if (!done) {
			chains = overlapChains
		}
		notDone = !done && watchdog-- > 0;
	} while ( notDone )

	// final moving labels to resolved positions
	Object.keys(labelMetrics).forEach(index => {
		const { coords, basePoint, fit } = labelMetrics[index];
		if (!fit) {
			toCorner(coords, basePoint, coords.c);
		}
		const vector = vectors[index];
		if (vector) {
			moveTo(coords, vector);
		}
	})

	// one step for resolution
	function overlapStep(previousChains) {
		const { overlapChains, done } = hasOverlapping(previousChains);

		if (!done) {
			Object.keys(overlapChains).forEach(startIndex => {
				const chainLength = overlapChains[startIndex];
				startIndex = parseInt(startIndex);
				const { resolution}  = resolveOverlapping({ startIndex, chainLength });
				for (let index = 0; index < chainLength; index++) {
					let cyclicIndex = (index + startIndex) % seriesCount;
					const currentSeries = labelMetrics[cyclicIndex];
					if (resolution[cyclicIndex]) {
                        const {left} = resolution[cyclicIndex]
						let vector = vectors[cyclicIndex];
                        if (!vector) {
                        	vector = vectors[cyclicIndex] = { x, y };
						}
						vectorMoveTo(vector, resolution[cyclicIndex]);
                        moveTo(clones[cyclicIndex], resolution[cyclicIndex]);
                        if (left === true) {
							const swapMove = { x: -currentSeries.labelWidth };
							moveTo(clones[cyclicIndex], swapMove)
							currentSeries.basePoint = 'br';
                        } else if (left === false) {
                        	currentSeries.basePoint = 'bl';
						}
                    }
				}
			});
		}
		return { overlapChains, done }
	}

	// detects whether overlapped labels exists or not
	function hasOverlapping(previousChain) {
		let overlapChains = {...previousChain};
		let changesMade = false;
		let index = 0;
		let nextSeries = null;
		let nextIndex;
		let nextClone = null;
		let currentClone = null;
		let nextFit = null;
		const chainedSeries = {}
		// debugger;
		Object.keys(previousChain).forEach(chainStartIndex => {
			chainStartIndex = parseInt(chainStartIndex);
			const chainLength = previousChain[chainStartIndex];
			for (let index = 0; index < chainLength ; index++) {
				chainedSeries[(index + chainStartIndex) % seriesCount] = true;
			}
		})
		let chainStartIndex = null;
		do {
			// take into account cyclic dependency
			const currentIndex = (index + seriesCount) % seriesCount;
			const currentSeries = labelMetrics[currentIndex];
			const currentFit = currentSeries.fit;
			nextIndex = (1 + index) % seriesCount;
			nextSeries = labelMetrics[nextIndex];
			const { fit } = nextSeries;
			nextFit = fit;

			if (chainedSeries[currentIndex]) {
				if (chainStartIndex === null) {
					chainStartIndex = nextIndex;
				}
			}
			if (currentFit === false && (
				nextFit === false && (!chainedSeries[nextIndex] || (!chainedSeries[currentIndex] && chainedSeries[nextIndex]))
				)
			) {
				currentClone = nextClone || clones[currentIndex] ||  moveToOuterPostion(currentSeries, { clone: true });
				nextClone = clones[nextIndex] || moveToOuterPostion(nextSeries, { clone: true });
				const overlapping = isOverlapping(currentClone, nextClone);
				if (overlapping) {
					clones[currentIndex] = currentClone;
					clones[nextIndex] = nextClone;
					chainedSeries[currentIndex] = true;
					chainedSeries[nextIndex] = true;
					changesMade = true;
					const {backwardIndex, forwardIndex, chainsToRemove} = rescanChainSeries({
						overlapChains,
						chainedSeries,
						currentIndex,
						nextIndex
					});

					Object.keys(chainsToRemove).forEach(key => {
						delete overlapChains[key];
					})
					chainStartIndex = backwardIndex % seriesCount;
					overlapChains[chainStartIndex] = (forwardIndex - backwardIndex + seriesCount) % seriesCount + 1;

				} else {
					chainStartIndex = null;
				}
			} else {
				chainStartIndex = null;
				if (nextFit === true) {
					nextClone = null;
				}
			}
		} while ( index++ < seriesCount - 1 );
		return { overlapChains, done: !changesMade };
	}

	// if happens some changes to overlapped labels chains - do reconfigure
	function rescanChainSeries({
        overlapChains,
		chainedSeries,
        currentIndex,
        nextIndex
	}) {
		let backwardIndex = currentIndex;
		let forwardIndex = nextIndex;
		let stopMachine;
		const chainsToRemove = {};
		do {
			stopMachine = true;
            let nextIndex = (backwardIndex - 1) % seriesCount;
			if (chainedSeries[nextIndex]) {
				backwardIndex = nextIndex;
				stopMachine = false;
				if (overlapChains[backwardIndex]) {
				    chainsToRemove[backwardIndex] = true;
                }
			}
            nextIndex = (forwardIndex + 1) % seriesCount;
            if (chainedSeries[nextIndex]) {
				stopMachine = false;
				forwardIndex = nextIndex;
                if (overlapChains[forwardIndex]) {
                    chainsToRemove[forwardIndex] = true;
                }
			}
		} while ( !stopMachine )
		return {backwardIndex, forwardIndex, chainsToRemove};
	}

	// retrieves an array of required corners/center or ever its coordinates
	// predicate allows to perforem fine selection
	function aggregator(point, { axis, predicate, startIndex, chainLength } = {}) {
		const points = []
		for (let index = 0; index < chainLength; index++) {
			if (predicate && !predicate(index)) {
				continue;
			}
			let cyclicIndex = (index + startIndex) % seriesCount;
			// if (!clones[cyclicIndex]) {
			// 	debugger;
			// }
			if (!axis) {
				points.push(clones[cyclicIndex][point])
			} else {
				points.push(clones[cyclicIndex][point][axis])
			}
		}
		return points;
	}

     // finds new labels' positions, to resolve mutual overlapping for given chain
    function resolveOverlapping({ startIndex, chainLength }) {
		debugger
		let averageAngle = getAverageAngle({ startIndex, chainLength });

		let {vertical, horizontal, skew, left, bottom} = getPlacementZones(averageAngle);
        const resolution = {};
		const centeredBound = (chainLength - 1) / 2;
		const seriesToStay = {};
		const seriesToSwap = {};
		const seriesToSecondFloor = {};
		let secondFloorStartIndex = null;
		let swapStartIndex = null;

		if (skew) {
			vertical = true;
			if (bottom) {
				if (left) {
					const cyclicIndex = (startIndex + chainLength - 1) % seriesCount;
					seriesToSwap[cyclicIndex] = true;
					resolution[cyclicIndex] = { left: false, x: 0 };
				} else {
					resolution[startIndex] = { left: true, x: -20, skipLevel: true };
				}
			}
		}

		const inverse = ((vertical && left) || (horizontal && bottom) || (skew && bottom && left)) ? -1 : 1;
		if (horizontal) {
			// debugger;
			const horizontalGap = 6;

			let noFloor = chainLength <= 2;
			for (let index = 0; index < chainLength; index++) {
				const currentIndex = (index + startIndex) % seriesCount;
				let distanceToCentered = abs(index - centeredBound);
				const currentSign = (index !== centeredBound)
					? round((index - centeredBound) / distanceToCentered)
					: 0
				if (currentSign === -1 ) {
					if (!bottom || (distanceToCentered >= 1) || noFloor) {
						seriesToStay[currentIndex] = true;
					} else {
						seriesToSecondFloor[currentIndex] = true;
						if (secondFloorStartIndex === null) {
							secondFloorStartIndex = currentIndex;
						}
					}
				} else if (currentSign === 1) {
					if (!bottom || (distanceToCentered >= 1) || noFloor) {
						seriesToSwap[currentIndex] = true;
						if (swapStartIndex === null) {
							swapStartIndex = currentIndex;
						}
					} else {
						seriesToSecondFloor[currentIndex] = true;
						if (secondFloorStartIndex === null) {
							secondFloorStartIndex = currentIndex;
						}
					}
				} else {
					const { c } = clones[currentIndex];
					const centerQuadrant = getQuadrant(c);
					if (bottom && !noFloor) {
						seriesToSecondFloor[currentIndex] = true;
						if (secondFloorStartIndex === null) {
							secondFloorStartIndex = currentIndex;
						}
					} else if (centerQuadrant % 2 === 0) {
						seriesToStay[currentIndex] = true;
					} else {
						seriesToSwap[currentIndex] = true;
						if (swapStartIndex === null) {
							swapStartIndex = currentIndex;
						}
					}
				}
			}
			const stayLength = Object.keys(seriesToStay).length;
			let accumulatorX = 0
			const secondFloorLength = Object.keys(seriesToSecondFloor).length
			let multiFloorMargin = 0
			const secondFloorHeight = labelHeight;
			if (secondFloorLength) {
				multiFloorMargin = 5;
			}
			if (secondFloorStartIndex) {
				const secondFloorGap = horizontalGap / 2;
				let symmetricAdjustment = 0;
				if (secondFloorLength > 1) {
					symmetricAdjustment = aggregator('bl', {axis: 'x', startIndex: secondFloorStartIndex, chainLength: secondFloorLength})
						.reduce((delta, x) => delta - x);
				}
				for (let index = 0; index < secondFloorLength; index++) {
					const currentIndex = (secondFloorStartIndex + index + seriesCount) % seriesCount;
					const seriesResolution = { y: secondFloorHeight + multiFloorMargin };
					if (secondFloorLength > 1) {
						seriesResolution.left = index === 0;
						seriesResolution.x = (index === 0 ? -secondFloorGap : secondFloorGap) + symmetricAdjustment;
					}
					resolution[currentIndex] = seriesResolution;
				}
			}

			for (let index = 0; index < stayLength; index++) {
				const currentIndex = (swapStartIndex - 1 - secondFloorLength - index + seriesCount) % seriesCount;
				let gap = horizontalGap;
				if (!index && !secondFloorLength) {
					gap /= 2;
				} else if (secondFloorLength) {
					gap *= 2;
				}
				accumulatorX += gap;
				resolution[currentIndex] = {
					y: multiFloorMargin,
					x: accumulatorX * inverse,
					left: inverse === -1
				};
				// for next item
				// if (!clones[currentIndex]) {
				// 	debugger;
				// }
				accumulatorX += clones[currentIndex].br.x - clones[currentIndex].bl.x
			}

			const swapLength = Object.keys(seriesToSwap).length;
			if (swapStartIndex !== null) {
				accumulatorX = 0;
				for (let index = 0; index < swapLength;  index++) {
					const currentIndex = (swapStartIndex + index) % seriesCount;
					let gap = horizontalGap;
					if (!index && !secondFloorLength) {
						gap /= 2;
					} else if (secondFloorLength) {
						gap *= 2;
					}
					accumulatorX += gap;
					resolution[currentIndex] = {
						y: multiFloorMargin,
						x: accumulatorX * -inverse,
						left: inverse === 1
					};
					// if (!clones[currentIndex]) {
					// 	debugger;
					// }
					accumulatorX += clones[currentIndex].br.x - clones[currentIndex].bl.x
				}
			} else {
				// something goes wrong
				// debugger;
			}
		}

        if (vertical) {
        	debugger;
			const bottomY = aggregator('bl', { axis: 'y', startIndex, chainLength }).reduce((maxY, y) => max(maxY, y));
			const bottomLefts = aggregator('bl', { startIndex, chainLength });
			const topRights = aggregator('tr', { startIndex, chainLength });
			const totals = bottomLefts.reduce((t, bl, index) => {
				const tr = topRights[index]
				t.y += abs(bl.y - tr.y)
				return t;
			}, {y})

            const topY = aggregator('tl', { axis: 'y', startIndex, chainLength }).reduce((minY, y) => min(minY, y));
            const discrepancy = topY + totals.y - bottomY;
			const levelHeight = labelHeight;
			const globalLeft = left;

			let nextLevel;
			if (bottom || left) {
				nextLevel = topY + labelHeight - discrepancy / 2;
				if (skew) {
					nextLevel += left ? labelHeight : 2 * levelHeight;
				}
			} else {
				nextLevel = bottomY + discrepancy / 2;
			}
            for (let index = 0; index < chainLength; index++) {
                const currentIndex = (index + startIndex) % seriesCount;
                let deltaY = 0;
                let deltaX = 0;
                if (seriesToSwap[currentIndex]) {
                	deltaY = nextLevel - levelHeight;
                	deltaX = 20;
				} else {
					const {bl: {y}} = clones[currentIndex];
					deltaY = y;
				}
                let {left, x, skipLevel} = resolution[currentIndex] || {};
				if (typeof left === 'undefined') {
					left = globalLeft;
				}

                resolution[currentIndex] = {
					x: deltaX + x,
					y: nextLevel - deltaY,
					left
				}
				if (!skipLevel) {
					nextLevel -= inverse * levelHeight;
				}
            }
        }
        return {resolution, align: false};
	}

	// for several overlapped labels calculates it's average angle
	function getAverageAngle({ startIndex, chainLength }) {
		let averageAngle = 0;
		let normalizeAngle = null;
		for (let index = 0; index < chainLength; index++) {
			const currentIndex = (index + startIndex) % seriesCount;
			let { midAngle } = labelMetrics[currentIndex];
			if (normalizeAngle == null) {
				normalizeAngle = midAngle <= PI;
			} else {
				if (normalizeAngle && midAngle > PI) {
					midAngle = 2 * PI - midAngle;
				} else if (!normalizeAngle && midAngle <= PI) {
					midAngle += 2 * PI;
				}
			}
			averageAngle += midAngle;
		}
		return averageAngle / chainLength;
	}

	// detect extended info about where overlapping happens
	function getPlacementZones(angle) {
		if (angle < 0) {
			angle += PI;
		}
		// defines zone width where perform different processing
		// ie angles from -30...30 degrees will be moved vertical only
		// const skewDegree = 22.5;
		const skewDegree = 30;
		const skewBound = cos(skewDegree * PI / 180);
		const sinAngle = sin(angle);
		const cosAngle = cos(angle);
		let vertical, horizontal, left, right, skew, top, bottom;

		if (abs(cosAngle) > skewBound) {
			vertical = true;
		} else if (abs(sinAngle) > skewBound) {
			horizontal = true;
		} else {
			skew = true;
		}
		if (sinAngle > 0) {
			top = true;
		} else {
			bottom = true;
		}
		if (cosAngle > 0) {
			right = true
		} else {
			left = true;
		}
		return {vertical, horizontal, skew, left, right, top, bottom};
	}

	// check if the point is inside of the rectangle
	function isInside(point, rect) {
        const epsilon = 1e-2;
		const { bl, tr } = rect;
		const { x, y } = point;

		return (
			x + epsilon > bl.x &&
			x - epsilon < tr.x &&
			y - epsilon < bl.y &&
			y + epsilon > tr.y
		);
	}

	// compares two rectangles and get back whether they have an overlapping
	function isOverlapping(rect, nextRect) {
		let overlap = false;
		Object.keys(rect).some((corner) => {
			if (corner !== "c") {
				if (isInside(rect[corner], nextRect)) {
					overlap = true;
				}
			}
			return overlap;
		});
		if (!overlap) {
			Object.keys(nextRect).some((corner) => {
				if (corner !== "c") {
					if (isInside(nextRect[corner], rect)) {
						overlap = true;
					}
				}
				return overlap;
			});
		}
		return overlap;
	}

	// get quadrant of the point defined by it coordinates - 0..3
	function getQuadrant({ x, y }) {
		if (x >= -epsilon && y < -epsilon) {
			return 0;
		} else if (x < -epsilon && y < -epsilon) {
			return 1;
		} else if (x < 0 && y >= -epsilon) {
			return 2;
		} else if (x >= -epsilon && y >= -epsilon) {
			return 3;
		}
		return null;
	}

	// if label bounds are intersecting the external circle,
	// the function finds minimal increased radius to avoid this.
	// External circle is an additional space or margin
	// between outer Pie bound to any sector labels' bounds.
/*
	function extendRadiusForLabelCorner(alpha, h, r = 1) {
		if (r <= h) {
			console.warn('Broken contract: Radius should be great then text height');
		}

		let beta; // second angle against h edge
		let gamma // third angle against extended chord
		let ret;
		const D = h / r * sin(alpha);
		if (D > 1) {
			// TODO no solution. wrong data
			console.warn('Panic. Error in program logic!');
		}
		if ( abs(D - 1) <= epsilon) {
			beta = PI / 2;
		} else {
			beta = asin(D);
		}
		gamma = PI - alpha - beta;
		return r * sin(gamma) / sin(alpha);
	}
*/

	// performs clone of rectagnle
	function doClone(rect) {
		const { bl, br, tl, tr, c } = rect;
		rect = {
			bl: { ...bl },
			br: { ...br },
			tl: { ...tl },
			tr: { ...tr },
			c: { ...c },
		};
		return rect;
	}

	// moves the rectangle to the vector, cloneable
	function moveTo(rect, { x = 0, y = 0, clone = false } = {}) {
		if (clone) {
			rect = doClone(rect);
		}
		Object.values(rect).forEach((corner) => {
			corner.x += x;
			corner.y += y;
		});
		return rect;
	}

	// vector sum with move vector
	function vectorMoveTo(vector, move = {}) {
		// debugger;
		Object.keys(vector).forEach((coord) => {
			vector[coord] += move[coord] || 0;
		});
		return vector;
	}

	// move rectangle to {x, y} point anchored by given corner (bl/br/tl/tr/c), cloneable
	function toCorner(
		rect,
		/*String*/ corner,
		{ x = 0, y = 0, clone = false } = {}
	) {
		if (clone) {
			rect = doClone(rect);
		}
		const vector = {
			x: x - rect[corner].x,
			y: y - rect[corner].y,
		};
		return moveTo(rect, vector);
	}

	// move the rectangle to given polar coordinates, cloneable
	function moveToPolar(rect, { r = 1, midAngle = 0, clone = false }) {
		if (clone) {
			rect = doClone(rect);
		}
		const x = cos(midAngle) * r;
		const y = sin(-midAngle) * r;
		Object.values(rect).forEach((corner) => {
			corner.x += x;
			corner.y += y;
		});
		return rect;
	}

	// if label not fitting to the internal section, it
	function moveToOuterPostion(series, { clone = false } = {}) {
		const externalRadius = outerRadius + outerLabelMargin;
		let { coords, midAngle } = series;

		if (clone) {
			coords = doClone(coords);
		}
		moveToPolar(coords, { midAngle, r: externalRadius });

		return coords;
	}

	function angleByCoords(corner) {
		const { x, y } = corner;
		const quadrant = getQuadrant(corner);
		let cornerAngle;
		if (abs(x) < epsilon) {
			if (y > -epsilon) {
				cornerAngle = PI * 3 / 2;
			} else {
				cornerAngle = PI / 2;
			}
		} else if (abs(y) < epsilon) {
			if (x > -epsilon) {
				cornerAngle = 0;
			} else {
				cornerAngle = PI;
			}
		} else {
			cornerAngle = (quadrant + (quadrant % 2) ) / 2 * PI + atan(-y / x);
		}
		return cornerAngle;
	}


	function getReferenceAnchor( midAngle, {cx, cy}) {
		const sx = cx + outerRadius * cos(midAngle);
		const sy = cy + outerRadius * sin(-midAngle);
		return {sx, sy};
	}

	/**
	 * Callback Recharts' Pie component for custom labels rendering.
	 * @param cx {Number} x of center
	 * @param cy {Number} y of center
	 * @param value {String} value to draw
	 * @param outerRadius {Number} outer radius of Pie
	 * @param name {String} Series name
	 *
	 * @returns {JSX.Element}
	 */

	const renderCustomizedLabel = ({
		cx,
		cy,
		value,
		outerRadius,
		name,
	}) => {
		const series = Object.values(labelMetrics).filter(
			(metric) => metric.name === name
		)[0];
		const { coords, midAngle, basePoint, labelWidth, fit } = series;
		const hShift = basePoint === 'br'

		if (!fit) {
			const { moved, fill } = series;
			if (!moved) {
				moveToOuterPostion(series);
				series.moved = true;
			}

			const textAnchor = hShift ? "end" : "start";

			const { sx, sy } = getReferenceAnchor(midAngle, { cx, cy });

			const mx = cx + coords[basePoint].x;
			const my = cy + coords[basePoint].y;

			const ex = mx + (hShift ? -1 : 1) * labelWidth * textScale;
			const ey = my;
			const textX = mx;
			const textY = my - 12;

			return (
				<>
					<path
						d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
						stroke={"#333"}
						fill="none"
					/>
					<text
						x={textX}
						y={textY}
						dy={2}
						textAnchor={textAnchor}
						dominantBaseline="central"
						fill={fill}
						fontSize="16px"
					>
						{value}
					</text>
				</>
			);
		} else {
			const { moved } = series;
			if (!moved) {
				moveToPolar(coords, {
					midAngle,
					r: outerRadius * innerLabelCenterCircle,
				});
				series.moved = true;
			}
			const {
				bl: { x, y },
			} = coords;
			return (
				<text
					x={x * textScale + cx}
					y={y * textScale + cy}
					fill={"#FFFFFF"}
					fontSize="16px"
				>
					{value}
				</text>
			);
		}
	};

	return (
		<PieChart width={chartWidth} height={chartHeight}>
			<Pie
				data={data}
				cx="50%"
				cy="50%"
				outerRadius={outerRadius}
				dataKey="value"
				removed
				line
				value
				// startAngle={(initialAngle * 180) / PI}
				// endAngle={((initialAngle + 2 * PI) * 180) / PI}
				labelLine={false}
				label={renderCustomizedLabel}
			/>
			<Legend iconSize={10} iconType="square" />
		</PieChart>
	);
};

export default PieGraph;
