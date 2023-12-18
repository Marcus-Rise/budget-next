import 'dotenv-flow/config';
import * as path from 'path';
import { promises as fs } from 'fs';
import { FileMigrationProvider, Migrator } from 'kysely';
import { db } from '@/db';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @link https://kysely.dev/docs/migrations
 */
async function migrateToLatest() {
  /**
   * @link https://github.com/vercel/storage/issues/325?ysclid=lq9t0atagw503702362#issuecomment-1680858882
   */
  Object.defineProperty(db.getExecutor().adapter, 'supportsTransactionalDdl', () => false);

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.resolve(__dirname, 'migrations'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
