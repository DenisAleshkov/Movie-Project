import React from "react";
import style from "./NotFound.module.css";
const NotFound = ({title}) => {
  return (
    <div className={style.circ}>
      <div className={style.load}>{title}</div>
      <div className={style.hands}></div>
      <div className={style.body}></div>
      <div className={style.head}>
        <div className={style.eye}></div>
      </div>
    </div>
  );
};

export default NotFound;
