import type { TransactionTable } from '@/transaction/repository/transaction.table';
import type { OauthCredentialsTable } from '@/oauth/repository/oauth-credentials.table';

interface Database {
  transactions: TransactionTable;
  oauthCredentials: OauthCredentialsTable;
}

export type { Database };
