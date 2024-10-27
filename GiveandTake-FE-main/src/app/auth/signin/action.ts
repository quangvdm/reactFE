import { request } from "@/js/axios";

interface SignInCredentials {
    email: string;
    password: string;
}

export const signInUser = async (credentials: SignInCredentials) => {
    const response = await request.user.login(credentials.email, credentials.password);
    return response.data; // Assuming this includes user info and token
};