const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    options.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
    options.credentials = 'include';

    let res = await fetch(`${API_URL}${endpoint}`, options);

    if (res.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!refreshRes.ok) {
                    throw new Error('Refresh token thất bại hoặc đã hết hạn');
                }

                const data = await refreshRes.json();
                const newAccessToken = data.access_token;

                if (typeof window !== 'undefined') {
                    localStorage.setItem('access_token', newAccessToken);
                }

                isRefreshing = false;
                onRefreshed(newAccessToken);
            } catch (error) {
                isRefreshing = false;
                refreshSubscribers = [];
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('access_token');
                    window.location.href = '/auth/login';
                }
                return Promise.reject(error);
            }
        }

        return new Promise<Response>((resolve) => {
            subscribeTokenRefresh(async (newToken: string) => {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                };

                resolve(await fetch(`${API_URL}${endpoint}`, options));
            });
        });
    }

    return res;
}
