import React, { useContext } from "react";
import Swal from "sweetalert2";

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
  CardBody,
} from "reactstrap";
import { api, expenseInfoSheet } from "api/Api";
import { AuthContext } from "contexts/AuthContext";
import { categoryInfoSheet } from "api/Api";

const ExpenseForm = () => {
  const [showShow, setShowShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [filteredCat, setFilteredCat] = React.useState([]);
  const [selectedWallet, setSelectedWallet] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const [isRequired, setIsRequired] = React.useState(false);
  const [isRequired2, setIsRequired2] = React.useState(false);
  const [isRequired3, setIsRequired3] = React.useState(false);
  const [isRequired4, setIsRequired4] = React.useState(false);
  const [isRequired5, setIsRequired5] = React.useState(false);

  const [isValid, setIsValid] = React.useState(false);
  const [isValid2, setIsValid2] = React.useState(false);
  const [isValid3, setIsValid3] = React.useState(false);
  const [isValid4, setIsValid4] = React.useState(false);
  const [isValid5, setIsValid5] = React.useState(false);

  const toggleShow = () => setShowShow(!showShow);

  const handleChangeWallet = event => {
    const walletChange = event.target.value;
    setSelectedWallet(walletChange);
    if (walletChange.trim() === "") {
      setIsRequired2(true);
      setIsValid2(false);
    } else if (walletChange.trim() !== "") {
      setIsRequired2(false);
      setIsValid2(true);
    }
  };
  const handleChangeCategory = event => {
    const categoryChange = event.target.value;
    setSelectedCategory(categoryChange);
    if (categoryChange.trim() === "") {
      setIsRequired5(true);
      setIsValid5(false);
    } else if (categoryChange.trim() !== "") {
      setIsRequired5(false);
      setIsValid5(true);
    }
  };
  const handleChangeAmount = event => {
    const amountChange = event.target.value;
    if (amountChange.trim() === "") {
      setIsRequired3(true);
      setIsValid3(false);
    } else if (amountChange.trim() !== "") {
      setIsRequired3(false);
      setIsValid3(true);
    }
  };
  const handleChangeExpenseName = event => {
    const expenseChange = event.target.value;
    if (expenseChange.trim() === "") {
      setIsRequired4(true);
      setIsValid4(false);
    } else if (expenseChange.trim() !== "") {
      setIsRequired4(false);
      setIsValid4(true);
    }
  };

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
    const filterCategory = categories.filter(
      item => item.expenseType === expenseSelected
    );
    const categoryNames = filterCategory.map(item => item.category);
    setFilteredCat(categoryNames);
    setSelectedType(expenseSelected);
    if (expenseSelected.trim() === "") {
      setIsRequired(true);
      setIsValid(false);
    } else if (expenseSelected.trim() !== "") {
      setIsRequired(false);
      setIsValid(true);
    }
  };

  React.useEffect(() => {
    fetch(api + categoryInfoSheet)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your expense has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
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

    if (isValid && isValid2 && isValid3 && isValid4 && isValid5) {
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
    }
    setLoading(false);
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
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
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
                      value={selectedType}
                      invalid={isRequired}
                      valid={isValid}>
                      <option value="" disabled hidden>
                        select type
                      </option>
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
                    <Input
                      type="select"
                      name="wallet"
                      id="wallet"
                      value={selectedWallet}
                      onChange={handleChangeWallet}
                      invalid={isRequired2}
                      valid={isValid2}>
                      <option value="" disabled hidden>
                        select wallet
                      </option>
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
                      onChange={handleChangeAmount}
                      invalid={isRequired3}
                      valid={isValid3}
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
                      onChange={handleChangeExpenseName}
                      invalid={isRequired4}
                      valid={isValid4}
                    />
                  </FormGroup>
                </Col>
                <Col className="pl-md-1" md="6">
                  <FormGroup>
                    <label>Category</label>
                    <Input
                      type="select"
                      name="category"
                      id="category"
                      value={selectedCategory}
                      onChange={handleChangeCategory}
                      invalid={isRequired5}
                      valid={isValid5}>
                      <option value="" disabled hidden>
                        select expense type first
                      </option>
                      {filteredCat.map((category, index) => (
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
        </CardBody>
      </Card>
    </div>
  );
};

export default ExpenseForm;
