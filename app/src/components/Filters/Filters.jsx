import React, { useState, useContext } from "react";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

import classes from "./Filters.module.scss";

import checkValidity from "../../shared/checkValidity";

import Button from "../UI/Button/Button";
import Popup from "../UI/Popup/Popup";
import PopupFilter from "../UI/PopupFilter/PopupFilter";
import SelectedFilter from "../UI/SelectedFilter/SelectedFilter";
import Input from "../UI/Input/Input";
import Daterangepicker from "../UI/Daterangepicker/Daterangepicker";

const Filters = ({ popupIsOpen, changeVisibilityPopup }) => {
	const [openFilterRow, setOpenFilterRow] = useState(false);
	const [openFilter, setOpenFilter] = useState(null);
	const [openFileId, setOpenFileId] = useState(false);

	const [fileIdValue, setFileIdValue] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [isTouched, setIsTouched] = useState(false);

	const {
		addFilterInput,
		fileFilter,
		riskFilter,
		selectedFilters,
		removeFilter,
	} = useContext(GlobalStoreContext);

	const clsList = [classes.filters];
	const clsMoreFilters = [classes.moreFilters];
	const clsArrow = [classes.arrow];

	if (openFilterRow) {
		clsList.push(classes.expanded);
		clsMoreFilters.push(classes.hide);
		clsArrow.push(classes.rotate);
	}

	const filterList = [
		{
			testId: "buttonFilterFileTypes",
			name: "File Types",
			onHoverButtonHandler: () => {
				setOpenFileId(false);
				setOpenFilter("File Types");
			},
		},
		{
			testId: "buttonFilterRisk",
			name: "Risk",
			onHoverButtonHandler: () => {
				setOpenFileId(false);
				setOpenFilter("Risk");
			},
		},
		{
			testId: "buttonFilterFileId",
			name: "File ID",
			onHoverButtonHandler: () => {
				setOpenFilter(null);
				setOpenFileId(true);
			},
		},
	];

	const openFilterRowHandler = () => {
		setOpenFilterRow((prev) => !prev);
		changeVisibilityPopup(false);
		setOpenFilter(null);
	};

	const clickOnAddFilterButton = () => {
		changeVisibilityPopup((prev) => !prev);
		setOpenFileId(false);
		setOpenFilter(null);
	};

	const openFilterHoverHandler = () => {
		changeVisibilityPopup(true);
	};

	const closePopupHoverHandler = () => {
		changeVisibilityPopup(false);
	};

	const closeFilterHoverHandler = () => {
		if (!popupIsOpen) {
			setOpenFilter(null);
		}
		changeVisibilityPopup(false);
	};

	const inputChangedHandler = (inputValue) => {
		setFileIdValue(inputValue);
		setIsValid(checkValidity(inputValue));
		setIsTouched(true);
	};

	const submitHandler = (evt) => {
		evt.preventDefault();
		addFilterInput({
			id: fileIdValue,
			value: fileIdValue,
			filter: "File ID",
		});
	};

	let filter = null;
	let filterStyle = null;

	switch (openFilter) {
		case "File Types":
			filter = fileFilter;
			filterStyle = classes.popupFilterFileType;
			break;

		case "Risk":
			filter = riskFilter;
			filterStyle = classes.popupFilterRisk;
			break;
		default:
			filter = null;
			filterStyle = null;
			break;
	}

	const selectedFiltersArr = selectedFilters.map(
		({ id, value, filter, titleColor }) => {
			return (
				<SelectedFilter
					key={id}
					id={id}
					filter={filter}
					value={value}
					titleColor={titleColor}
					remove={removeFilter}
				/>
			);
		}
	);

	return (
		<section className={classes.Filters}>
			<div className={classes.wrap}>
				<div className={classes.header}>
					<h3 className={classes.head}>Filters</h3>

					<button
						data-test-id="buttonMoreFilters"
						className={clsMoreFilters.join(" ")}
						onClick={openFilterRowHandler}
					>
						More Filters...
					</button>
					<span
						data-test-id="moreFiltersArrow"
						onClick={openFilterRowHandler}
						className={clsArrow.join(" ")}
					/>
				</div>
				<Daterangepicker externalStyles={classes.pickers} />
				<div className={classes.footer}>
					<div className={clsList.join(" ")}>
						{openFilterRow && (
							<div className={classes.storyLine}>{selectedFiltersArr}</div>
						)}
					</div>
					{openFilterRow && (
						<div>
							<Button
								testId="addFilterButton"
								buttonType={"button"}
								externalStyles={classes.addFilter}
								onButtonClick={clickOnAddFilterButton}
							>
								+ Add Filter
							</Button>
						</div>
					)}
				</div>

				{popupIsOpen ? (
					<>
						<Popup
							links={filterList}
							externalStyles={classes.popup}
							openPopupHover={() => changeVisibilityPopup(true)}
							closePopupHover={closePopupHoverHandler}
						/>
						{openFilter && (
							<PopupFilter
								testId={openFilter}
								filter={filter}
								selectedFilters={selectedFilters}
								externalStyles={filterStyle}
								openPopupHover={openFilterHoverHandler}
								closePopupHover={closeFilterHoverHandler}
							/>
						)}

						{openFileId && (
							<form
								className={classes.fileId}
								onSubmit={submitHandler}
								onMouseEnter={openFilterHoverHandler}
								onMouseLeave={closeFilterHoverHandler}
							>
								<Input
									type="text"
									name="fileId"
									externalStyles={classes.inputFileId}
									autofocus
									placeholder={"File ID"}
									value={fileIdValue}
									valid={isValid}
									touched={isTouched}
									onChange={(evt) => {
										inputChangedHandler(evt.target.value);
									}}
								/>
								<button
									type="submit"
									className={classes.addButton}
									disabled={!isValid}
								>
									+ ADD
								</button>
							</form>
						)}
					</>
				) : null}
			</div>
		</section>
	);
};

export default Filters;
