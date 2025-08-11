import {
    DashboardResponse,
    InvoiceResponse,
    LoginRequest,
    LoginResponse,
    PricingResponse,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
    UpdatePricingRequest,
    UpdatePricingResponse
} from "@/lib/interfaceapi.ts";


const API_BASE_URL = 'https://staging.app.yourmentra.com/';


export class ApiError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }

    get userMessage(): string {
        if (this.status === 401) return 'Invalid email or password.';
        if (this.status === 403) return 'You are not authorized to perform this action.';
        if (this.status === 404) return 'Requested resource not found.';
        if (this.status === 500) return 'Internal server error. Please try again later.';
        return this.message || 'Something went wrong. Please try again.';
    }
}


export const apiRequest = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        let data: any;
        try {
            data = await response.json();
        } catch {
            throw new ApiError('Invalid server response', response.status);
        }

        if (!response.ok) {
            const errorMessage = data?.message || response.statusText || 'API request failed';
            throw new ApiError(errorMessage, response.status);
        }


        if (!data.success) {
            throw new ApiError(data.message || 'API request failed', response.status);
        }

        return data as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Network error or invalid response');
    }
};

export const authApi = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        return await apiRequest('api/v1/partner/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    updatePassword: async (passwordData: UpdatePasswordRequest, token: string): Promise<UpdatePasswordResponse> => {
        return await apiRequest('api/v1/partner/auth/update-password', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(passwordData),
        });
    },
};


export const dashboardApi = {
    getDashboardData: async (token: string): Promise<DashboardResponse> => {
        return await apiRequest('api/v1/partner/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    },
};

export const pricingApi = {
    getPricing: async (token: string): Promise<PricingResponse> => {
        return await apiRequest('api/v1/partner/settings/pricing', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    },

    updatePricing: async (pricingData: UpdatePricingRequest, token: string): Promise<UpdatePricingResponse> => {
        return await apiRequest('api/v1/partner/settings/pricing', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(pricingData),
        });
    },

    getPaywallFeatures: async (token: string): Promise<PricingResponse> => {
        return await apiRequest('api/v1/partner/features', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    },
};


export const invoiceApi = {
    getInvoices: async (token: string, month: number, year: number): Promise<InvoiceResponse> => {
        return await apiRequest(`api/v1/partner/invoice?month=${month}&year=${year}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    },
};