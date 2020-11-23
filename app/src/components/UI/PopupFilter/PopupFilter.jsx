import React from "react";
import classes from "./PopupFilter.module.scss";
import Filter from "../../Filters/Filter/Filter";

const PopupFilter = ({
	filter,
	externalStyles,
	openPopupHover,
	closePopupHover,
}) => {
	const addedFilter = filter.map(({ id, filterName, checkboxList }) => {
		let filterStyle = classes.fileType;
		if (filterName === "Risk") {
			filterStyle = classes.risk;
		}
		return (
			<Filter
				key={id}
				filter={filterName}
				externalStyles={filterStyle}
				checkboxList={checkboxList}
			/>
		);
	});
	return (
		<section
			className={[classes.PopupFilter, externalStyles].join(" ")}
			onMouseEnter={openPopupHover}
			onMouseLeave={closePopupHover}
		>
			<div className={classes.inner}>{addedFilter}</div>
		</section>
	);
};

export default PopupFilter;
