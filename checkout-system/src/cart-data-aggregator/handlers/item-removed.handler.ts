import {MessageHandlerFunc} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {ItemRemovedEvent} from "../../checkout-component/remove-item/item-removed.event";

export function createItemRemovedHandler(db: Knex): MessageHandlerFunc {
  return async (message) => {
    const { cartId, code } = (message as ItemRemovedEvent).data
    const [existingCart] = await db.table('cart').where({ id: cartId }).limit(1);

    if (existingCart) {
      const itemIndex = existingCart.data.items.findIndex(item => item.code === code);
      const [removedItem] = existingCart.data.items.splice(itemIndex, 1)

      existingCart.data.totalCost -= removedItem.cost;

      await db.table('cart').where({ id: cartId }).update({ data: existingCart.data });
    }
  }
}
