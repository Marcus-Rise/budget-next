import {NextResponse} from "next/server";

const AcceptOauthToken = (req: Request) => {
    // todo отладить отладочный токен
    const url = new URL(req.url);
    const headers = Array.from(req.headers.entries());

    return NextResponse.json({
        accessToken: url.searchParams.get("access_token"),
        tokenType: url.searchParams.get("token_type"),
        expiresIn: url.searchParams.get("expires_in"),
        headers,
    });
};

export {AcceptOauthToken as GET}
