import React from "react";
import classes from "./Popup.module.scss";

const Popup = ({
	links,
	openPopupHover,
	closePopupHover,
	externalStyles,
	onClickButton,
}) => {
	const buttonList = links.map(
		({ testId, name, icon, value, onHoverButtonHandler, onClickButtonHandler }) => {
			return (
				<button
					data-test-id={testId}
					key={name}
					value={value}
					onMouseEnter={onHoverButtonHandler}
					onClick={onClickButtonHandler || onClickButton}
					style={{
						backgroundImage: `url(${icon})`,
					}}
				>
					<p>{name}</p>
				</button>
			);
		}
	);
	return (
		<div
			className={[classes.wrap, externalStyles].join(" ")}
			onMouseEnter={openPopupHover}
			onMouseLeave={closePopupHover}
		>
			<div className={[classes.Popup].join(" ")}>{buttonList}</div>
		</div>
	);
};

export default Popup;
