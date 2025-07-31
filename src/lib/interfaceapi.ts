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

