import { apiFetch } from "./BaseApi";

export const AuthService = {
    async register(
        username: string,
        email: string,
        phone: string,
        timezone: string,
        password: string,
        confirmPassword: string
    ) {
        return apiFetch("/api/v1/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                short_name: username,
                tel: phone,
                tz: timezone,
                password1: password,
                password2: confirmPassword,
            }),
        });
    },

    async login(username: string, password: string) {
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("username", username);
        params.append("password", password);
        params.append("scope", "");

        return apiFetch("/api/v1/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });
    },

    async refresh() {
        const res = await apiFetch("/api/v1/auth/refresh", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
    }


};
