'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';

type LoginFormInputs = {
    email: string;
    password: string;
};

function Login() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true)
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (res?.ok) {
            router.push("/dashboard");
        } else {
            toast.error('Invalid credentials.', {
                description: 'Please check your email and password.',
                icon: <AlertTriangle className="text-red-500 mr-4" />,
                className: 'bg-red-50 text-red-900 border font-rubik-400 px-3  border-red-200',
                duration: 4000,
                closeButton: true
            })
        }

        setLoading(false)
    };

    return (
        <div className="w-10/12 md:w-[480px] mx-auto mt-4 lg:mt-10 p-6 border rounded-lg shadow-sm bg-white font-rubik-400">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="email" className='mb-1 text-[14px]'>Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="admin@gmail.com"
                        className='w-full'
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="relative">
                    <Label htmlFor="password" className='mb-1 text-[14px]'>Password</Label>
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...register('password', { required: 'Password is required' })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[35px] right-3 text-gray-500 hover:text-gray-700"
                        tabIndex={-1} // skip tabbing on icon button for accessibility
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full text-white bg-[#1F5D57]"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </Button>
            </form>
        </div>
    )
}

export default Login;
