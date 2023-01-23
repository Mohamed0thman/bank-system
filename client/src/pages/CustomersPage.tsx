import { Button, Container, Table } from "react-bootstrap";
import { Customer } from "../types";
import { Link } from "react-router-dom";

type Props = {
  customers: Customer[];
};

const CustomersPage = ({ customers }: Props) => {
  return (
    <div className="page">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>email</th>
              <th>name</th>
              <th>blance</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length ? (
              customers.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>${item.balance}</td>
                  <td style={{ textAlign: "center" }}>
                    <Link className="link-btn" to={`/customers/${item.id}`}>
                      Transfer
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>no items to show</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default CustomersPage;
