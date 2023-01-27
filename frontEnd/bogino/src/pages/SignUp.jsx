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
  eye: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 20,
  },
};

export const SignUp = () => {
  const email = useRef("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { auth, setAuth } = useHistoryContext();
  const [touched, setTouched] = useState();
  const [show, setShow] = useState(false);

  const handle = () => {
    setTouched(true);
    axios
      .post("http://localhost:8000/users/signup", {
        email: email.current.value,
        password: password,
      })
      .then(function (response) {
        console.log("LOG: ", response.data.token);
        localStorage.setItem("token", response.data.token);
        setAuth(response.data.data._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (auth) {
    return <Navigate replace to="/" />;
  }

  const change = (e) => {
    setPassword(e.target.value);
  };
  const check = (e) => {
    setCheckPassword(e.target.value);
  };
  const click = () => {
    setShow(!show);
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <img src={logo} alt="" />
        <p style={styles.text}>Бүртгүүлэх</p>
        <label style={styles.title}>Цахим хаяг:</label>
        <input
          placeholder={"name@mail.domain"}
          style={styles.input}
          type="text"
          ref={email}
        />
        <label style={styles.title}>Нууц үг:</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            placeholder={"••••••••••"}
            style={styles.input}
            type={show ? "text" : "password"}
            onChange={(e) => change(e)}
          />
          <img style={styles.eye} src={eye} onClick={click} />
        </div>
        <label style={styles.title}>Нууц үг давтна уу:</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <input
            placeholder={"••••••••••"}
            style={
              touched && checkPassword !== password
                ? styles.invalidInput
                : styles.input
            }
            type={show ? "text" : "password"}
            onChange={(e) => check(e)}
          />
          <img style={styles.eye} src={eye} onClick={click} />
        </div>
        {/* <input
          placeholder={"••••••••••"}
          style={ styles.input}
          type="password"
          onChange={(e) => change(e)}
        />
        <input
          placeholder={"••••••••••"}
          style={
            touched && checkPassword !== password
              ? styles.invalidInput
              : styles.input
          }
          type="password"
          onChange={(e) => check(e)}
        /> */}
        <input
          type="submit"
          value="БҮРТГҮҮЛЭХ"
          onClick={handle}
          style={styles.button}
        />
      </div>
      <Footer />
    </div>
  );
};
