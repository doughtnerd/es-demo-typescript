import {Message} from "@doughtnerd/message-store-connector";

export type ItemRemovedEventData = {
  cartId: string;
  code: string;
};

export type ItemRemovedEvent = Message<ItemRemovedEventData, 'ItemRemoved'>;

