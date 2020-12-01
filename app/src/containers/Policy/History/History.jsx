import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./History.module.scss";

import previously from "../../../data/prevPolicy.json";

import HistoryRow from "./HistoryRow/HistoryRow";
import Pagination from "../../../components/UI/Pagination/Pagination";
import Modal from "../../../components/UI/Modal/Modal";
import HistoryInfo from "../../../containers/Policy/History/HistoryInfo/HistoryInfo";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";

const History = ({ setPrevPolicy, isCurrent }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const rows = previously.map(({ id, timestamp, userEmail }) => {
		return (
			<HistoryRow
				key={id}
				id={id}
				isCurrent={isCurrent}
				openModalPreviousPolicyHandler={() => setModalIsOpen(true)}
				onActivePrevPolicyHandler={setPrevPolicy}
				timestamp={timestamp}
				updatedBy={userEmail}
			/>
		);
	});
	return (
		<>
			<div className={classes.History}>
				<div>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Timestamp</TableCell>
								<TableCell>Updated By</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className={classes.tbody}>{rows}</TableBody>
					</Table>
					<Pagination />
				</div>
			</div>
			<CSSTransition
				in={modalIsOpen}
				timeout={300}
				mountOnEnter
				unmountOnExit
				classNames={{
					enter: classes.openPopupEnter,
					enterActive: classes.openPopupEnterActive,
					exit: classes.closePopupExit,
					exitActive: classes.closePopupExitActive,
				}}
			>
				<Modal onCloseHandler={() => setModalIsOpen(false)}>
					<HistoryInfo prevPolicy={previously} />
				</Modal>
			</CSSTransition>
			<CSSTransition
				in={modalIsOpen}
				timeout={300}
				mountOnEnter
				unmountOnExit
				classNames={{
					enter: classes.openBackdropEnter,
					enterActive: classes.openBackdropEnterActive,
					exit: classes.closeBackdropExit,
					exitActive: classes.closeBackdropExitActive,
				}}
			>
				<Backdrop onClickOutside={() => setModalIsOpen(false)} />
			</CSSTransition>
		</>
	);
};

export default History;
