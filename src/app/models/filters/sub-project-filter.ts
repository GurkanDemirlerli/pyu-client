import { PaginationFilter } from "./pagination-filter";

export interface SubProjectFilter extends PaginationFilter {
    statusId?: string;
    parentId?: string;
}
