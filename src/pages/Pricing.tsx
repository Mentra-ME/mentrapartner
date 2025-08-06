import React from 'react';
import { usePricing } from '@/hooks/usePricing';
import { PricingCard } from '@/components/pricing/PricingCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Pricing: React.FC = () => {
    const { pricing, loading, updating, updatePricing, fetchPricing } = usePricing();

    const handleUpdatePrice = async (id: number, price: number) => {
        await updatePricing([{ paywall_feature_id: id, custom_price: price }]);
    };

    const handleRefresh = () => {
        fetchPricing();
    };

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Pricing Management</h1>
                        <p className="text-muted-foreground">Manage your session pricing and rates</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="shadow-elegant">
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-48" />
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Skeleton className="h-4 w-20 mb-2" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                    <div>
                                        <Skeleton className="h-4 w-20 mb-2" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <span className="text-2xl font-bold text-primary">د.إ</span>
                    </div>

                    {/*<div className="p-3 bg-primary/10 rounded-lg">*/}
                    {/*    <DollarSign className="h-8 w-8 text-primary" />*/}
                    {/*</div>*/}
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Pricing Management</h1>
                        <p className="text-muted-foreground">Manage your session pricing and rates</p>
                    </div>
                </div>
                <Button
                    onClick={handleRefresh}
                    variant="outline"
                    disabled={loading || updating}
                >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {pricing.length === 0 ? (
                <Card className="shadow-elegant">
                    <CardContent className="p-8 text-center">
                        {/*<DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>*/}
                        <span className="h-12 w-12 text-muted-foreground mx-auto mb-4 block text-4xl">د.إ</span>
                        <h3 className="text-lg font-semibold text-foreground mb-2">No Pricing Data</h3>
                        <p className="text-muted-foreground">No pricing information available at the moment.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pricing.map((item) => (
                        <PricingCard
                            key={item.id}
                            item={item}
                            onUpdatePrice={handleUpdatePrice}
                            isUpdating={updating}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};