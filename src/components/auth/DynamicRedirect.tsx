import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '@/components/auth/AuthProvider';

const DynamicRedirect = () => {
    const {user, isLoading} = useAuth();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (!user.reset_password) {
        return <Navigate to="/update-password" replace/>;
    }

    return user.user_type === 'hospital'
        ? <Navigate to="/dashboard-hospital" replace/>
        : <Navigate to="/dashboard" replace/>;
};

export default DynamicRedirect;
