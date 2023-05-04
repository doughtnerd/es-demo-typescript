import {MessageHandlers} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {createCheckedOutHandler} from "./checked-out.handler";
import {createItemAddedHandler} from "./item-added.handler";
import {createItemRemovedHandler} from "./item-removed.handler";


export function createHandlers(db: Knex): MessageHandlers {
  return {
    ItemAdded: createItemAddedHandler(db),
    ItemRemoved: createItemRemovedHandler(db),
    CheckedOut: createCheckedOutHandler(db)
  };
}
