import { useState, useEffect } from 'react';
import { pricingApi } from '@/lib/api';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';

interface PricingItem {
    id: number;
    name: string;
    description: string;
    default_price: string;
    custom_price: string | null;
    currency: string;
}

export const usePricing = () => {
    const [pricing, setPricing] = useState<PricingItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const { user } = useAuth();

    const fetchPricing = async () => {
        if (!user?.token) return;

        setLoading(true);
        try {
            const response = await pricingApi.getPricing(user.token);
            setPricing(response.data);
        } catch (error) {
            toast.error('Failed to fetch pricing data');
            console.error('Error fetching pricing:', error);
        } finally {
            setLoading(false);
        }
    };

    const updatePricing = async (updates: Array<{ paywall_feature_id: number; custom_price: number }>) => {
        if (!user?.token) return;

        setUpdating(true);
        try {
            await pricingApi.updatePricing({ features: updates }, user.token);
            toast.success('Pricing updated successfully');
            await fetchPricing(); // Refresh data
        } catch (error) {
            toast.error('Failed to update pricing');
            console.error('Error updating pricing:', error);
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        fetchPricing();
    }, [user?.token]);

    return {
        pricing,
        loading,
        updating,
        fetchPricing,
        updatePricing,
    };
};