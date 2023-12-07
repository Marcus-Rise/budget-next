"use client"

import {FC} from "react";
import Script from "next/script";

declare var YaAuthSuggest: any;

const YandexLoginWidget: FC<{ clientId: string; redirectOriginUrl: string; redirectUrl: string; }> = (props) =>
    <Script
        onLoad={() => {
            YaAuthSuggest.init(
                {
                    client_id: props.clientId,
                    response_type: 'token',
                    redirect_uri: props.redirectUrl
                },
                props.redirectOriginUrl,
                {
                    view: "button",
                    parentId: "buttonContainerId",
                    buttonSize: 'm',
                    buttonView: 'main',
                    buttonTheme: 'light',
                    buttonBorderRadius: "0",
                    buttonIcon: 'ya',
                }
            )
                .then((data: any) => data.handler())
                .then((data: any) => console.debug(data))
        }}
        src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"
    />

export {YandexLoginWidget};
