/* src/utils/testing-helpers/createMemDB.js */
import { createConnection, EntitySchema } from 'typeorm';
type Entity = EntitySchema<unknown>;

export async function createInMemoryDB(entities: Entity[]) {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
  });
}
