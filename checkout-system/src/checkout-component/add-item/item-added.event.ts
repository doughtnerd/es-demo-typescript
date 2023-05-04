import {Message} from "@doughtnerd/message-store-connector";

export type ItemAddedEventData = {
  cartId: string;
  code: string;
  cost: number;
};

export type ItemAddedEvent = Message<ItemAddedEventData, 'ItemAdded'>;
