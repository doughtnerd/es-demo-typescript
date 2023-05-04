import {MessageStore} from "@doughtnerd/message-store-connector";
import {Router} from "express";
import {connectToMessageStore} from "../shared/connect-mdb";
import {createAddItemRouter} from "./add-item/add-item.router";
import {createCheckoutRouter} from "./checkout/checkout.router";
import {createRemoveItemRouter} from "./remove-item/remove-item.router";

export async function createCheckoutComponent() {
  const messageStore: MessageStore = await connectToMessageStore(process.env.MESSAGE_STORE_URI as string);

  const router = Router();
  router.use(createAddItemRouter(messageStore));
  router.use(createRemoveItemRouter(messageStore));
  router.use(createCheckoutRouter(messageStore));

  return router;
}
