"use client"

import {FC} from "react";
import Script from "next/script";

declare var YaAuthSuggest: any;

const YandexWidget: FC<{ clientId: string; redirectUrl: string; }> = ({clientId, redirectUrl}) => {
    return <Script
        onLoad={() => {
            console.debug(YaAuthSuggest)
            YaAuthSuggest.init(
                {
                    client_id: clientId,
                    response_type: 'token',
                    redirect_uri: redirectUrl
                },
                redirectUrl
            )
        }}
        src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"
    />
}

export default YandexWidget;
