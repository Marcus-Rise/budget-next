import type { FC } from 'react';
import { OauthVkLoginButton } from '@/oauth/components/vk-login-button';
import Link from 'next/link';
import metaConfig from '@/meta-config.cjs';
import { Footer } from '@/components/footer.component';
import { LogoImage } from '@/components/logo-image.component';
import { oauthService } from '@/oauth/service';

const LogoSize = 128;

const Login: FC = async () => {
  const loginUrl = await oauthService.getLoginUrl();

  return (
    <div className={'h-[calc(100dvh)] w-full flex flex-col'}>
      <main className={'bg-background basis-full self-center'}>
        <div className={'container flex flex-col gap-7 items-center justify-center h-full'}>
          <Link href="/">
            <h1 className={'font-bold text-center text-4xl'}>{metaConfig.title}</h1>
          </Link>

          <LogoImage size={LogoSize} />

          <p className={'text-center text-2xl'}>Добро пожаловать!</p>

          <Link className={'mx-auto w-80'} href={loginUrl.href} prefetch={false}>
            <OauthVkLoginButton />
          </Link>
        </div>
      </main>
      <Footer
        authorName={metaConfig.author.name}
        authorUrl={metaConfig.author.url}
        className={'bg-background basis-auto'}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Login;
