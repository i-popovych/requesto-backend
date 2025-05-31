export interface SortingInterface {
  field: string;
  by: 'ASC' | 'DESC';
}

export type PaginationInterface = Partial<{
  page: number;
  skip: number;
  perPage: number;
  sort: SortingInterface[];
  search: { field: string; value: string }[];
  searchValue: string;
  filters: Record<string, any>;
  dateRange: DateRange[];
}>;

export interface PaginationResponse {
  page?: number;
  perPage?: number;
  totalPage?: number;
  totalData?: number;
}

export interface DateRangeValue {
  from: Date;
  to: Date;
}

export interface DateRange {
  field: string;
  value: DateRangeValue;
}
