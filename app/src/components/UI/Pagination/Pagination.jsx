import React from "react";
import classes from "./Pagination.module.scss";

const Pagination = () => {
	return (
		<div className={classes.Pagination}>
			<div className={classes.info} role="status" aria-live="polite">
				Showing 0 to 0 of 0
			</div>
			<div className={classes.pageCountSelector}>
				<label>Items Shown: </label>
				<select>
					<option value="10">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
				</select>
			</div>
			<div className={classes.paginator}>
				<div className={classes.dataTables}>
					<button
						className={classes.firstPage}
						data-dt-idx="2"
						tabIndex="0"
					></button>
					<button
						className={classes.previousPage}
						data-dt-idx="0"
						tabIndex="0"
					></button>
					<div>
						<button className={classes.numbers} disabled="0">
							1
						</button>
					</div>
					<button className={classes.nextPage} tabIndex="0"></button>
					<button
						className={classes.lastPage}
						data-dt-idx="2"
						tabIndex="0"
					></button>
				</div>
			</div>
			<div className={classes.goTo}>
				Go to page: <input type="text" />
				<button>Go</button>
			</div>
		</div>
	);
};

export default Pagination;
