import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api';
import { useAuth } from '@/components/auth/AuthProvider';

export interface DashboardData {
    totalUsers: number;
    totalAiSessions: number;
    averageSessionDuration: number;
    latestSessions: Array<{
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
    topJournals: string[];
    dailyActiveUsers: Array<{
        day: string;
        active: number;
    }>;
    monthlySessions: Array<{
        month: string;
        sessions: number;
    }>;
    weeklyActivity: Array<{
        day: string;
        active: number;
    }>;
}

const getDefaultWeekActivity = () => ([
    { day: 'Mon', active: 0 },
    { day: 'Tue', active: 0 },
    { day: 'Wed', active: 0 },
    { day: 'Thu', active: 0 },
    { day: 'Fri', active: 0 },
    { day: 'Sat', active: 0 },
    { day: 'Sun', active: 0 },
]);

export const useDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const transformResponse = (response: any): DashboardData => ({
        totalUsers: response.data.total_users,
        totalAiSessions: response.data.total_ai_sessions,
        averageSessionDuration: response.data.average_session_duration,
        latestSessions: response.data.latest_sessions.map((session: any) => ({
            id: session.id,
            reference: session.reference,
            startDate: new Date(session.startDate || session.starts_at).toLocaleDateString(),
            endDate: new Date(session.endDate || session.ends_at).toLocaleDateString(),
            userName: session.userName || session.user?.name || 'Anonymous',
            userEmail: session.userEmail || session.user?.email || '',
            status: session.status,
            crisisDetected: session.crisisDetected ?? session.crisis_detected ?? false,
            escalated: session.escalated ?? false,
            chatMode: session.chatMode || session.chat_mode || '',
            duration: session.duration || '',
            date: new Date(session.date || session.created_at).toLocaleDateString(),
        })),
        topJournals: response.data.top_journals,
        dailyActiveUsers: response.data.daily_active_users.length > 0
            ? response.data.daily_active_users
            : getDefaultWeekActivity(),
        monthlySessions: response.data.monthly_sessions ?? [],
        weeklyActivity: response.data.weekly_activity ?? getDefaultWeekActivity(),
    });

    const fetchDashboardData = async () => {
        if (!user?.token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await dashboardApi.getDashboardData(user.token);
            const transformedData = transformResponse(response);
            setData(transformedData);
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [user.token]);

    const refetch = async () => {
        await fetchDashboardData();
    };

    return { data, isLoading, error, refetch };
};
