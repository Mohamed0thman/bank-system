import { Router } from "express";
import * as controllers from "../../controllers/customers.controller";

const routes = Router();
// api/customers
routes.route("/").get(controllers.getAll);

export default routes;
