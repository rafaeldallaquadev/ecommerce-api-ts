export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
};
export type SafeUser = {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'admin';
};
export type RegisterUserDTO = {
    name: string;
    email: string;
    password: string;
};
export type LoginUserDTO = {
    email: string;
    password: string;
};
export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    id: number;
    name: string;
    email: string;
};
export type UserId = {
    id: number;
};
//# sourceMappingURL=user.types.d.ts.map