import { ExpenseQuery } from "../../hooks/useExpense";
import { useState } from "react";
import TableExpenses from "./TableExpenses";
import CardsExpenses from "./CardsExpenses";
import { Show } from "@chakra-ui/react";

const Expenses = () => {
  const [expenseQuery, setExpenseQuery] = useState<ExpenseQuery>({
    ordering: "-date",
    page: 1,
  } as ExpenseQuery);

  return (
    <>
      <Show below="md">
        <CardsExpenses
          expenseQuery={expenseQuery}
          onSetExpenseQuery={(expQuery) => setExpenseQuery(expQuery)}
        />
      </Show>
      <Show above="md">
        <TableExpenses
          expenseQuery={expenseQuery}
          onSetExpenseQuery={(expQuery) => setExpenseQuery(expQuery)}
        />
      </Show>
    </>
  );
};

export default Expenses;
