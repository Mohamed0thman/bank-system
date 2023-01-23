import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Table, Form } from "react-bootstrap";
import agent from "../api/agent";
import { BlackSpinner } from "../components";
import { Customer, CustomerTransfers } from "../types";
import Select from "react-select";
import { formateDate } from "../helpers";
import { toast } from "react-toastify";

type Option = {
  value: string;
  label: string;
};

type Props = {
  customers: Customer[];
};

const CustomerTransferPage = ({ customers }: Props) => {
  let { customerId } = useParams();
  const [loading, setLoading] = useState(false);
  const [transfers, setTransfers] = useState<CustomerTransfers[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const [otherCustomer, setOtherCustomer] = useState({
    value: "",
    label: "",
  });
  const [balance, setBalance] = useState<number>(0);
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    try {
      setCurrentCustomer(
        customers.find((item) => item.id == customerId) as Customer
      );
      fetchTransfers();
    } catch (err) {
      console.error("there is error");
    }
  }, [customerId]);

  const fetchTransfers = async () => {
    setLoading(true);
    await agent.Transfers.getByCustomers(customerId as string)
      .then((res) => {
        setTransfers(res.data);
      })
      .catch(() => {
        console.error("there is error");
      })
      .finally(() => setLoading(false));
  };

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingBtn(true);
    const data = {
      sender_id: customerId,
      receiver_id: otherCustomer.value,
      balance,
    };
    await agent.Transfers.create(data)
      .then(() => {
        const res: CustomerTransfers = {
          id: transfers[0].id + 1,
          customer: {
            id: customerId as string,
            name: currentCustomer?.name as string,
          },
          otherCustomer: {
            id: otherCustomer.value,
            name: otherCustomer.label,
          },
          createdAt: formateDate(),
          balance: `- ${balance}`,
          status: "send to",
        };
        setTransfers((pre) => [res, ...pre]);
        setCurrentCustomer({
          ...currentCustomer,
          balance: ((currentCustomer?.balance as number) - balance).toFixed(2),
        } as Customer);
        toast.success("transfir sucees");
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => setLoadingBtn(false));
  }
  const options: Option[] = [];
  customers.map((item) => {
    if (item.id != customerId) {
      options.push({ value: item.id, label: item.name });
    }
  });

  return (
    <div className="page">
      <Container>
        <div className="mt-4">
          <h3>Email: {currentCustomer?.email}</h3>
          <h3>Name: {currentCustomer?.name}</h3>
          <h3>balance: ${currentCustomer?.balance}</h3>
        </div>
        <Form
          onSubmit={(e) => handleOnSubmit(e)}
          className="d-flex  justify-content-between align-items-center mb-3 mt-4"
        >
          <div className="d-flex  justify-content-center align-items-center">
            <Select
              onChange={(e) =>
                setOtherCustomer({ label: e?.label, value: e?.value } as {
                  label: string;
                  value: string;
                })
              }
              options={options}
              className="select"
            />
            <Form.Group
              controlId="formBasicEmail"
              style={{ marginLeft: "10px" }}
            >
              <Form.Control
                type="number"
                placeholder="Enter balance"
                onChange={(e) => setBalance(Number(e.target.value) as number)}
              />
            </Form.Group>
          </div>

          <div>
            <Button variant="primary" type="submit" disabled={loadingBtn}>
              {loadingBtn && <BlackSpinner />} Submit
            </Button>
          </div>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>status</th>
              <th>Other Customer</th>
              <th>transfer</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transfers.length && !loading ? (
              transfers.map((item,i) => (
                <tr key={item.id}>
                  <td>{i +1}</td>
                  <td>
                    <Link to={`/customers/${item.customer.id}`}>
                      {item.customer.name}
                    </Link>
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/customers/${item.otherCustomer.id}`}>
                      {item.otherCustomer.name}
                    </Link>
                  </td>
                  <td>$ {item.balance}</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  {loading ? <BlackSpinner /> : "NO HISTORY FOUND"}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default CustomerTransferPage;
