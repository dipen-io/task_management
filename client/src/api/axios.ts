import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true, // Good: This ensures HttpOnly cookies (like refresh tokens) are sent
});

api.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    async (error) => {
        // Store the original request so we can retry it later
        const originalRequest = error.config;

        // Check if the error is 401 (Unauthorized) AND we haven't already retried this request
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Set flag to prevent infinite refresh loops

            try {
                const response = await axios.post(
                    "http://localhost:8080/api/v1/auth/refresh",
                    {},
                    { withCredentials: true }
                );

                const { data } = response.data;
                const newAccessToken = data.accessToken;
                // 1. Save it to localStorage immediately so future reloads have it
                localStorage.setItem('token', newAccessToken);

                // 2. Dispatch a custom event to tell your React Context to update!
                window.dispatchEvent(new CustomEvent('onTokenRefresh', {
                    detail: newAccessToken
                }));

                // 3. Retry the original request
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // If refresh fails, they are fully logged out. Tell React to clear state.
                window.dispatchEvent(new Event('onTokenExpired'));
                return Promise.reject(refreshError);
            }


        }

        // Gentle correction: It's better to reject with the actual error object rather than just the string message.
        // If you only return the string, components calling the API can't check the status code if they need to.
        const message = error.response?.data?.message || "Something went wrong";
        console.error("API Error:", message);

        // We attach your custom message to the error object so you can easily access it in your components
        error.customMessage = message;

        return Promise.reject(error);
    }
);

export default api;
