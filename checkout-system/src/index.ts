import bodyParser from 'body-parser';
import express from 'express';
import {startCartDataAggregator} from './cart-data-aggregator';
import {createCheckoutComponent} from './checkout-component';
import {connectDB} from './db/connect';
import config from './db/knexfile';
import {startDealItemAggregator} from './deal-item-aggregator';

async function start() {
  const db = await connectDB(config);
  const app = express();
  app.use(bodyParser.json());

  const checkoutComponentRouter = await createCheckoutComponent();
  app.use(checkoutComponentRouter);

  startCartDataAggregator(db);
  startDealItemAggregator(db);

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}

start();
