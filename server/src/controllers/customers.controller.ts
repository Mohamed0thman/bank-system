import { Request, Response, NextFunction } from "express";
import CustomerModel from "../models/customers.models";

const customerModel = new CustomerModel();

export const getAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await customerModel.getAll();
    res.status(200).json({
      status: "success",
      data: customers,
      message: "get all customers successfully",
    });
  } catch (err) {
    next(err);
  }
};
