import React, { useState } from "react";
import "@fontsource/ubuntu";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { HistoryComp, HistoryContext, useHistoryContext } from "./HistoryComp";

const styles = {
  container: {
    position: "fixed",
    top: 0,
    width: "100vw",
    height: 50,
    padding: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    color: "#02B589",
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 20,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
  },
  input: {
    width: 200,
    height: 50,
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
};

export const Header = () => {
  const { data, setData, isClicked, setIsClicked } = useHistoryContext();

  const handleClick = async () => {
    await axios
      .get("http://localhost:8000/links", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("=====>", response.data.data);
        setData(response.data.data);
        setIsClicked(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsClicked(!isClicked);
  };

  return (
    <div style={styles.container}>
      <div>
        <input
          style={styles.input}
          value="ТҮҮХ"
          type="button"
          onClick={handleClick}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: 500,
          justifyContent: "space-between",
        }}
      >
        <p style={styles.text}>ХЭРХЭН АЖИЛЛАДАГ ВЭ?</p>
        <Link to="/login">
          <input style={styles.input} value="НЭВТРЭХ" type="button" />
        </Link>
      </div>
    </div>
  );
};
