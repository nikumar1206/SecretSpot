interface PaginationTypes {
	currentPage: number;
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
	totalPages: number;
}

const Pagination = ({
	currentPage,
	setPageNumber,
	totalPages,
}: PaginationTypes) => {
	const pageNumbers: Array<string | number> = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}
	const handlePageChange = (page: any) => {
		if (page === "first") {
			setPageNumber(1);
		} else if (page === "previous") {
			setPageNumber(currentPage - 1);
		} else if (page === "next") {
			setPageNumber(currentPage + 1);
		} else if (page === "last") {
			setPageNumber(totalPages);
		} else {
			setPageNumber(page);
		}
	};

	return (
		<div className="flex justify-center">
			<ul className="pagination">
				<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
					<button
						className="page-link"
						onClick={() => handlePageChange("first")}
					>
						First
					</button>
				</li>
				<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
					<button
						className="page-link"
						onClick={() => handlePageChange("previous")}
					>
						Previous
					</button>
				</li>
				{pageNumbers.map((number) => {
					return (
						<li
							key={number}
							className={`page-item ${
								currentPage === number ? "bg-gray-200" : ""
							}`}
						>
							<button
								className="page-link"
								onClick={() => handlePageChange(number)}
							>
								{number}
							</button>
						</li>
					);
				})}
				<li
					className={`page-item ${
						currentPage === totalPages ? "disabled" : ""
					}`}
				>
					<button
						className="page-link"
						onClick={() => handlePageChange("next")}
					>
						Next
					</button>
				</li>
				<li
					className={`page-item ${
						currentPage === totalPages ? "disabled" : ""
					}`}
				>
					<button
						className="page-link"
						onClick={() => handlePageChange("last")}
					>
						Last
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
