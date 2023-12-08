import type { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { OauthService } from '@/oauth/oauth.service';
import { oauthConfigFactory } from '@/oauth/config';
import { configFactory } from '@/config';
import { Profile } from '@/app/(secure)/profile';
import { Suspense } from 'react';
import Logo from '@/app/opengraph-image.png';

const SecureLayout: FC<PropsWithChildren> = async ({ children }) => {
  const year = new Date().getFullYear();
  const auth = cookies().get('Authorization');
  const userId = cookies().get('UserId');
  const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/');
  const redirectUrl = `/account/login?returnUrl=${returnUrl}`;

  if (!auth || !userId) {
    return redirect(redirectUrl);
  }

  try {
    await new OauthService(configFactory(), oauthConfigFactory()).checkToken(auth.value);
  } catch (e) {
    console.error(e);

    return redirect(redirectUrl);
  }

  return (
    <div className={'h-[calc(100dvh)] w-full flex flex-col'}>
      <header className={'px-2 py-2 basis-1 flex justify-between items-center shadow'}>
        <Link href={'/'} className={'inline-flex items-center gap-1'}>
          <Image alt={'logo'} src={Logo} width={30} height={30} />
          <h1 className={'font-bold'}>Мой бюджет</h1>
        </Link>
        <Suspense fallback={<div>Profile loading...</div>}>
          <Profile />
        </Suspense>
      </header>
      <main className={'basis-full'}>{children}</main>
      <footer className={'px-2 py-1 basis-auto flex justify-end gap-1'}>
        <span>&copy; {year}</span>
        <Link prefetch={false} href="https://ilya-konstantinov.ru">
          Ilya Konstantinov
        </Link>
      </footer>
    </div>
  );
};

export default SecureLayout;
