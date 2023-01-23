import db from "../db";
import { Transfer } from "../types/transferType";

const now = new Date();

const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formateDate(date: Date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return (
    day +
    "-" +
    monthNames[monthIndex] +
    "-" +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
}

class TransferModel {
  //create Transfer
  async create(t: Transfer): Promise<boolean> {
    const connection = await db.connect();
    try {
      await connection.query("BEGIN");

      const { sender_id, receiver_id, balance } = t;
      console.log("sender_id", sender_id);

      const hasBalanceSql = `select  count(*) from customers
      where id = $1 and balance >= $2`;

      const hasBalance = await connection.query(hasBalanceSql, [
        sender_id,
        balance,
      ]);

      if (hasBalance.rows[0].count == 0) {
        throw Error("customer dont have  mony");
      }
      console.log("haveMny", hasBalance.rows);

      const receverSql = `UPDATE customers SET balance = balance+$1 
        WHERE id = $2 RETURNING *`;
      const revever = await connection.query(receverSql, [
        balance,
        receiver_id,
      ]);

      if (!revever.rows.length) {
        throw Error("something went wrong");
      }

      const senderSql = `UPDATE customers SET balance = balance-$1 
      WHERE id = $2 RETURNING *`;
      const sender = await connection.query(senderSql, [balance, sender_id]);

      if (!sender.rows.length) {
        throw Error("something went wrong");
      }

      const transferSql = `INSERT INTO transfers ( sender_id, receiver_id, balance, created_at ) 
        values ($1, $2, $3, $4) RETURNING *`;
      const transfer = await connection.query(transferSql, [
        sender_id,
        receiver_id,
        balance,
        now,
      ]);
      if (!transfer.rows.length) {
        throw Error("something went wrong");
      }

      await connection.query("COMMIT");
      return true;
    } catch (error) {
      await connection.query("ROLLBACK");

      throw {
        status: 422,
        message: `Error at retrieving transfers, ${(error as Error).message}`,
        error: new Error(),
      };
    } finally {
      connection.release();
    }
  }

  async getAll(): Promise<Transfer[]> {
    const connection = await db.connect();

    try {
      const sql = `select t.*, 
      json_build_object('id',cs.id,'email',cs.email,'name',cs.name ) as sender, 
      json_build_object('id',cr.id,'email',cr.email,'name',cr.name ) as receiver 
      from transfers as t
      inner join customers as cs on cs.id = t.sender_id
      inner join customers as cr on cr.id = t.receiver_id
      order by t.id desc
      `;
      const result = await connection.query(sql);

      const formatResult = result.rows.map((item) => {
        return {
          ...item,
          created_at: formateDate(item.created_at),
        };
      });

      return formatResult;
    } catch (error) {
      throw {
        status: 422,
        message: `Error at retrieving transfers, ${(error as Error).message}`,
        error: new Error(),
      };
    } finally {
      connection.release();
    }
  }

  // get specific History
  async getCustomerHistory(id: string): Promise<any[]> {
    const connection = await db.connect();

    try {
      console.log("id", id);

      const sql = `
        select t.id, case when cs.id = $1 then json_build_object('name',cs.name, 'id',cs.id)  
        else json_build_object('name',cr.name, 'id',cr.id)   END  as customer,
        case when cs.id != $1 then json_build_object('name',cs.name, 'id',cs.id)   
        else json_build_object('name',cr.name, 'id',cr.id) 
        END  as othercustomer,
        case when cs.id =$1  then 'send to' else 'receive from' END  as status,
        case when cs.id =$1  then - t.balance else  t.balance END  as balance,
        t.created_at
        from transfers as t
        join customers as cs on cs.id = t.sender_id
        join customers as cr on cr.id = t.receiver_id
        where cs.id = $1 or cr.id = $1
        order by t.id desc 
      `;
      const result = await connection.query(sql, [id]);

      if (!result.rows.length) {
        throw Error("product not exist");
      }

      const finalRes = result.rows.map((item) => ({
        id: item.id,
        customer: { id: item.customer.id, name: item.customer.name },
        otherCustomer: {
          id: item.othercustomer.id,
          name: item.othercustomer.name,
        },
        status: item.status,
        balance: item.balance,
        createdAt: item.created_at,
      }));
      return finalRes;
    } catch (error) {
      throw {
        status: 422,
        message: `Could not find product,  ${(error as Error).message}`,
        error: new Error(),
      };
    } finally {
      connection.release();
    }
  }
}

export default TransferModel;
