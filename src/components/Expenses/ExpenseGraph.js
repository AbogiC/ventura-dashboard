import React from "react";
import classNames from "classnames";
import {
  ButtonGroup,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "reactstrap";

import { Pie } from "react-chartjs-2";
import { options } from "variables/expenses.js";

function ExpenseGraph({ totalExpenseData }) {
  const [changeWallet, setChangeWallet] = React.useState();
  const [dataChart, setDataChart] = React.useState({
    labels: ["Expense", "Income"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  });

  const walletNames = [
    "ABC-BCA",
    "ABC-BRI",
    "ABC-BSI",
    "FSA-BCA1",
    "FSA-BCA2",
    "FSA-MAN",
  ];
  const symbolWallet = ["A", "B", "C", "D", "E", "F"];

  const totalData = totalExpenseData;

  const changeWalletName = name => {
    const filterWallet = totalData.filter(item => item.walletName === name);
    const filterExpense = filterWallet.filter(
      item => item.expenseType === "Expense"
    );
    const filterIncome = filterWallet.filter(
      item => item.expenseType === "Income"
    );
    const expenseAmount = filterExpense.map(item => item.amount);
    const incomeAmount = filterIncome.map(item => item.amount);
    const totalExpense = expenseAmount.reduce((accumulator, currentValue) => {
      const amount = parseFloat(currentValue);
      if (!isNaN(amount)) {
        return accumulator + amount;
      }

      return accumulator;
    }, 0);
    const totalIncome = incomeAmount.reduce((accumulator, currentValue) => {
      const amount = parseFloat(currentValue);
      if (!isNaN(amount)) {
        return accumulator + amount;
      }

      return accumulator;
    }, 0);
    const setData = {
      labels: ["Expense", "Income"],
      datasets: [
        {
          data: [totalExpense, totalIncome],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };
    setDataChart(setData);
    setChangeWallet(name);
  };

  return (
    <div>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Try Show Graph Expenses</h5>
              <CardTitle tag="h2">Expenses Graph</CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons">
                {walletNames.map((wallet, index) => (
                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: changeWallet === wallet,
                    })}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={() => changeWalletName(wallet)}
                    key={index}>
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      {wallet}
                    </span>
                    <span className="d-block d-sm-none">
                      {symbolWallet.at(index)}
                    </span>
                  </Button>
                ))}
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Pie
                data={dataChart}
                height={150}
                width={200}
                options={options}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default ExpenseGraph;
