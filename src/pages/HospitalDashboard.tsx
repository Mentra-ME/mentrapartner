import React from 'react';
import {HospitalMetricCard} from '@/components/dashboard/HospitalMetricCard';
import {SettlementChart} from '@/components/dashboard/SettlementChart';
import {ReferralsTable} from '@/components/dashboard/ReferralsTable';
import {
    ClipboardList,
    Users,
    FileText,
} from 'lucide-react';

export const HospitalDashboard: React.FC = () => {

    const DirhamIcon = ({color = 'white'}) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
        >
            <text
                x="0"
                y="20"
                fontSize="30"
                fill={color}
            >
                د.إ
            </text>
        </svg>
    );


    return (
        <div className="p-6 space-y-6">
            {/* Top metrics row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HospitalMetricCard
                    title="Total Earnings"
                    value={new Intl.NumberFormat('en-AE', {style: 'currency', currency: 'AED'}).format(23550)}
                    icon={DirhamIcon}
                    iconBgColor="bg-teal-600"
                />
                <HospitalMetricCard
                    title="Claim Requests Pending"
                    value="8"
                    icon={ClipboardList}
                    iconBgColor="bg-amber-500"
                />
                <HospitalMetricCard
                    title="Referred Patients"
                    value="46"
                    icon={Users}
                    iconBgColor="bg-blue-500"
                />
                <HospitalMetricCard
                    title="Invoices Generated"
                    value="12"
                    icon={FileText}
                    iconBgColor="bg-teal-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 h-full">
                    <div className="flex items-center justify-center bg-teal-50 p-6 rounded-xl h-full">
                        <div className="flex items-center">
                            <div className=" p-8 rounded-sm flex items-center justify-center">
                                <HospitalMetricCard
                                    title="Price per Session"
                                    value={new Intl.NumberFormat('en-AE', {style: 'currency', currency: 'AED'}).format(75)}
                                    icon={() => <DirhamIcon color="#000"/>}
                                    iconBgColor="bg-teal-100"
                                    className="h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <SettlementChart/>
                </div>
            </div>

            {/* Referrals table */}
            <ReferralsTable/>
        </div>
    );
};