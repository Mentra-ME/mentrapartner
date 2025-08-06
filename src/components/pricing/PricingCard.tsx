import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, Save, X, DollarSign } from 'lucide-react';

interface PricingItem {
    id: number;
    name: string;
    description: string;
    default_price: string;
    custom_price: string | null;
    currency: string;
}

interface PricingCardProps {
    item: PricingItem;
    onUpdatePrice: (id: number, price: number) => void;
    isUpdating: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
                                                            item,
                                                            onUpdatePrice,
                                                            isUpdating,
                                                        }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [customPrice, setCustomPrice] = useState(
        item.custom_price || item.default_price
    );

    const handleSave = () => {
        const price = parseFloat(customPrice);
        if (price > 0) {
            onUpdatePrice(item.id, price);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setCustomPrice(item.custom_price || item.default_price);
        setIsEditing(false);
    };

    const currentPrice = item.custom_price || item.default_price;
    const hasCustomPrice = item.custom_price !== null;

    return (
        <Card className="shadow-elegant transition-smooth hover:shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <span className="text-2xl font-bold text-primary">د.إ</span>
                        </div>
                        {/*<div className="p-2 bg-primary/10 rounded-lg">*/}
                        {/*    <DollarSign className="h-5 w-5 text-primary" />*/}
                        {/*</div>*/}
                        <div>
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                    {!isEditing && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                            Default Price
                        </Label>
                        <p className="text-lg font-semibold text-foreground">
                            {item.default_price} {item.currency}
                        </p>
                    </div>
                    <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                            Current Price
                        </Label>
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={customPrice}
                                    onChange={(e) => setCustomPrice(e.target.value)}
                                    className="text-lg font-semibold"
                                    step="0.01"
                                    min="0"
                                />
                                <span className="text-sm text-muted-foreground">{item.currency}</span>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold text-foreground">
                                {currentPrice} {item.currency}
                                {hasCustomPrice && (
                                    <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Custom
                  </span>
                                )}
                            </p>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-2 pt-2">
                        <Button
                            onClick={handleSave}
                            disabled={isUpdating}
                            size="sm"
                            className="flex-1"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};