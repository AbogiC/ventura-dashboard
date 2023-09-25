import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import { Button } from "reactstrap";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { api, personalInfoSheet } from "api/Api.js";

import { useNavigate } from "react-router-dom";

function Login() {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = value => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setErr(true);
    }
  };

  const createGoogleSheet = (
    fullName,
    userName,
    email,
    phone,
    gender,
    dateOfBirth,
    createDate
  ) => {
    fetch(api + personalInfoSheet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            id: "INCREMENT",
            fullName: fullName,
            userName: userName,
            emailAddress: email,
            phoneNumber: phone,
            gender: gender,
            dateBirth: dateOfBirth,
            createdBy: userName,
            createdDate: createDate,
            rowStatus: 1,
          },
        ],
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  const currentDate = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  const handleSignUp = async e => {
    setLoading(true);
    e.preventDefault();
    const fullName = e.target[0].value;
    const userName = e.target[1].value;
    const email = e.target[2].value;
    const phone = e.target[3].value;
    const gender = e.target[4].value;
    const dateOfBirth = e.target[5].value;
    const password = e.target[6].value;

    const birthFormat = new Date(dateOfBirth);

    try {
      // create authentication in firebase
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // don't forget to check rules in cloud firestore
      await setDoc(doc(db, "userProfile", res.user.uid), {
        uid: res.user.uid,
        fullName: fullName,
        userName: userName,
        emailAddress: email,
        phoneNumber: phone,
        gender: gender,
        dateBirth: birthFormat,
        rowStatus: true,
      });

      // save user data in google sheets
      createGoogleSheet(
        fullName,
        userName,
        email,
        phone,
        gender,
        dateOfBirth,
        formattedDate
      );

      navigate("/admin/dashboard");
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}>
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <form onSubmit={handleSignIn}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <a href="!#">Forgot password?</a>
            </div>

            <Button className="mb-4 w-100" type="submit">
              Sign in
            </Button>
          </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <div className="text-center mb-3">
            <p>Sign up with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}>
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}>
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <form onSubmit={handleSignUp}>
            <MDBInput
              wrapperClass="mb-4"
              label="Full Name"
              id="fullname"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="username"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="email"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Phone"
              id="phone"
              type="number"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Gender"
              id="gender"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Date of Birth"
              id="dateofbirth"
              type="date"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I have read and agree to the terms"
              />
            </div>
            <Button disabled={loading} type="submit" className="mb-4 w-100">
              Sign up
            </Button>
            {loading && "please wait..."}
            {err && <span>Something went wrong</span>}
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
