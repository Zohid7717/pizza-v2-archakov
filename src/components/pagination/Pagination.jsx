import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'


const Pagination = ({ onChangePage, currentPage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={currentPage-1}
        renderOnZeroPageCount={null}
        in
      />
    </div>
  );
}

export default Pagination;
