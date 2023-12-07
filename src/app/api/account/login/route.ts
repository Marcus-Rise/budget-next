import {NextRequest, NextResponse} from "next/server";
import {OauthSilentTokenPayload} from "@/oauth/oauth.types";
import {oauthConfigFactory} from "@/oauth/config";
import {OauthService} from "@/oauth/oauth.service";
import {OauthLoginException} from "@/oauth/oauth-login.exception";
import {cookies} from "next/headers";

const AccountLogin = async (req: NextRequest) => {
    const payloadString = req.nextUrl.searchParams.get("payload");

    if (!payloadString) {
        return NextResponse.json({message: "No payload"}, {status: 400})
    }

    const payload: OauthSilentTokenPayload = JSON.parse(payloadString);

    const service = new OauthService(oauthConfigFactory())

    try {
        const accessToken = await service.login(payload);

        cookies().set("Authorization", accessToken, {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            expires: new Date() // todo надо срок действия токена
        })

        const redirectUrl = new URL(req.nextUrl);
        redirectUrl.pathname = "/";
        redirectUrl.search = "";
        redirectUrl.hash = "";

        return NextResponse.redirect(redirectUrl);
    } catch (e) {
        if (e instanceof OauthLoginException) {
            return NextResponse.json({
                message: e.message
            }, {
                status: 401
            })
        }

        console.error(e);

        return NextResponse.json({
            message: e
        }, {
            status: 500
        })
    }

};

export {AccountLogin as GET}
