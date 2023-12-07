import {IOauthConfig} from "@/oauth/config";
import {OauthAccessTokenResponseDto, OauthSilentTokenPayload} from "@/oauth/oauth.types";
import {OauthLoginException} from "@/oauth/oauth-login.exception";

class OauthService {
    constructor(private readonly _config: IOauthConfig) {
    }

    async login(payload: OauthSilentTokenPayload) {
        const requestUrl = new URL("/method/auth.exchangeSilentAuthToken", this._config.apiBaseUrl)
        requestUrl.searchParams.set("v", this._config.apiVersion);
        requestUrl.searchParams.set("token", payload.token);
        requestUrl.searchParams.set("access_token", this._config.serviceToken);
        requestUrl.searchParams.set("uuid", payload.uuid);

        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new OauthLoginException(response.statusText);
        }

        const dto: OauthAccessTokenResponseDto = await response.json();

        if (!dto.response) {
            console.error(dto);

            throw new OauthLoginException("Invalid oauth response");
        }

        return dto.response.access_token;
    }
}

export {OauthService}
