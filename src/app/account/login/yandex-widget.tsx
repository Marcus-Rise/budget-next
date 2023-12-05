"use client"

import {FC, useEffect} from "react";

declare var YaAuthSuggest: any;

const YandexWidget: FC<{ clientId: string; redirectUrl: string; tokenPageUrl: string; }> = ({clientId, redirectUrl, tokenPageUrl}) => {
    useEffect(() => {
        console.debug(YaAuthSuggest)
        YaAuthSuggest.init(
            {
                client_id: clientId,
                response_type: 'token',
                redirect_uri: tokenPageUrl
            },
            redirectUrl
        )
            .then((data: any) => console.debug(data.handler()))
            .then((data: any) => console.debug(data))
    }, [clientId, redirectUrl, tokenPageUrl])

    return <></>
}

export default YandexWidget;
