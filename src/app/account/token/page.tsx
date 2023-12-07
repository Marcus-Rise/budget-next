import type {FC} from 'react';
import {configFactory} from "@/helpers/config";
import {YandexTokenHandle} from "@/yandex/yandex-token-handle";

const TokenHandlePage: FC = () => {
    const {tokenAcceptRouteUrl} = configFactory();

    return (
        <YandexTokenHandle redirectTokenUrl={tokenAcceptRouteUrl}/>
    );
};

export default TokenHandlePage;
