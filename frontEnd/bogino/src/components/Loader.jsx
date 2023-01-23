import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/loader.json";

const styles = {
  loader: {
    width: "100vw",
    height: "auto",
    display: "flex",
    alignItems: "center",
  },
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const Loader = () => {
  return (
    <div>
      <div style={styles.loader}>
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    </div>
  );
};
