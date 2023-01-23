import { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import agent from "../api/agent";
import { BlackSpinner, Spinners } from "../components";
import { Transfers } from "../types";

const TransfersPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [transfers, setTransfers] = useState<Transfers[]>([]);

  useEffect(() => {
    try {
      fetchTransfers();
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const fetchTransfers = async () => {
    setLoading(true);
    await agent.Transfers.getAll()
      .then((res) => {
        console.log(res.data);
        setTransfers(res.data);
      })
      .catch((err) => {
        setError(err.message);

        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <Spinners />;
  }

  return (
    <div className="page">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>sender</th>
              <th>recevier</th>
              <th>blance</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transfers.length && !loading ? (
              transfers.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.sender.name}</td>
                  <td>{item.receiver.name}</td>
                  <td>${item.balance}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <BlackSpinner />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default TransfersPage;
