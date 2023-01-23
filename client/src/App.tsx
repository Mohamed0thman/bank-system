import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import agent from "./api/agent";
import { Spinners } from "./components";
import Layout from "./Layout";
import { Customer } from "./types";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const CustomersPage = React.lazy(() => import("./pages/CustomersPage"));
const TransfersPage = React.lazy(() => import("./pages/TransfersPage"));
const CustomerTransferPage = React.lazy(
  () => import("./pages/CustomerTransferPage")
);

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    try {
      fetchCustomers();
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    await agent.Customers.get()
      .then((res) => {
        console.log(res.data);
        setCustomers(res.data);
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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/customers"
          element={<CustomersPage customers={customers} />}
        />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route
          path="/customers/:customerId"
          element={<CustomerTransferPage customers={customers} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
