import React from "react";
import { Row, Col } from "reactstrap";
import ExpenseForm from "components/FormExpenses/ExpenseForm";
import ExpenseGraph from "components/GraphExpenses/ExpenseGraph";

const Expenses = () => {
  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <ExpenseGraph />
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
