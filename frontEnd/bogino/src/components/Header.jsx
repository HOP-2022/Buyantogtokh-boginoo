import React, { useState } from "react";
import "@fontsource/ubuntu";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { HistoryComp, HistoryContext, useHistoryContext } from "./HistoryComp";
import arrow from "../assets/arrow.svg";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

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
  dropdown: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
  },
  prof: {
    // color: "black",
    // fontFamily: "Ubuntu",
    // fontStyle: "Bold",
    // fontSize: 19,
    // lineHeight: 23,
    // lineHeight: "100%",
    // align: "Left",
    // verticalAlign: "Top",
    width: 100,
    height: 30,
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 18,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    borderRadius: 100,
    border: "none",
    backgroundColor: "#02B589",
    color: "white",
  },
  button: {
    border: "none",
    backgroundColor: "transparent",
  },
  logout: {
    width: "90px",
    height: 25,
    fontFamily: "Ubuntu",
    fontStyle: "Bold",
    fontSize: 15,
    lineHeight: 23,
    lineHeight: "100%",
    align: "Left",
    verticalAlign: "Top",
    borderRadius: 100,
    border: "none",
    backgroundColor: "#02B589",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
};

export const Header = () => {
  const { data, setData, isClicked, setIsClicked, auth, setAuth } =
    useHistoryContext();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = async () => {
    if (!auth) {
      return window.location.replace("/login");
    }
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

  const logout = () => {
    localStorage.removeItem("token");
    setAuth("");
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
        {auth ? (
          <Menu>
            <MenuButton style={styles.prof}>Profile ⬇</MenuButton>
            <MenuList>
              <MenuGroup>
                <MenuItem style={styles.logout}>Roles ➔ </MenuItem>
                <MenuItem style={styles.logout} onClick={logout}>
                  Гарах ➔
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/login">
            <input style={styles.input} value="НЭВТРЭХ" type="button" />
          </Link>
        )}
      </div>
    </div>
  );
};
