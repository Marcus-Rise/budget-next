import {FC} from "react";
import YandexWidget from "@/app/account/login/yandex-widget";
import {headers} from "next/headers";


const Login: FC = async () => {
    const clientId = process.env.YANDEX_CLIENT_ID || "";
    const redirectUrl = (headers().get('hostname') || "");

    return <>
        <YandexWidget clientId={clientId} redirectUrl={redirectUrl} tokenPageUrl={redirectUrl + "/api/account/token"}/>
    </>;
}

export default Login;
