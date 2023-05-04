import express from 'express';
import {connectToMessageStore} from "../shared/connect-mdb";
import {startConsumer} from "./consumer";
import {Knex} from "knex";

const router = express.Router();
router.get('cart/:cartId', () => {});

export async function startCartDataAggregator(db: Knex) {
  const messageDb = await connectToMessageStore(process.env.MESSAGE_STORE_URI as string);

  startConsumer(messageDb, db);
}

