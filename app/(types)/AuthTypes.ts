type LoginRequest = { userName: string; password: string; rememberMe: boolean };
type TokenModel = {
    userId: Number;
    name: string;
    roleIds: Number[];
    accessToken: string;
    refreshToken: string;
    expiredDate: Date;
};
