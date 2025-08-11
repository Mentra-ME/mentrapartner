import React, {useState} from 'react';
import {InvoicesTable} from '@/components/dashboard/InvoicesTable';
import {useInvoices} from '@/hooks/useInvoices';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Skeleton} from '@/components/ui/skeleton';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {FileText} from 'lucide-react';

export const Invoices: React.FC = () => {
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const {data: invoicesData, isLoading, error} = useInvoices(selectedMonth, selectedYear);

    const months = [
        {value: 1, label: 'January'},
        {value: 2, label: 'February'},
        {value: 3, label: 'March'},
        {value: 4, label: 'April'},
        {value: 5, label: 'May'},
        {value: 6, label: 'June'},
        {value: 7, label: 'July'},
        {value: 8, label: 'August'},
        {value: 9, label: 'September'},
        {value: 10, label: 'October'},
        {value: 11, label: 'November'},
        {value: 12, label: 'December'},
    ];

    const years = Array.from({length: 5}, (_, i) => currentDate.getFullYear() - i);

    if (error) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <FileText className="h-4 w-4"/>
                    <AlertDescription>
                        Failed to load invoices. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Invoices</h1>
                <div className="flex gap-4">
                    <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select month"/>
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month.value} value={month.value.toString()}>
                                    {month.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select year"/>
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isLoading ? (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-6 w-48"/>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {Array.from({length: 5}).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full"/>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : invoicesData?.data && invoicesData.data.length > 0 ? (
                <InvoicesTable
                    invoices={invoicesData.data}
                    month={selectedMonth}
                    year={selectedYear}
                />
            ) : (
                <Card>
                    <CardContent className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                            <h3 className="text-lg font-semibold mb-2">No invoices found</h3>
                            <p className="text-muted-foreground">
                                No invoices available for {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};