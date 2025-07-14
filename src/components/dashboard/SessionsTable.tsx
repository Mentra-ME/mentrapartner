import React, {useState} from 'react';
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
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Button} from '@/components/ui/button';

const sessionsData = [
    {
        studentId: 'STU-3421',
        chatMode: 'AI',
        sessionRef: 'MTR-1023',
        duration: '12 mins',
        crisisDetected: true,
        escalated: true,
        date: '2025-07-11',
    },
    {
        studentId: 'STU-1395',
        chatMode: 'Journaling',
        sessionRef: 'MTR-1012',
        duration: '18 mins',
        crisisDetected: false,
        escalated: false,
        date: '2025-07-10',
    },
    {
        studentId: 'STU-2457',
        chatMode: 'Human',
        sessionRef: 'MTR-0995',
        duration: '24 mins',
        crisisDetected: true,
        escalated: true,
        date: '2025-07-09',
    },
    {
        studentId: 'STU-2450',
        chatMode: 'AI',
        sessionRef: 'MTR-0995',
        duration: '24 mins',
        crisisDetected: true,
        escalated: false,
        date: '2025-07-09',
    },
];

export const SessionsTable: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [crisisFilter, setCrisisFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');

    const clearFilters = () => {
        setSearchId('');
        setCrisisFilter('all');
        setDateFilter('');
    };

    const filteredData = sessionsData.filter((session) => {
        const matchId = session.studentId.toLowerCase().includes(searchId.toLowerCase());
        const matchCrisis =
            crisisFilter === 'all'
                ? true
                : crisisFilter === 'yes'
                    ? session.crisisDetected
                    : !session.crisisDetected;
        const matchDate = dateFilter === '' ? true : session.date === dateFilter;

        return matchId && matchCrisis && matchDate;
    });

    return (
        <Card className="shadow-elegant">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="text-lg font-semibold">Latest Sessions</CardTitle>

                    {/* Filters with individual labels */}
                    <div className="flex flex-wrap gap-4 items-end justify-end">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="searchId" className="text-sm text-muted-foreground">
                                Student ID
                            </label>
                            <Input
                                id="searchId"
                                type="text"
                                placeholder="e.g., STU-3421"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                className="w-44"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="crisisFilter" className="text-sm text-muted-foreground">
                                Crisis Detected
                            </label>
                            <Select value={crisisFilter} onValueChange={setCrisisFilter}>
                                <SelectTrigger id="crisisFilter" className="w-40">
                                    <SelectValue placeholder="All"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="dateFilter" className="text-sm text-muted-foreground">
                                Date
                            </label>
                            <Input
                                id="dateFilter"
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-40"
                            />
                        </div>

                        <div className="flex items-end h-full">
                            <Button
                                variant="ghost"
                                className="text-sm border border-input"
                                onClick={clearFilters}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Chat Mode</TableHead>
                            <TableHead>Session Ref</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Crisis Detected</TableHead>
                            <TableHead>Escalated</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((session, index) => (
                                <TableRow
                                    key={`${session.studentId}-${session.sessionRef}-${session.date}-${index}`}
                                    className="hover:bg-muted/50"
                                >
                                    <TableCell className="font-medium">{session.studentId}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={session.chatMode === 'AI' ? 'default' : 'secondary'}
                                            className="bg-primary/10 text-primary hover:bg-primary/20"
                                        >
                                            {session.chatMode}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{session.sessionRef}</TableCell>
                                    <TableCell>{session.duration}</TableCell>
                                    <TableCell>
                                        <Badge variant={session.crisisDetected ? 'destructive' : 'secondary'}>
                                            {session.crisisDetected ? 'Yes' : 'No'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={session.escalated ? 'destructive' : 'secondary'}>
                                            {session.escalated ? 'Yes' : 'No'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{session.date}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-4">
                                    No sessions match your filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    );
};
