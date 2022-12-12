import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";

import logo from "../../Theme/Assets/Images/logo.svg";
import ButtonCustom from "../Button/ButtonCustom";
import ConnectWallet from "../Modal/ConnectWallet/ConnectWallet";
import "./HeaderStyle.scss";

const Header = () => {
  const location = useLocation();
  console.log("location", location?.pathname);
  return (
    <Navbar className="header-style">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" className="d-block mx-auto mb-1" />
          EQ8-Survey
        </Navbar.Brand>
        {location?.pathname == "/thankyou-for-response" ? null : (
          <Nav className="ms-auto">
            {/* <ButtonCustom className="border-btn" title="Connect Wallet" /> */}
            <ConnectWallet />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
