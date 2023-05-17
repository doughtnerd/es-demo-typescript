import {MessageHandlerFunc} from "@doughtnerd/message-store-connector";
import {Knex} from "knex";
import {CheckedOutEvent} from "../../checkout-component/checkout/checked-out.event";
import {ItemRemovedEvent} from "../../checkout-component/remove-item/item-removed.event";

export function createCheckedOutHandler(db: Knex): MessageHandlerFunc {
  return async (message, { messageStore }) => {
    const { cartId, checkoutDate } = (message as CheckedOutEvent).data

    const { position, globalPosition } = message;

    const streamName = `cart-${cartId}`;

    // TODO: Add projection that looks at the message right before checkout to see if it was a removed event.

    if(removedBeforeCheckout) {
      const [existingDealItem] = await db.table('deal_item').where({ item_code: removedBeforeCheckout });

      if (existingDealItem) {
        await db.table('deal_item').update({ times_removed: existingDealItem.times_removed + 1 }).where({ item_code: removedBeforeCheckout });
      } else {
        await db.table('deal_item').insert({ item_code: removedBeforeCheckout, times_removed: 1 });
      }
    }
  }
}
