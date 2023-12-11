import type { FC, PropsWithChildren } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { OauthService } from '@/oauth/oauth.service';
import { oauthConfigFactory } from '@/oauth/config';
import { configFactory } from '@/config';
import { Profile } from '@/app/(secure)/profile';
import Logo from '@/app/opengraph-image.png';
import { Footer } from '@/app/footer.component';

const SecureLayout: FC<PropsWithChildren> = async ({ children }) => {
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
      <header className={'shadow'}>
        <div className={'container mx-auto px-2 py-2 basis-1 flex justify-between items-center'}>
          <Link href={'/'} className={'inline-flex items-center gap-1'}>
            <Image alt={'logo'} src={Logo} width={30} height={30} />
            <h1 className={'font-bold'}>Мой бюджет</h1>
          </Link>
          <Suspense fallback={<div>Profile loading...</div>}>
            <Profile />
          </Suspense>
        </div>
      </header>
      <main className={'container mx-auto basis-full'}>{children}</main>
      <Footer />
    </div>
  );
};

export default SecureLayout;
