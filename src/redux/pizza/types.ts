export type Pizza = {
  id: number,
  name: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
  rating: number[]
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliseState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
}