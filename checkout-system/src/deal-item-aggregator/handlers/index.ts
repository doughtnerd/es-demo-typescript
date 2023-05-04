import {MessageHandlers} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {createCheckedOutHandler} from "./checked-out.handler";

export function createHandlers(db: Knex): MessageHandlers {
  return {
    CheckedOut: createCheckedOutHandler(db)
  };
}
