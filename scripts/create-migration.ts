import * as path from 'path';
import { promises as fs } from 'fs';
import { __dirname } from './_helper';

async function createMigration() {
  const templatePath = path.resolve(__dirname, '_migration.template.ts');
  const templateContent = await fs.readFile(templatePath);

  console.log('Migration template file is used: ', templatePath);

  const name = process.argv.at(2);

  if (!name) {
    throw new Error('Migration name is required as first arg');
  }

  const date = new Date();
  const dateISO = date.toISOString(); //"2011-12-19T15:28:46.493Z"
  const fileName = `${dateISO}-${name}.ts`;
  const filePath = path.resolve(__dirname, 'migrations', fileName);

  console.log('Migration will be created: ', filePath);

  await fs.writeFile(filePath, templateContent);
}

createMigration();
