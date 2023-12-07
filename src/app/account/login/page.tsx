import {FC} from "react";
import {YandexLoginWidget} from "@/yandex/yandex-login-widget";
import {configFactory} from "@/helpers/config";

const Login: FC = () => {
    const {tokenPageUrl, redirectOriginUrl, clientId} = configFactory();

    return <>
        <YandexLoginWidget clientId={clientId} redirectOriginUrl={redirectOriginUrl} redirectUrl={tokenPageUrl}/>
    </>;
}

export default Login;
