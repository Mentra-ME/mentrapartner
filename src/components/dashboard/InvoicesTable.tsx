import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';

interface InvoiceItem {
    paywall_feature_id: number;
    feature_name: string;
    quantity: number;
    total_amount_paid_by_users: string;
    mentra_payout: string;
}

interface InvoicesTableProps {
    invoices: InvoiceItem[];
    month: number;
    year: number;
}

export const InvoicesTable: React.FC<InvoicesTableProps> = ({invoices, month, year}) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const totalRevenue = invoices.reduce((sum, item) =>
        sum + parseFloat(item.total_amount_paid_by_users), 0
    );

    const totalPayout = invoices.reduce((sum, item) =>
        sum + parseFloat(item.mentra_payout), 0
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Invoices - {monthNames[month - 1]} {year}</span>
                    <div className="flex gap-4 text-sm">
                        <Badge variant="secondary">
                            Total Revenue: AED {totalRevenue.toFixed(2)}
                        </Badge>
                        <Badge variant="default">
                            Total Payout: AED {totalPayout.toFixed(2)}
                        </Badge>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subscription ID</TableHead>
                            <TableHead>Subscription Plan</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Total Paid by Users</TableHead>
                            <TableHead className="text-right">Mentra Payout</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.paywall_feature_id}>
                                <TableCell>
                                    <Badge variant="outline">#{invoice.paywall_feature_id}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {invoice.feature_name}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="secondary">{invoice.quantity}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono">
                                    AED {parseFloat(invoice.total_amount_paid_by_users).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-right font-mono text-primary font-semibold">
                                    AED {parseFloat(invoice.mentra_payout).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};