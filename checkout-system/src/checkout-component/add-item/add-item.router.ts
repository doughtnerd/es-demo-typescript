import {MessageStore} from "@doughtnerd/message-store-connector";
import {Router} from "express";
import { v4 as uuid } from 'uuid';
import * as types from 'pheno';
import {validateRequest} from "../../shared/validate.middleware";
import {ItemAddedEvent} from "./item-added.event";
import {cartProjection} from "../cart";

const addItemRequestValidator = types.objectWithOnlyTheseProperties({
  cartId: types.string,
  code: types.string,
  cost: types.number
});

export function createAddItemRouter(messageStore: MessageStore): Router {
  return Router().post(
    '/add-item', 
    validateRequest('body', addItemRequestValidator),
    async (req, res) => {
      const { cartId, code, cost } = req.body;
      
      const streamName = `cart-${cartId}`;

      const currentCart = await messageStore.project(streamName, cartProjection);

      // TODO: Use business logic and capture changes in an event

      return res.status(202).end();
    }
  );
}
