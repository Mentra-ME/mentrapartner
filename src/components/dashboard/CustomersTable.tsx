import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Skeleton} from '@/components/ui/skeleton';
import {ChevronLeft, ChevronRight, Download} from 'lucide-react';
import {useCustomers} from '@/hooks/useCustomers';

interface CustomersTableProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    title?: string;
}

export const CustomersTable: React.FC<CustomersTableProps> = ({currentPage, onPageChange, title}) => {
    const {customers, loading, error} = useCustomers(currentPage);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <Card className="shadow-elegant">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">{title ?? 'Patient Referrals'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full"/>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="shadow-elegant">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">{title ?? 'Patient Referrals'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive">Error loading customers: {error}</p>
                </CardContent>
            </Card>
        );
    }

    if (!customers?.data?.length) {
        return (
            <Card className="shadow-elegant">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No {title?.toLowerCase()} found.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-elegant">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                    {title} ({customers.total} total)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {/*<TableHead className="font-medium">Patient ID</TableHead>*/}
                            <TableHead className="font-medium">Name</TableHead>
                            <TableHead className="font-medium">Username</TableHead>
                            <TableHead className="font-medium">Email</TableHead>
                            <TableHead className="font-medium">Date Referred</TableHead>
                            {/*<TableHead className="font-medium">Export</TableHead>*/}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.data.map((customer) => (
                            <TableRow key={customer.id}>
                                {/*<TableCell className="font-medium">{customer.uid}</TableCell>*/}
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.username}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{formatDate(customer.created_at)}</TableCell>
                                {/*<TableCell>*/}
                                {/*    <Button variant="ghost" size="sm">*/}
                                {/*        <Download className="h-4 w-4"/>*/}
                                {/*    </Button>*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {customers.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {customers.from} to {customers.to} of {customers.total} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={!customers.prev_page_url}
                            >
                                <ChevronLeft className="h-4 w-4"/>
                                Previous
                            </Button>
                            <div className="flex items-center space-x-1">
                                {customers.links
                                    .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                                    .map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => link.url && onPageChange(parseInt(link.label))}
                                            disabled={!link.url}
                                        >
                                            {link.label}
                                        </Button>
                                    ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={!customers.next_page_url}
                            >
                                Next
                                <ChevronRight className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};