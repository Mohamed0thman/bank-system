import express from "express";
import customersRoutes from "./api/customers.routes";
import transfersRoutes from "./api/transfers.routes";

const routes = express.Router();

routes.use("/customers", customersRoutes);
routes.use("/transfers", transfersRoutes);

export default routes;
