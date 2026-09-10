export interface IPagination {
  paginationMethod: string;
  page: number;
  pageSize: number;
}

export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export type OrderByType = 'asc' | 'desc';
