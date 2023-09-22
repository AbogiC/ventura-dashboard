import React from "react";

import classNames from "classnames";

import { MDBCollapse } from "mdb-react-ui-kit";

import {
  ButtonGroup,
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

import { Pie } from "react-chartjs-2";

import { api, personalInfoSheet, expenseInfoSheet } from "api/Api.js";
import { data, options } from "variables/expenses.js";

const Expenses = () => {
  const [bigChartData, setbigChartData] = React.useState();
  const [changeSheet, setChangeSheet] = React.useState(personalInfoSheet);
  const [showShow, setShowShow] = React.useState(false);

  const toggleShow = () => setShowShow(!showShow);

  const changeSheetName = name => {
    setChangeSheet(name);
  };

  const createGoogleSheet = name => {
    fetch(api + changeSheet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            id: "INCREMENT",
            name: "Mark",
            phone: 877631275,
          },
        ],
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data));

    setbigChartData(name);
  };

  const readGoogleSheet = name => {
    fetch(api + changeSheet)
      .then(response => response.json())
      .then(data => console.log(data));

    setbigChartData(name);
  };

  const updateGoogleSheet = name => {
    fetch(api + "/id/1" + changeSheet, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: "23",
          name: "Bogi",
        },
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data));

    setbigChartData(name);
  };

  const deleteGoogleSheet = name => {
    fetch(api + "/id/4" + changeSheet, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => console.log(data));

    setbigChartData(name);
  };

  return (
    <div className="content">
      <Row>
        <Col xs="12">
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
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: bigChartData === "data1",
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => createGoogleSheet("data1")}>
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Create
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-pencil" />
                      </span>
                    </Button>
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: bigChartData === "data2",
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => readGoogleSheet("data2")}>
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Read
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-light-3" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: bigChartData === "data3",
                      })}
                      onClick={() => updateGoogleSheet("data3")}>
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Update
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-refresh-02" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: bigChartData === "data4",
                      })}
                      onClick={() => deleteGoogleSheet("data4")}>
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Delete
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-simple-remove" />
                      </span>
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons">
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: changeSheet === personalInfoSheet,
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => changeSheetName(personalInfoSheet)}>
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Personal
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-02" />
                      </span>
                    </Button>
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: changeSheet === expenseInfoSheet,
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => changeSheetName(expenseInfoSheet)}>
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Expense
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-copy-04" />
                      </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Pie data={data} height={150} width={200} options={options} />
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
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
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              defaultValue="Abednego"
                              placeholder="Company"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              defaultValue="Christian"
                              placeholder="Last Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </MDBCollapse>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Expenses;
