import type { FC, PropsWithChildren } from 'react';
import { v4 as uuid } from 'uuid';
import Link from 'next/link';

type OauthLoginLinkProps = PropsWithChildren<{
  className?: string;
  apiUrl: string;
  appId: string | number;
  responseType: 'silent_token' | string;
  redirectUri: string;
}>;

const OauthLoginLink: FC<OauthLoginLinkProps> = ({
  className,
  children,
  apiUrl,
  appId,
  redirectUri,
  responseType,
}) => {
  const oauthUrl = new URL('/auth', apiUrl);
  oauthUrl.searchParams.append('app_id', String(appId));
  oauthUrl.searchParams.append('response_type', responseType);
  oauthUrl.searchParams.append('redirect_uri', redirectUri);
  oauthUrl.searchParams.append('uuid', uuid());

  return (
    <Link className={className} href={oauthUrl} prefetch={false}>
      {children}
    </Link>
  );
};

export { OauthLoginLink };
