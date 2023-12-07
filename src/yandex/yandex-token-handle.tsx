'use client'

import type {FC} from 'react';
import Script from "next/script";

declare var YaSendSuggestToken: any;

const YandexTokenHandle: FC<{redirectUrl: string}> = ({redirectUrl}) => {
    return (
        <>
            <Script
                onLoad={() => {
                    YaSendSuggestToken(
                        redirectUrl,
                        {
                            flag: true
                        }
                    )

                }}
                src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js" />


        </>
    );
};

export {YandexTokenHandle};
