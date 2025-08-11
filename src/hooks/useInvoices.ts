import {useQuery} from '@tanstack/react-query';
import {invoiceApi} from '@/lib/api';
import {useAuth} from '@/components/auth/AuthProvider';

export const useInvoices = (month: number, year: number) => {
    const {user} = useAuth();

    return useQuery({
        queryKey: ['invoices', month, year],
        queryFn: () => invoiceApi.getInvoices(user!.token, month, year),
        enabled: !!user?.token,
    });
};
