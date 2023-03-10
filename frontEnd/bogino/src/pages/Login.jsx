import React, { useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "@fontsource/ubuntu";
import { Link, Navigate } from "react-router-dom";
import { useHistoryContext } from "../components/HistoryComp";
import axios from "axios";
import eye from "../assets/eye.svg";

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  input: {
    borderRadius: 100,
    width: 500,
    height: 46,
    border: "none",
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    paddingLeft: 20,
    boxShadow: "9px 8px 50px 0px #F0F0F0",
  },
  invalidInput: {
    borderRadius: 100,
    width: 500,
    height: 46,
    border: "1px solid red",
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    paddingLeft: 20,
    boxShadow: "9px 8px 50px 0px #F0F0F0",
  },
  text: {
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 32,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    color: "#02B589",
  },
  title: {
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    overflow: "hidden",
    width: 500,
    display: "flex",
    justifyContent: "start",
    color: "black",
    paddingLeft: "2vw",
  },
  pass: {
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    overflow: "hidden",
    color: "black",
  },
  check: {
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    overflow: "hidden",
    color: "#02B589",
  },
  button: {
    borderRadius: 100,
    height: 50,
    width: 500,
    border: "none",
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    borderRadius: 100,
    border: "none",
    backgroundColor: "#02B589",
    color: "white",
  },
  new: {
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    overflow: "hidden",
    color: "#02B589",
  },
  eye: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 20,
  },
};

export const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const { auth, setAuth } = useHistoryContext();
  const [pass, setPass] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [show, setShow] = useState(false);

  const handle = () => {
    axios
      .post("http://localhost:8000/users/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then(function (response) {
        console.log("LOG: ", response.data.token);
        localStorage.setItem("token", response.data.token);
        setAuth(response.data.data._id);
      })
      .catch(function (error) {
        setPass(error.response.data.success);
        setCheckEmail(error.response.data.success);
        console.log(error);
      });
  };

  if (auth) {
    return <Navigate replace to="/" />;
  }

  const click = () => {
    setShow(!show);
  };
  return (
    <div>
      <Header />
      <div style={styles.container}>
        <img src={logo} alt="" />
        <p style={styles.text}>??????????????</p>
        <label style={styles.title}>?????????? ????????:</label>
        <input
          placeholder={"name@mail.domain"}
          style={checkEmail ? styles.input : styles.invalidInput}
          type="text"
          ref={email}
        />
        <label style={styles.title}>???????? ????:</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            placeholder={"??????????????????????????????"}
            style={pass ? styles.input : styles.invalidInput}
            type={show ? "text" : "password"}
            ref={password}
          />
          <img style={styles.eye} src={eye} onClick={click} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 500,
          }}
        >
          <div style={{ display: "flex" }}>
            <input type="checkbox" />
            <p style={styles.check}>???????????? ????????</p>
          </div>
          <div>
            <Link to="/forgotpass" style={styles.pass}>
              ???????? ???????? ??????????????
            </Link>
          </div>
        </div>
        <input
          type="submit"
          value="??????????????"
          onClick={handle}
          style={styles.button}
        />

        <Link to="/signup" style={styles.new}>
          ???????? ?????????????????? ?????? ?????? ?????????? ?????
        </Link>
      </div>
      <Footer />
    </div>
  );
};
