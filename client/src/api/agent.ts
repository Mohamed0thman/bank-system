/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/";
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
};

const Customers = {
  get: () => requests.get("customers"),
};

const Transfers = {
  create: (values: any) => requests.post("transfers", values),
  getAll: () => requests.get("transfers"),
  getByCustomers: (customerId: string) =>
    requests.get(`transfers/${customerId}`),
};

const agent = {
  Customers,
  Transfers,
};

export default agent;
