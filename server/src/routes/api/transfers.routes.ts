import { Router } from "express";
import * as controllers from "../../controllers/transfers.controller";

const routes = Router();
// api/transfers
routes.route("/").post(controllers.create);
routes.route("/").get(controllers.getAll);
routes.route("/:customerId").get(controllers.getCustomerHistory);

export default routes;
