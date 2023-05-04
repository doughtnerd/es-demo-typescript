import {MinimalWritableMessage, Projection} from "@doughtnerd/message-store-connector";
import {ItemAddedEvent} from "./add-item/item-added.event";
import {CheckedOutEvent} from "./checkout/checked-out.event";
import {ItemRemovedEvent} from "./remove-item/item-removed.event";

type CartItem = {
  code: string;
  cost: number;
}

export class Cart {

  private items: CartItem[] = [];
  private isCheckedOut = false;

  addItem(code: string, cost: number): CartItem | null {
    if(!this.isCheckedOut) {
      this.items.push({code, cost});
      return {
        code,
        cost
      }
    }
    return null;
  }

  removeItem(code: string): CartItem | null {
    if(!this.isCheckedOut) {
      const index = this.items.findIndex(item => item.code === code);
      if(index>=0) {
        const [removedItem] = this.items.splice(index, 1);
        return removedItem;
      }
    }
    return null;
  }

  checkout(): string | null {
    if(!this.isCheckedOut && this.items.length !== 0) {
      this.isCheckedOut = true;
      return new Date().toISOString();
    }
    return null;
  }
}

export const cartProjection: Projection<Cart, ItemAddedEvent | ItemRemovedEvent | CheckedOutEvent> = {
  projectionName: 'Cart Write Model Projection',
  entity: () => new Cart(),
  handlers: {
    ItemAdded: (entity, message) => {
      entity.addItem(message.data.code, message.data.cost);
      return entity;
    },
    ItemRemoved: (entity, message) => {
      entity.removeItem(message.data.code);
      return entity;
    },
    CheckedOut: (entity, _) => {
      entity.checkout();
      return entity;
    }
  }
}
