type IConfig = {
    clientId: string;
    redirectUrl: string;
    tokenPageUrl: string;
    tokenAcceptRouteUrl: string;
}

const configFactory = (): IConfig => {
    const redirectUrl = new URL(process.env.YANDEX_REDIRECT_URL!);

    return ({
        clientId: process.env.YANDEX_CLIENT_ID!,
        redirectUrl: redirectUrl.href,
        tokenPageUrl: new URL("/account/token", redirectUrl).href,
        tokenAcceptRouteUrl: new URL("/api/account/token", redirectUrl).href,
    });
};

export {configFactory}
