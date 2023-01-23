import db from "../db";
import { Customer } from "../types/customerType";

class CustomerModel {
  // get all Customers
  async getAll(): Promise<Customer[]> {
    const connection = await db.connect();

    try {
      const sql = "SELECT id, email, name, balance from customers order by id";
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      throw {
        status: 422,
        message: `Error at retrieving customers, ${(error as Error).message}`,
        error: new Error(),
      };
    } finally {
      connection.release();
    }
  }
}

export default CustomerModel;
