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
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
        })

        return NextResponse.redirect("/");
    } catch (e) {
        if (e instanceof OauthLoginException) {
            return NextResponse.json({
                message: e.message
            }, {
                status: 401
            })
        }
    }

};

export {AccountLogin as GET}
