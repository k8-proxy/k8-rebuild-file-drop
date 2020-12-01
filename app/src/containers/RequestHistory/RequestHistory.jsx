import React, { useState, useContext } from "react";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

import classes from "./RequestHistory.module.scss";

import FileInfo from "./FileInfo/FileInfo";
import Modal from "../../components/UI/Modal/Modal";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
} from "@material-ui/core";

import FileRow from "./FileRow/FileRow";
import Filters from "../../components/Filters/Filters";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Pagination from "../../components/UI/Pagination/Pagination";

const RequestHistory = () => {
	const [sortedRows, setSortedRows] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [rowId, setRowId] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);

	const { userfiles, selectedFilters } = useContext(GlobalStoreContext);

	const clsWrapTable = [classes.wrapTable];

	if (openPopup) {
		clsWrapTable.push(classes.notActive);
	}

	const openInfoModal = (id) => {
		setOpenModal((prevState) => !prevState);
		setRowId(id);
	};

	const closeInfoModal = () => {
		setOpenModal(false);
	};

	const getSortedRows = (rows, sortLabel) => {
		let sortedRows;
		switch (sortLabel) {
			case "timestamp":
				setSortedRows(
					rows.sort(
						(a, b) =>
							new Date(a.props.timestamp).getTime() -
							new Date(b.props.timestamp).getTime()
					)
				);
				break;
			case "fileId":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.fileId < b.props.fileId) return -1;
						if (a.props.fileId > b.props.fileId) return 1;
						return 0;
					})
				);
				break;
			case "fileType":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.type < b.props.type) return -1;
						if (a.props.type > b.props.type) return 1;
						return 0;
					})
				);
				break;

			case "risk":
				setSortedRows(
					rows.sort((a, b) => {
						if (a.props.type < b.props.type) return -1;
						if (a.props.type > b.props.type) return 1;
						return 0;
					})
				);
				break;

			default:
				sortedRows = rows;
				break;
		}
		return sortedRows;
	};

	let filteredUserfiles = userfiles;

	if (selectedFilters.length > 0) {
		filteredUserfiles = userfiles.filter(
			(file) =>
				file.type.toLowerCase() === selectedFilters[0].value.toLowerCase()
		);
	}

	const fileInfo = filteredUserfiles.find((it) => it.id === rowId);

	const rows = filteredUserfiles.map(
		({ id, timestamp, fileId, name, type, risk }) => {
			return (
				<FileRow
					key={id}
					id={id}
					timestamp={timestamp}
					fileId={fileId}
					name={name}
					type={type}
					risk={risk}
					onRowClickHandler={(evt) => openInfoModal(evt.target.id)}
				/>
			);
		}
	);

	return (
		<article className={classes.RequestHistory}>
			<Filters popupIsOpen={openPopup} changeVisibilityPopup={setOpenPopup} />
			<div className={clsWrapTable.join(" ")}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(rows, "timestamp")}
								>
									Timestamp
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel onClick={() => getSortedRows(rows, "fileId")}>
									File ID
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel
									onClick={() => getSortedRows(rows, "fileType")}
								>
									File Type
								</TableSortLabel>
							</TableCell>

							<TableCell>
								<TableSortLabel onClick={() => getSortedRows(rows, "risk")}>
									Risk
								</TableSortLabel>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody className={classes.tbody}>
						{sortedRows || rows}
					</TableBody>
				</Table>
				<Pagination />
			</div>
			{openModal && (
				<>
					<Modal onCloseHandler={closeInfoModal}>
						<FileInfo data={fileInfo} />
					</Modal>
					<Backdrop onClickOutside={closeInfoModal} />
				</>
			)}
		</article>
	);
};

export default RequestHistory;
