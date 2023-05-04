import {Knex} from "knex";
import {connectToMessageStore} from "../shared/connect-mdb";
import {startConsumer} from "./consumer";

export async function startDealItemAggregator(db: Knex) {
  const messageDb = await connectToMessageStore(process.env.MESSAGE_STORE_URI as string);

  startConsumer(messageDb, db);
}

