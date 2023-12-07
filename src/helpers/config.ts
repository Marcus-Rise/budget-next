type IConfig = {
    clientId: string;
    redirectOriginUrl: string;
    tokenPageUrl: string;
}

const configFactory = (): IConfig => {
    const redirectUrl = new URL(process.env.YANDEX_REDIRECT_URL!);

    return ({
        clientId: process.env.YANDEX_CLIENT_ID!,
        redirectOriginUrl: redirectUrl.href,
        tokenPageUrl: new URL("/account/token", redirectUrl).href,
    });
};

export {configFactory}
