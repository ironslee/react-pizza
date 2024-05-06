import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";
// import { currentPage } from "../../redux/slices/filterSlice";

type PaginationProps = {
  currentPage: number;
  onPageChange: (index: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
