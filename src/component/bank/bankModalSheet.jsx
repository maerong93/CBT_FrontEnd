import React from "react";
import styles from "../modal/view/viewModal.module.css";

const BankModalSheet = ({text,src,alt,ex1,ex2,ex3,ex4,ex5}) => {

  return (
    <li className={styles.sheet}>
      <div className={styles.sheetText}>
        <span className={styles.selectNum}></span>
        <p  dangerouslySetInnerHTML={{__html: ex1}}></p>
        <p  dangerouslySetInnerHTML={{__html: ex2}}></p>
        <p  dangerouslySetInnerHTML={{__html: ex3}}></p>
        <p  dangerouslySetInnerHTML={{__html: ex4}}></p>
        <p  dangerouslySetInnerHTML={{__html: ex5}}></p>
      </div>
      {
        src &&
        <div className={src === undefined ? styles.hideModal : styles.sheetImg}>
          <img src={src} alt={alt} />
        </div>
      }
      
    </li>
  );
};

export default BankModalSheet;
