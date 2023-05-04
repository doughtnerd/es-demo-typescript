import {MessageHandlers, MessageStore} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {createHandlers} from "./handlers";

const subscriberId = 'deal-item-agg-consumer-2';

export function startConsumer(messageStore: MessageStore, db: Knex) {
  const handlers: MessageHandlers = createHandlers(db);
  messageStore.subscribeToCategory(subscriberId, 'cart', handlers, { pollingInterval: 1000 });
}
