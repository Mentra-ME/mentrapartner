import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/components/auth/AuthProvider';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const updatePasswordSchema = z.object({
    old_password: z.string().min(1, 'Current password is required'),
    new_password: z.string().min(6, 'New password must be at least 6 characters'),
    new_password_confirmation: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New passwords don't match",
    path: ["new_password_confirmation"],
});

type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;

export default function UpdatePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const { user, logout } = useAuth();
    const { toast } = useToast();

    const form = useForm<UpdatePasswordForm>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            old_password: '',
            new_password: '',
            new_password_confirmation: '',
        },
    });

    const onSubmit = async (data: UpdatePasswordForm) => {
        if (!user?.token) {
            toast({
                title: "Error",
                description: "You must be logged in to update your password.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            await authApi.updatePassword({
                old_password: data.old_password,
                new_password: data.new_password,
                new_password_confirmation: data.new_password_confirmation,
            }, user.token);

            toast({
                title: "Success",
                description: "Password updated successfully. Please log in again.",
            });

            form.reset();

            // Logout user after successful password update
            setTimeout(() => {
                logout();
            }, 2000);

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update password. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="container mx-auto py-8 max-w-lg">
            <Card >
                <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                    <CardDescription className="py-1">
                        Change your password to keep your account secure.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="old_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={showPasswords.old ? "text" : "password"}
                                                    placeholder="Enter your current password"
                                                    disabled={isLoading}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => togglePasswordVisibility('old')}
                                                    disabled={isLoading}
                                                >
                                                    {showPasswords.old ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="new_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={showPasswords.new ? "text" : "password"}
                                                    placeholder="Enter your new password"
                                                    disabled={isLoading}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    disabled={isLoading}
                                                >
                                                    {showPasswords.new ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="new_password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={showPasswords.confirm ? "text" : "password"}
                                                    placeholder="Confirm your new password"
                                                    disabled={isLoading}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => togglePasswordVisibility('confirm')}
                                                    disabled={isLoading}
                                                >
                                                    {showPasswords.confirm ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}