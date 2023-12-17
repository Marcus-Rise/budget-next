import * as path from 'path';
import { promises as fs } from 'fs';

async function createMigration() {
  const date = new Date();
  const dateISO = date.toISOString(); //"2011-12-19T15:28:46.493Z"
  const fileName = path.resolve('./scripts/migrations', dateISO) + '.ts';

  console.log(fileName);

  await fs.writeFile(fileName, '');
}

createMigration();
