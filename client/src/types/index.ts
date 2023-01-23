export type Link = {
  path: string;
  title: string;
};

export type Customer = {
  id: string;
  email: string;
  name: string;
  balance: number | string;
};

export type Transfers = {
  id: string;
  sender: Customer;
  receiver: Customer;
  balance: number;
  created_at: string;
};

export type CustomerTransfers = {
  id: string;
  customer: { id: string; name: string };
  otherCustomer: { id: string; name: string };
  status: string;
  balance: string;
  createdAt: string;
};
