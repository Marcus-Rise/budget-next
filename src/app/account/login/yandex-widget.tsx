"use client"

import {FC} from "react";
import Script from "next/script";

declare var YaAuthSuggest: any;

const YandexWidget: FC<{ clientId: string; redirectUrl: string; tokenPageUrl: string; }> = (props) =>
    <Script
        onLoad={() => {
            console.debug(props, YaAuthSuggest)
            YaAuthSuggest.init(
                {
                    client_id: props.clientId,
                    response_type: 'token',
                    redirect_uri: props.tokenPageUrl
                },
                props.redirectUrl
            )
                .then((data: any) => console.debug(data.handler()))
                .then((data: any) => console.debug(data))
        }}
        src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"
    />

export default YandexWidget;
