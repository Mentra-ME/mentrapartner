export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        company_name: string;
        email: string;
        partner_id: number;
        group: string;
        reset_password: boolean;
    };
}


export interface UpdatePasswordRequest {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
}

export interface UpdatePasswordResponse {
    success: boolean;
    message: string;
    data: null;
}

export interface DashboardResponse {
    success: boolean;
    message: string;
    data: {
        total_users: number;
        total_ai_sessions: number;
        average_session_duration: number;
        monthly_sessions: Array<{
            month: string;
            sessions: number;
        }>;
        weekly_activity: Array<{
            day: string;
            active: number;
        }>;
        latest_sessions: Array<{
            id: number;
            reference: string;
            startDate: string;
            endDate: string;
            userName: string;
            userEmail: string;
            status: string;
            crisisDetected: boolean;
            escalated: boolean;
            chatMode: string;
            duration: string;
            date: string;
        }>;
        top_journals: string[];
        daily_active_users: Array<{
            day: string;
            active: number;
        }>;
    };
}


export interface PricingItem {
    id: number;
    name: string;
    description: string;
    default_price: string;
    custom_price: string | null;
    currency: string;
}

export interface PricingResponse {
    trace_id: string;
    success: boolean;
    message: string;
    data: PricingItem[];
}

export interface UpdatePricingRequest {
    features: Array<{
        paywall_feature_id: number;
        custom_price: number;
    }>;
}

export interface UpdatePricingResponse {
    trace_id: string;
    success: boolean;
    message: string;
    data: null;
}


export interface InvoiceItem {
    paywall_feature_id: number;
    feature_name: string;
    quantity: number;
    total_amount_paid_by_users: string;
    mentra_payout: string;
}

export interface InvoiceResponse {
    trace_id: string;
    success: boolean;
    message: string;
    data: InvoiceItem[];
}


export interface Customer {
    id: number;
    uid: string;
    name: string;
    username: string;
    email: string;
    partner_id: number;
    created_at: string;
}

export interface CustomersResponse {
    trace_id: string;
    success: boolean;
    message: string;
    data: {
        current_page: number;
        data: Customer[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}
