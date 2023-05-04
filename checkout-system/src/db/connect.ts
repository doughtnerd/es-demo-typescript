import {knex, Knex} from "knex";

export async function connectDB(config: Knex.Config): Promise<Knex> {

	// The check here is to ensure that the 'dev DB' is not copied over.
	const instance = knex(config);

	try { 
		const migrations = await instance.migrate.latest();
		console.log("Ran Migrations ", migrations);
	} catch(e) {
    if(e instanceof Error) {
      console.error(`Failed to start db connection: ${e.message}`);
    }
		throw e;
	}

	return instance;
}
