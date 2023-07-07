import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ onChangePage, currentPage }) => <ReactPaginate
  className={styles.root}
  breakLabel="..."
  nextLabel=">"
  previousLabel="<"
  onPageChange={(event) => onChangePage(event.selected + 1)}
  pageRangeDisplayed={5}
  pageCount={3}
  forcePage={currentPage - 1}
  renderOnZeroPageCount={null}
/>

export default Pagination;
