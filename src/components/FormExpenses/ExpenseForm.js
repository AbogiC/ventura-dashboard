import React, { useContext } from "react";

import { MDBCollapse } from "mdb-react-ui-kit";
import {
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { api, expenseInfoSheet } from "api/Api";
import { AuthContext } from "contexts/AuthContext";
import { categoryInfoSheet } from "api/Api";

const ExpenseForm = () => {
  const [showShow, setShowShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("Expense");
  const [categories, setCategories] = React.useState([]);
  const toggleShow = () => setShowShow(!showShow);

  const wallets = [
    "ABC-BCA",
    "ABC-BRI",
    "ABC-BSI",
    "FSA-BCA1",
    "FSA-BCA2",
    "FSA-MAN",
  ];

  const expenseType = ["Expense", "Income"];

  const changeExpenseType = event => {
    const expenseSelected = event.target.value;
    setSelectedType(expenseSelected);
  };

  React.useEffect(() => {
    fetch(api + categoryInfoSheet)
      .then(response => response.json())
      .then(data => {
        const filterCategory = data.filter(
          item => item.expenseType === selectedType
        );
        const categoryNames = filterCategory.map(item => item.category);
        setCategories(categoryNames);
      })
      .catch(error => {
        console.error(error);
      });
  }, [selectedType]);

  const { currentUser } = useContext(AuthContext);
  const currentDate = new Date();
  const optionsDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
    currentDate
  );
  const createExpenseData = (
    walletName,
    amount,
    expenseName,
    categoryName,
    expenseType
  ) => {
    fetch(api + expenseInfoSheet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            id: "INCREMENT",
            expense: expenseName,
            category: categoryName,
            expenseType: expenseType,
            walletName: walletName,
            amount: amount,
            createdBy: currentUser.email,
            createdDate: formattedDate,
            rowStatus: 1,
          },
        ],
      }),
    })
      .then(r => r.json())
      .then(data => {
        // The response comes here
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        // Errors are reported there
        console.log(error);
        setLoading(false);
      });
  };

  const handleFormExpense = async e => {
    setLoading(true);
    e.preventDefault();
    const expenseType = e.target[0].value;
    const walletName = e.target[1].value;
    const amount = e.target[2].value;
    const expenseName = e.target[3].value;
    const categoryName = e.target[4].value;

    try {
      // save user data in google sheets
      createExpenseData(
        walletName,
        amount,
        expenseName,
        categoryName,
        expenseType
      );
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">
                Try CRUD Using Google Spreadsheet
              </h5>
              <CardTitle tag="h2">Expenses Form</CardTitle>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Button onClick={toggleShow}>Show Form</Button>
              <MDBCollapse show={showShow}>
                <Form onSubmit={handleFormExpense}>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Type Expense</label>
                        <Input
                          type="select"
                          name="expenseType"
                          id="expenseType"
                          onChange={changeExpenseType}
                          value={selectedType}>
                          {expenseType.map((expense, index) => (
                            <option key={index} value={expense}>
                              {expense}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Wallet</label>
                        <Input type="select" name="wallet" id="wallet">
                          {wallets.map((wallet, index) => (
                            <option key={index} value={wallet}>
                              {wallet}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Amount</label>
                        <Input
                          defaultValue=""
                          placeholder="input amount"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Expense Name</label>
                        <Input
                          defaultValue=""
                          placeholder="expense name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Category</label>
                        <Input type="select" name="category" id="category">
                          {categories.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button type="submit" disabled={loading}>
                    Submit
                  </Button>
                </Form>
              </MDBCollapse>
            </Col>
          </Row>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ExpenseForm;
