import React from "react";
import { Row, Col } from "reactstrap";
import ExpenseForm from "components/Expenses/ExpenseForm";
import ExpenseGraph from "components/Expenses/ExpenseGraph";
import ExpenseTable from "components/Expenses/ExpenseTable";

import { useExpenseData } from "variables/expenses";

const Expenses = () => {
  const total = useExpenseData();
  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <ExpenseGraph totalExpenseData={total} />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <ExpenseTable totalExpenseData={total} />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <ExpenseForm />
        </Col>
      </Row>
    </div>
  );
};

export default Expenses;
