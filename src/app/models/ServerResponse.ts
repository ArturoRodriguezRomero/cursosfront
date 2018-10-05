import { Course } from './Course';
import { Teacher } from './Teacher';
import { Subject } from './Subject';

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
}

export interface ServerResponse {
  content: Array<Teacher | Course | Subject>;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}
