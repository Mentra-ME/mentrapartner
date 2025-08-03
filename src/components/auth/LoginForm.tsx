import React, {useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import logo from '../../../public/assets/pngs/logo.png';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {useAuth} from './AuthProvider';
import {useToast} from '@/hooks/use-toast';
import {Loader2} from 'lucide-react';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, user} = useAuth();
    const {toast} = useToast();
    const navigate = useNavigate();

    if (user) {
        const redirectPath = user.user_type === 'hospital' ? '/dashboard-hospital' : '/dashboard';
        return <Navigate to={redirectPath} replace/>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await login(email, password);

        if (typeof result === 'object' && result !== null) {
            toast({
                title: 'Welcome back!',
                description: 'Successfully logged into Mentra Dashboard',
            });

            const isHospital = result.user_type === 'hospital';
            navigate(isHospital ? '/dashboard-hospital' : '/dashboard', {replace: true});
        } else {
            toast({
                title: 'Login failed',
                description: "Invalid Credentials",
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-elegant">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary rounded-full">
                            <img className="h-8 w-auto" alt="logo" src={logo}/>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Mentra</CardTitle>
                    <CardDescription>Partner Dashboard Login</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@mentra.edu"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};
