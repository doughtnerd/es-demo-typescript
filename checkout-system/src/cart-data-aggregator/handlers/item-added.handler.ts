import {MessageHandlerFunc} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {ItemAddedEvent} from "../../checkout-component/add-item/item-added.event";

export function createItemAddedHandler(db: Knex): MessageHandlerFunc {
  return async (message) => {
    const { cartId, cost, code } = (message as ItemAddedEvent).data
    const [existingCart] = await db.table('cart').where({ id: cartId }).limit(1);

    if (existingCart) {
      existingCart.data.items.push({ code, cost });
      existingCart.data.totalCost += cost;
      await db.table('cart').where({ id: cartId }).update({ data: existingCart.data });
    } else {
      await db.table('cart').insert({ id: cartId, data: { items: [{code,cost}], totalCost: cost } });
    }
  }
}
