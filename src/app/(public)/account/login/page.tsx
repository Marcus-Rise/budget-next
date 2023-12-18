import { FC } from 'react';
import { OauthVkLoginButton } from '@/oauth/vk-login-button';
import { oauthConfigFactory } from '@/oauth/config';
import { LoginLink } from '@/app/(public)/account/login/login-link.component';

const Login: FC = () => {
  const { appId, redirectUrl, idApiUrl } = oauthConfigFactory();

  return (
    <div className={'flex flex-col gap-2'}>
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
  );
};

export const dynamic = 'force-dynamic';

export default Login;
