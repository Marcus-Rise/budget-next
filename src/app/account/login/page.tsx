import {FC} from "react";
import YandexWidget from "./yandex-widget";

const Login: FC = () => {
    const clientId = process.env.YANDEX_CLIENT_ID!;
    const redirectUrl = new URL(process.env.YANDEX_REDIRECT_URL!).href;
    const tokenPageUrl = new URL("/api/account/token", redirectUrl).href;

    return <>
        <YandexWidget clientId={clientId} redirectUrl={redirectUrl} tokenPageUrl={tokenPageUrl}/>
    </>;
}

export default Login;
