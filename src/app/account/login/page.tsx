import {FC} from "react";
import YandexWidget from "@/app/account/login/yandex-widget";
import {headers} from "next/headers";


const Login: FC = async () => {
    const clientId = process.env.YANDEX_CLIENT_ID || "";
    const redirectUrl = (headers().get('hostname') || "") + "/api/account/token";

    return <>
        <YandexWidget clientId={clientId} redirectUrl={redirectUrl}/>
    </>;
}

export default Login;
