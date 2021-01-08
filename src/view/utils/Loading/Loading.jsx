import React from "react";
import style from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={style.circ}>
      <div className={style.load}>Loading . . . </div>
      <div className={style.hands}></div>
      <div className={style.body}></div>
      <div className={style.head}>
        <div className={style.eye}></div>
      </div>
    </div>
  );
};

export default Loading;
