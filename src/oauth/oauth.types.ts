type OauthSilentTokenPayload = {
    type: "silent_token" | string;
    token: string;
    ttl: number;
    uuid: string;
    user: {
        first_name: string;
        avatar: string;
    }
};

type OauthAccessTokenRequestDto = {
    /**
     * version
     */
    v: string;
    token: string;
    access_token: string;
    uuid: string;
}

type OauthAccessTokenResponseDto = {
    response: {
        "access_token": string,
        "access_token_id": string,
        "user_id": string,
        "phone": string,
        /**
         * date
         */
        "phone_validated": number,
        "is_service": boolean,
        "email": string,
        "source": number,
        "source_description": string
    }
}

export type {OauthSilentTokenPayload, OauthAccessTokenRequestDto, OauthAccessTokenResponseDto}
