import { FC } from 'react';
import { OauthVkLoginButton } from '@/oauth/vk-login-button';
import { oauthConfigFactory } from '@/oauth/config';

const Login: FC = () => {
  const { appId, redirectUrl, idApiUrl } = oauthConfigFactory();

  return (
    <div className={'flex flex-col gap-2'}>
      <p className={'text-center text-2xl'}>Добро пожаловать!</p>

      <div className={'mx-auto w-80'}>
        <OauthVkLoginButton
          appId={appId}
          redirectUrl={redirectUrl}
          apiUrl={new URL('/auth', idApiUrl)}
        />
      </div>
    </div>
  );
};

export default Login;
