export type RefreshTokenPayload = {
    id: number;
};
export type TokenPayload = {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin";
};
export type RefreshToken = {
    refreshToken: string;
};
export type AuthPayload = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
};
export type VerifyPayload = {
    id: string;
};
//# sourceMappingURL=auth.types.d.ts.map