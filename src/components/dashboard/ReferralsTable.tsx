import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const referralsData = [
    {
        id: 'PT-1638',
        name: 'Margaret Perry',
        dateReferred: '2024-07-14',
        paymentMethod: 'Mentra App',
        claimStatus: 'Pending',
    },
    {
        id: 'PT-1140',
        name: 'Brian Watkins',
        dateReferred: '2024-07-12',
        paymentMethod: 'Partner Webapp',
        claimStatus: 'Approved',
    },
    {
        id: 'PT-2079',
        name: 'Virginia Hunter',
        dateReferred: '2024-07-10',
        paymentMethod: 'Partner Webapp',
        claimStatus: 'Paid',
    },
    {
        id: 'PT-0885',
        name: 'Louise Grant',
        dateReferred: '2024-07-10',
        paymentMethod: 'Mentra App',
        claimStatus: 'Approved',
    },
    {
        id: 'PT-0612',
        name: 'Glen Baker',
        dateReferred: '2024-07-08',
        paymentMethod: 'Partner Webapp',
        claimStatus: 'Pending',
    },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'secondary';
        case 'approved':
            return 'default';
        case 'paid':
            return 'default';
        default:
            return 'secondary';
    }
};

export const ReferralsTable: React.FC = () => {
    return (
        <Card className="shadow-elegant">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Latest Referrals</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">Patient ID</TableHead>
                            <TableHead className="font-medium">Name</TableHead>
                            <TableHead className="font-medium">Date Referred</TableHead>
                            <TableHead className="font-medium">Payment Method</TableHead>
                            <TableHead className="font-medium">Claim Status</TableHead>
                            <TableHead className="font-medium">Export</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {referralsData.map((referral) => (
                            <TableRow key={referral.id}>
                                <TableCell className="font-medium">{referral.id}</TableCell>
                                <TableCell>{referral.name}</TableCell>
                                <TableCell>{referral.dateReferred}</TableCell>
                                <TableCell>{referral.paymentMethod}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadgeVariant(referral.claimStatus)}>
                                        {referral.claimStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};