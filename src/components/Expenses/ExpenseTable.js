import classNames from "classnames";
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Form,
  FormGroup,
  Input,
  ButtonGroup,
  Button,
} from "reactstrap";

const ExpenseTable = ({ totalExpenseData }) => {
  const [changeWallet, setChangeWallet] = useState("");
  const [expenseType, setExpenseType] = useState("Expense");
  const [showTableExpense, setShowTableExpense] = useState([]);
  const [showTableIncome, setShowTableIncome] = useState([]);
  const [showExpense, setShowExpense] = useState(true);
  const showTableData = showExpense ? showTableExpense : showTableIncome;

  const totalData = totalExpenseData;

  const [searchStart, setSearchStart] = useState("");
  const [searchEnd, setSearchEnd] = useState("");
  React.useEffect(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    setSearchStart(formatInitialDate(thirtyDaysAgo));
    setSearchEnd(formatInitialDate(new Date()));
  }, []);
  const formatInitialDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure double digits
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const walletABC = ["ABC-BCA", "ABC-BRI", "ABC-BSI", "ABC-CASH"];
  const walletFSA = ["FSA-BCA1", "FSA-BCA2", "FSA-MAN", "FSA-CASH"];
  const walletFSABC = ["FSABC-BCA"];
  const symbolABC = ["A1", "A2", "A3", "A4"];
  const symbolFSA = ["F1", "F2", "F3", "F4"];
  const symbolFSABC = ["FA"];

  const changeWalletName = name => {
    const filterWallet = totalData.filter(item => item.walletName === name);
    const filterExpense = filterWallet.filter(
      item => item.expenseType === "Expense"
    );
    setShowTableExpense(filterExpense);
    const filterIncome = filterWallet.filter(
      item => item.expenseType === "Income"
    );
    setShowTableIncome(filterIncome);
    setChangeWallet(name);
  };

  const changeExpenseType = type => {
    setExpenseType(type);
    setShowExpense(!showExpense);
  };

  function formatCurrency(amount) {
    // Format the amount to Indonesian Rupiah (IDR)
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  }
  function formatDate(dateString) {
    const options = {
      weekday: "long", // Display the full weekday name
      day: "numeric", // Display the day of the month as a number
      month: "long", // Display the full month name
      year: "numeric", // Display the year as a number
    };

    // Parse the input date string into a JavaScript Date object
    const date = new Date(dateString);

    // Format the date using the specified options
    return date.toLocaleString("en-US", options);
  }
  const handleStartDateChange = e => {
    setSearchStart(e.target.value);
  };
  const handleEndDateChange = e => {
    setSearchEnd(e.target.value);
  };
  const filteredExpenses = showTableData.filter(expense => {
    const expenseDate = new Date(expense.expenseDate);
    return (
      expenseDate >= new Date(searchStart) && expenseDate <= new Date(searchEnd)
    );
  });

  return (
    <div>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">
                Show Table Expense Google Spreadsheet
              </h5>
              <CardTitle tag="h2">Expenses Table</CardTitle>
            </Col>
            <Col sm="6">
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons">
                {walletABC.map((wallet, index) => (
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
                      {symbolABC.at(index)}
                    </span>
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons">
                {walletFSA.map((wallet, index) => (
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
                      {symbolFSA.at(index)}
                    </span>
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons">
                {walletFSABC.map((wallet, index) => (
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
                      {symbolFSABC.at(index)}
                    </span>
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons">
                <Button
                  tag="label"
                  className={classNames("btn-simple", {
                    active: expenseType === "Expense",
                  })}
                  color="info"
                  id="0"
                  size="sm"
                  onClick={() => changeExpenseType("Expense")}>
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Expense
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-cloud-download-93" />
                  </span>
                </Button>
                <Button
                  tag="label"
                  className={classNames("btn-simple", {
                    active: expenseType === "Income",
                  })}
                  color="info"
                  id="0"
                  size="sm"
                  onClick={() => changeExpenseType("Income")}>
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Income
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-cloud-upload-94" />
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <Form>
            <Row>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={searchStart}
                    onChange={handleStartDateChange}
                  />
                </FormGroup>
              </Col>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    id="EndDate"
                    value={searchEnd}
                    onChange={handleEndDateChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>Expense Name</th>
                <th>Category</th>
                <th>Date Transaction</th>
                <th className="text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.expense}</td>
                  <td>{expense.category}</td>
                  <td>{formatDate(expense.expenseDate)}</td>
                  <td className="text-center">
                    {formatCurrency(expense.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ExpenseTable;
