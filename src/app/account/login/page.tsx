import {FC} from "react";
import YandexWidget from "@/app/account/login/yandex-widget";
import {headers} from "next/headers";
import Script from "next/script";


const Login: FC = async () => {
    const clientId = process.env.YANDEX_CLIENT_ID || "";
    const redirectUrl = (headers().get('hostname') || "");

    return <>
        <Script
            strategy={"beforeInteractive"}
            src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"
        />
        <YandexWidget clientId={clientId} redirectUrl={redirectUrl} tokenPageUrl={redirectUrl + "/api/account/token"}/>
    </>;
}

export default Login;
