import useData from "./useData";
import { Emp } from "./useEmp";
import { Manager } from "./useManager";

export interface DashboardQuery {
  from: string;
  to: string | null;
}

export interface BarQuery {
  from: string;
  to: string | null;
}

export interface dateAmount {
  dates: string[];
  expAmounts: number[];
  assetAmounts: number[];
}

export interface profitdateAmount {
  dates: string[];
  profits: number[];
  profitPerc: number[];
}

export interface ExpenseQuery {
  from: string | null;
  to: string | null;
  emp: string | null;
  manager: string | null;
  ordering: string;
  page: number | null;
}

export interface Expense {
  _id: string;
  manager: Manager;
  emp: Emp;
  amount: number;
  purpose: string;
  date: Date;
}

const useExpense = (expenseQuery: ExpenseQuery) =>
  useData<Expense>(
    "/exp",
    {
      params: {
        from: expenseQuery?.from,
        to: expenseQuery?.to,
        emp: expenseQuery?.emp,
        mng: expenseQuery?.manager,
        ordering: expenseQuery.ordering,
        page: expenseQuery?.page,
      },
    },
    [expenseQuery]
  );

export default useExpense;
