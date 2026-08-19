import api from "../../../utils/api";

export const userLogin = (existingUser: any) => {
    return api.post('auth/login', existingUser);
}

export const userRegister = (newUser: any) => {
    return api.post('auth/register', newUser);
}

export const userUpdate = (userId: any, updatedBody: any) => {
    return api.put(`auth/${userId}`, updatedBody);
}


export const googleLogin = (credential: any) => {
    return api.post('auth/google-auth', { credential });
}

export const userLogout = () => {
    return api.post('auth/logout');
}

export const refreshToken = () => {
    return api.post('auth/refresh-tokens');
}

export const getMe = () => {
    return api.get('auth/me');
}

export const updateAdsConnection = (connected: boolean) => {
    return api.patch('users/me/ads-connection', { connected });
}

export const forgotPassword = (email: string) => {
    return api.post('auth/forgot-password', { email });
}

export const resetPassword = (token: string, password: string) => {
    return api.post('auth/reset-password', { token, password });
}