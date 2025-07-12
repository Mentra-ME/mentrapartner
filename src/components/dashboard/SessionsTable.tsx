import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
];

export const SessionsTable: React.FC = () => {
  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Latest Sessions</CardTitle>
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
            {sessionsData.map((session) => (
              <TableRow key={session.sessionRef} className="hover:bg-muted/50">
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
                  <Badge 
                    variant={session.crisisDetected ? 'destructive' : 'secondary'}
                  >
                    {session.crisisDetected ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={session.escalated ? 'destructive' : 'secondary'}
                  >
                    {session.escalated ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{session.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};