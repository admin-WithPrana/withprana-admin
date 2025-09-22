'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'

function Settings() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {
        console.log('Settings Submitted:', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 font-rubik-400">
            <div className="bg-white w-full rounded-[20px] p-6 shadow">
                <h3 className="text-[16px]  font-bold text-[#000000] mb-4">
                    General Settings
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div>
                        {/* App Tagline */}
                        <div className="mb-4">
                            <Label htmlFor="tagline" className="text-[14px] font-light text-[#484848] text-base">
                                App Tagline
                            </Label>
                            <Input
                                id="tagline"
                                placeholder="Enter the app tagline"
                                {...register('tagline', {
                                    minLength: {
                                        value: 3,
                                        message: 'Tagline must be at least 3 characters',
                                    },
                                })}
                            />
                            {errors?.tagline ?
                                <p className="text-red-500 text-sm mt-1">{errors?.tagline?.message as string}</p>
                                :
                                <p className='text-sm mt-1 text-[#777777]'>Shown on Subscription page and marketing banners</p>
                            }
                        </div>

                        {/* Support Email */}
                        <div className="mb-4">
                            <Label htmlFor="supportEmail" className="text-[14px] font-light text-[#484848] text-base">
                                Support Email
                            </Label>
                            <Input
                                id="supportEmail"
                                placeholder="Enter support email"
                                {...register('supportEmail', {
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Invalid email format',
                                    },
                                })}
                            />
                            {errors.supportEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.supportEmail.message as string}</p>
                            )}
                        </div>

                        {/* Admin Email */}
                        <div className="mb-4">
                            <Label htmlFor="adminEmail" className="text-[14px] font-light text-[#484848] text-base">
                                Admin Email
                            </Label>
                            <Input
                                id="adminEmail"
                                placeholder="Enter admin email"
                                {...register('adminEmail', {
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Invalid email format',
                                    },
                                })}
                            />
                            {errors.adminEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.adminEmail.message as string}</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        {/* Version */}
                        <div className="mb-4">
                            <Label htmlFor="version" className="text-[14px] font-light text-[#484848] text-base">
                                Current Version
                            </Label>
                            <Input
                                id="version"
                                placeholder="Enter current version"
                                {...register('version')}
                            />
                        </div>

                        {/* Release Note */}
                        <div className="mb-4">
                            <Label htmlFor="releaseNote" className="text-[14px] font-light text-[#484848] text-base">
                                Release Note
                            </Label>
                            <Textarea
                                id="releaseNote"
                                placeholder="Enter release notes"
                                {...register('releaseNote')}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"

                        className={`w-full lg:w-44 text-white px-8 py-2  bg-[#2b7272] hover:bg-[#1f5d57]`}
                    >
                        Save Settings
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Settings
