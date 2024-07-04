import type { FC } from 'react';
import { OauthVkLoginButton } from '@/oauth/components/vk-login-button';
import { oauthConfigFactory } from '@/oauth/config';
import { OauthLoginLink } from '@/oauth/components/oauth-login-link.component';
import Link from 'next/link';
import metaConfig from '@/meta-config.cjs';
import { Footer } from '@/components/footer.component';
import { LogoImage } from '@/components/logo-image.component';

const LogoSize = 128;

const Login: FC = () => {
  const { appId, redirectUrl, idApiUrl } = oauthConfigFactory();

  return (
    <div className={'h-[calc(100dvh)] w-full flex flex-col'}>
      <main className={'bg-background basis-full self-center'}>
        <div className={'container flex flex-col gap-7 items-center justify-center h-full'}>
          <Link href="/">
            <h1 className={'font-bold text-center text-4xl'}>{metaConfig.title}</h1>
          </Link>

          <LogoImage size={LogoSize} />

          <p className={'text-center text-2xl'}>Добро пожаловать!</p>

          <OauthLoginLink
            className={'mx-auto w-80'}
            apiUrl={idApiUrl}
            appId={appId}
            redirectUri={redirectUrl}
            responseType={'silent_token'}
          >
            <OauthVkLoginButton />
          </OauthLoginLink>
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
