import { ExpenseQuery } from "../../hooks/useExpense";
import { useState } from "react";
import TableExpenses from "./TableExpenses";

const Expenses = () => {
  const [expenseQuery, setExpenseQuery] = useState<ExpenseQuery>({
    ordering: "-date",
    page: 1,
  } as ExpenseQuery);

  return (
    <>
      <TableExpenses
        expenseQuery={expenseQuery}
        onSetExpenseQuery={(expQuery) => setExpenseQuery(expQuery)}
      />
    </>
  );
};

export default Expenses;
