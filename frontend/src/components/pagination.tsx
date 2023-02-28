import {
	AiOutlineDoubleLeft,
	AiOutlineDoubleRight,
	AiOutlineLeft,
	AiOutlineRight,
} from "react-icons/ai";

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
		<div className="flex justify-center w-screen text-2xl pt-5">
			<ul className="inline-flex gap-x-5 items-center">
				<li className={`text-lg ${currentPage === 1 ? "disabled" : ""}`}>
					<AiOutlineDoubleLeft onClick={() => handlePageChange("first")} />
				</li>
				<li className={`text-lg ${currentPage === 1 ? "disabled" : ""}`}>
					<AiOutlineLeft onClick={() => handlePageChange("previous")} />
				</li>
				{pageNumbers.map((number) => {
					return (
						<li
							key={number}
							className={`text-lg ${
								currentPage === number ? "border border-black rounded-lg" : ""
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
					className={`text-lg ${currentPage === totalPages ? "disabled" : ""}`}
				>
					<AiOutlineRight onClick={() => handlePageChange("next")} />
				</li>
				<li
					className={`text-lg ${currentPage === totalPages ? "disabled" : ""}`}
				>
					<AiOutlineDoubleRight onClick={() => handlePageChange("last")} />
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
