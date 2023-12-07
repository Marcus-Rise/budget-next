import {FC} from "react";
import {OauthVkLoginButton} from "@/oauth/vk-login-button";
import {oauthConfigFactory} from "@/oauth/config";

const Login: FC = () => {
    const {appId, redirectUrl} = oauthConfigFactory();

    return (
        <OauthVkLoginButton appId={appId} redirectUrl={redirectUrl}/>
    );
}

export default Login;
