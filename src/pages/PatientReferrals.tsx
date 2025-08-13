import React, {useState} from 'react';
import {CustomersTable} from '@/components/dashboard/CustomersTable';

export const PatientReferrals: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Patient Referrals</h1>
                <p className="text-muted-foreground">Manage and view all patient referrals</p>
            </div>

            <CustomersTable
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                title='Patient Referrals'
            />
        </div>
    );
};