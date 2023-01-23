import React, { useRef, useState } from "react";
import { Header } from "../components/Header";
import logo from "../assets/logo.svg";
import "@fontsource/ubuntu";
import { Footer } from "../components/Footer";
import { Comp } from "../components/Comp";
import axios from "axios";
import { useParams } from "react-router-dom";
import { History } from "../components/History";
import { useHistoryContext } from "../components/HistoryComp";
import { Loader } from "../components/Loader";

const styles = {
  container: {
    height: "auto",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
  },
  con: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    width: "100vw",
    alignItems: "center",
    gap: 50,
    paddingTop: "10vh",
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
  button: {
    borderRadius: 100,
    height: 50,
    width: 200,
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
  HistoryContainer: {
    width: "100vw",
    height: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
};
//login pass email
// username data (sessionToken => )

export const App = () => {
  const { data, setData } = useHistoryContext();
  const { isClicked, setIsClicked } = useHistoryContext();
  const { id } = useParams();
  const [URL, setURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const url = useRef("");
  const change = (e) => {
    if (e.target.value === "") {
      setURL("");
    }
  };
  const link = () => {
    axios
      .post(
        "http://localhost:8000/links",
        {
          URL: url.current.value,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log("LOG: ", response);
        setURL(response.data.data.URL);
        setShortURL("http://localhost:3000/links/" + response.data.data._id);
        if (isClicked) {
          setIsClicked(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Board = () => {
    return (
      <div style={styles.HistoryContainer}>
        {data?.map((el, i) => {
          return <History link={el} index={i} />;
        })}
      </div>
    );
  };
  // const Con = () => {
  //   if (data) {
  //     if (isClicked) {
  //       <Board />;
  //     } else {
  //       if (URL) {
  //         <Comp URL={URL} shortURL={shortURL} />;
  //       }
  //     }
  //   } else {
  //     <Loader />;
  //   }
  // };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.con}>
        <div>
          <img src={logo} alt="" />
        </div>
        <div style={{ display: "flex", gap: 30 }}>
          <input
            style={styles.input}
            type="text"
            placeholder="https://www.web-huudas.mn"
            ref={url}
            onChange={(e) => change(e)}
          />
          <input
            style={styles.button}
            value="БОГИНОСГОХ"
            type="button"
            onClick={link}
          />
        </div>
        {isClicked && <Board />}
        {isClicked ? "" : URL && <Comp URL={URL} shortURL={shortURL} />}
        <Footer />
      </div>
    </div>
  );
};
