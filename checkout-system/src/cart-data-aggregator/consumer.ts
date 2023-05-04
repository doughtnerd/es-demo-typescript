import {MessageHandlers, MessageStore} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {createHandlers} from "./handlers";

const subscriberId = 'bdc0b47e-6c53-455d-9223-8e8dbb690114';

export function startConsumer(messageStore: MessageStore, db: Knex) {
  const handlers: MessageHandlers = createHandlers(db);
  messageStore.subscribeToCategory(subscriberId, 'cart', handlers, {pollingInterval: 1000});
}
