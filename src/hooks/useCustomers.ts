import { useState, useEffect } from 'react';
import { customerApi } from '@/lib/api';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';

interface Customer {
    id: number;
    uid: string;
    name: string;
    username: string;
    email: string;
    partner_id: number;
    created_at: string;
}

interface CustomersData {
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
}

export const useCustomers = (page: number = 1) => {
    const { user } = useAuth();
    const [customers, setCustomers] = useState<CustomersData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            if (!user?.token) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await customerApi.getCustomers(user.token, page);
                setCustomers(response.data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch customers';
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [user?.token, page]);

    return {
        customers,
        loading,
        error,
        refetch: () => {
            if (user?.token) {
                setLoading(true);
                customerApi.getCustomers(user.token, page)
                    .then(response => setCustomers(response.data))
                    .catch(err => {
                        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch customers';
                        setError(errorMessage);
                        toast.error(errorMessage);
                    })
                    .finally(() => setLoading(false));
            }
        }
    };
};