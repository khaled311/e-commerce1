import Link from "next/link";
import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="footer-container">
      <p>2023 Sarhan E-commerce app</p>
      <p className="icons">
        <a
          href={"https://www.linkedin.com/in/ksarhan311/"}
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin />
        </a>
        <a
          href={"https://github.com/khaled311"}
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub />
        </a>
      </p>
    </div>
  );
};

export default Footer;
