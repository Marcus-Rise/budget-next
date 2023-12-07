import type {FC} from 'react';
import {configFactory} from "@/helpers/config";
import {YandexTokenHandle} from "@/yandex/yandex-token-handle";

const TokenHandlePage: FC = () => {
    const {redirectOriginUrl} = configFactory();

    return (
        <YandexTokenHandle redirectUrl={redirectOriginUrl}/>
    );
};

export default TokenHandlePage;
