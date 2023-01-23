import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import bankeImage from "../assets/images/online-purchasing-payment-e-commerce-banking.jpg";
const HomePage = () => {
  return (
    <div
      className="home-page"
      style={{
        background: ` linear-gradient(
      rgba(0, 0, 0, 0.9), 
      rgba(0, 0, 0, 0.7)
    ), url(${bankeImage})`,
        overflow: "hidden",
      }}
    >
      <Container className="h-100">
        <div className="h-100 d-flex flex-column justify-content-center align-items-center">
          <h1 className="home-title">ONLINE BANK</h1>
          <h3>Manage your money 24/7 worldwide with our e-banking</h3>
          <p className="home-text">
            Our e-banking platform lets you quickly and securely manage your
            everyday expenses: send international transfers, recharge your
            prepaid card, and much more to discover!
          </p>

          <div className="mt-3">
            <Link className="btn-link" to="/customers">
              Customers
            </Link>
            <Link className="btn-link" to="transfers">
              Transfers History
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
