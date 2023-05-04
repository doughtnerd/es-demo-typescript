import {MessageHandlerFunc} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {CheckedOutEvent} from "../../checkout-component/checkout/checked-out.event";

export function createCheckedOutHandler(db: Knex): MessageHandlerFunc {
  return async (message) => {
    const { cartId, checkoutDate } = (message as CheckedOutEvent).data
    const [existingCart] = await db.table('cart').where({ id: cartId }).limit(1);

    if (existingCart) {
      await db.table('cart').where({ id: cartId }).update({ checkout_date: checkoutDate });
    }
  }
}
