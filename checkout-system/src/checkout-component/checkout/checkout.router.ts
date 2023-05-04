import {MessageStore} from "@doughtnerd/message-store-connector";
import {Router} from "express";
import { v4 as uuid } from 'uuid';
import * as types from 'pheno';
import {validateRequest} from "../../shared/validate.middleware";
import {CheckedOutEvent} from "./checked-out.event";
import {cartProjection} from "../cart";

const checkoutRequestValidator = types.objectWithOnlyTheseProperties({
  cartId: types.string
});

export function createCheckoutRouter(messageStore: MessageStore): Router {
  return Router().post(
    '/checkout',
    validateRequest('body', checkoutRequestValidator),
    async (req, res) => {
      const { cartId } = req.body;

      const streamName = `cart-${cartId}`;

      const currentCart = await messageStore.project(streamName, cartProjection);
      const checkoutDate = currentCart.checkout();

      if (!checkoutDate) {
        return res.status(409).end();
      }

      await messageStore.writeMessage<CheckedOutEvent>(streamName, {
        id: uuid(),
        type: 'CheckedOut',
        data: {
          cartId,
          checkoutDate
        },
        metadata: {}
      });

      return res.status(202).end();
    }
  );
}

