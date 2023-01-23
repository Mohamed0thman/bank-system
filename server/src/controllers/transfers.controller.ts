import { Request, Response, NextFunction } from "express";
import TransferModel from "../models/transfers.models";

const transferModel = new TransferModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transfer = await transferModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: transfer,
      message: "create  transfer successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const transfes = await transferModel.getAll();
    res.status(200).json({
      status: "success",
      data: transfes,
      message: "get all customers successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getCustomerHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transfes = await transferModel.getCustomerHistory(
      req.params.customerId as string
    );
    res.status(200).json({
      status: "success",
      data: transfes,
      message: "get all customers successfully",
    });
  } catch (err) {
    next(err);
  }
};
