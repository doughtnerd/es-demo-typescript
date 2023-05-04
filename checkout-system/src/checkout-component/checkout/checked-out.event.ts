import {Message} from "@doughtnerd/message-store-connector";

export type CheckedOutEventData = {
  cartId: string;
  checkoutDate: string;
};

export type CheckedOutEvent = Message<CheckedOutEventData, 'CheckedOut'>;

