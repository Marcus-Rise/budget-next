import { FC } from 'react';
import { OauthVkLoginButton } from '@/oauth/vk-login-button';
import { oauthConfigFactory } from '@/oauth/config';
import { LoginLink } from '@/app/account/login/login-link.component';
import Image from 'next/image';
import Logo from '@/app/icon.png';
import Link from 'next/link';
import metaConfig from '@/meta-config.cjs';
import { Footer } from '@/app/footer.component';

const Login: FC = () => {
  const { appId, redirectUrl, idApiUrl } = oauthConfigFactory();

  const logoSize = 100;

  return (
    <div className={'h-[calc(100dvh)] w-full flex flex-col'}>
      <main className={'bg-background basis-full self-center'}>
        <div className={'container flex flex-col gap-7 items-center justify-center h-full'}>
          <Link href="/">
            <h1 className={'font-bold text-center text-4xl'}>{metaConfig.title}</h1>
          </Link>

          <Image alt={'logo'} src={Logo} width={logoSize} height={logoSize} />

          <p className={'text-center text-2xl'}>Добро пожаловать!</p>

          <LoginLink
            className={'mx-auto w-80'}
            apiUrl={idApiUrl}
            appId={appId}
            redirectUri={redirectUrl}
            responseType={'silent_token'}
          >
            <OauthVkLoginButton />
          </LoginLink>
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
