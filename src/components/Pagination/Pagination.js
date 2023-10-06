import "./Pagination.css";

import {
  MdLastPage,
  MdFirstPage,
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore,
} from "react-icons/md";

const Pagination = ({
  currentPageNum,
  numbers,
  totalPages,
  totalUsers,
  setCurrentPageNum,
}) => {
  function prevPage() {
    if (currentPageNum !== 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  }

  function nextPage() {
    if (currentPageNum !== totalPages) {
      setCurrentPageNum(currentPageNum + 1);
    }
  }

  return (
    <span className="pagination">
      <span
        id="btn"
        onClick={() => setCurrentPageNum(1)}
        className={currentPageNum === 1 ? "disabled" : ""}
      >
        <MdFirstPage />
      </span>
      <span
        onClick={prevPage}
        id="btn"
        className={currentPageNum === 1 ? "disabled" : ""}
      >
        <MdOutlineNavigateBefore />
      </span>

      {numbers.map((page) => (
        <span
          key={page}
          onClick={() => setCurrentPageNum(page)}
          id="btn"
          className={currentPageNum === page ? "active" : ""}
        >
          {` ${page} `}
        </span>
      ))}

      <span
        onClick={nextPage}
        id="btn"
        className={
          currentPageNum === totalPages || totalUsers === 0 ? "disabled" : ""
        }
      >
        <MdOutlineNavigateNext />
      </span>
      <span
        id="btn"
        onClick={() => setCurrentPageNum(totalPages)}
        className={
          currentPageNum === totalPages || totalUsers === 0 ? "disabled" : ""
        }
      >
        <MdLastPage />
      </span>
    </span>
  );
};
export default Pagination;
