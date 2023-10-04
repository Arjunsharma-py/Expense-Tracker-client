export interface Org {
  _id: string;
  name: string;
  type: string;
  managers: number;
  expenses: number;
  assets: number;
  applicants: string[];
}
