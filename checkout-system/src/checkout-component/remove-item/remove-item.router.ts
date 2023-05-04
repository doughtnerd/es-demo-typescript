import {MessageStore} from "@doughtnerd/message-store-connector";
import {Router} from "express";
import { v4 as uuid } from 'uuid';
import * as types from 'pheno';
import {validateRequest} from "../../shared/validate.middleware";
import {ItemRemovedEvent} from "./item-removed.event";
import {cartProjection} from "../cart";

const removeItemRequestValidator = types.objectWithOnlyTheseProperties({
  cartId: types.string,
  code: types.string,
});

export function createRemoveItemRouter(messageStore: MessageStore): Router {
  return Router().post(
    '/remove-item', 
    validateRequest('body', removeItemRequestValidator),
    async (req, res) => {
      const { cartId, code } = req.body;

      const streamName = `cart-${cartId}`;

      const currentCart = await messageStore.project(streamName, cartProjection);
      const removedItem = currentCart.removeItem(code);

      if(!removedItem) {
        return res.status(409).end();
      }

      await messageStore.writeMessage<ItemRemovedEvent>(streamName, {
        id: uuid(),
        type: 'ItemRemoved',
        data: {
          cartId,
          code
        },
        metadata: {}
      });

      return res.status(202).end();
    }
  );
}

