import { EventideClient, PostgresClient, MessageStore } from '@doughtnerd/message-store-connector';
import { Client } from 'pg';

export async function connectToMessageStore(connectionString: string): Promise<MessageStore> {
  const pgClient = new Client({
    connectionString
  });

  await pgClient.connect();

  const sqlClient = new PostgresClient(pgClient);
  const client = new EventideClient(sqlClient);

  const messageStore = new MessageStore(client, console);

  return messageStore;
}
