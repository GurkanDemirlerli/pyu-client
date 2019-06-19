import { PaginationFilter } from "./pagination-filter";

export interface TaskFilter extends PaginationFilter {
    status?: string;
    projectId?: string;
    assignedTo?: string;
    createdBy?: string;
}
