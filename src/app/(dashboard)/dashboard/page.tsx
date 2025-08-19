import React from 'react'
import {
    Bell,
    BarChart3,
    Users,
    Settings,
    LogOut,
    Plus,
    MessageSquare,
    Crown,
    Eye,
    UserCheck,
    ChevronDown,
    ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

function Dashboard() {
    return (
        <div className="flex font-rubik-400 w-full">
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="mb-6 bg-white p-5 rounded-3xl px-5">
                    <h1 className="text-2xl font-semibold text-[#2b7272] mb-1">Welcome back, Admin!</h1>
                    <p className="text-[#777777]">Here's what's happening at a glance.</p>
                </div>

                {/* Quick Stats */}
                <div className="mb-6 bg-white p-5 rounded-3xl">
                    <div className="flex items-center gap-2 mb-4 ">
                        <BarChart3 size={20} className="text-[#013913]" />
                        <h2 className="text-lg font-medium text-[#013913]">Quick Stats</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-2 xl:gap-4 rounded-3xl">
                        <Card className="bg-[#8e4692] text-white border-0 rounded-4xl h-[180px]">
                            <CardContent className="p-6">
                                <div className=" items-center gap-2 mb-2 flex justify-center">
                                    <Users size={20} />
                                    <span className="text-sm opacity-90 ">Total Users</span>
                                </div>
                                <div className="text-4xl font-rubik-500 mb-1 text-center">12,345</div>
                                <div className="text-sm opacity-75 text-center">200+ today</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#545c90] text-white border-0 rounded-4xl h-[180px]">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-2 justify-center">
                                    <Crown size={20} />
                                    <span className="text-sm opacity-90">Premium Users</span>
                                </div>
                                <div className="text-3xl font-bold mb-1 text-center">1,289</div>
                                <div className="text-sm opacity-75 text-center">80+ today</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#578957] text-white border-0  rounded-4xl h-[180px]">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-2 justify-center">
                                    <BarChart3 size={20} />
                                    <span className="text-sm opacity-90">Contents Uploaded</span>
                                </div>
                                <div className="text-3xl font-bold text-center">104</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#a2605b] text-white border-0  rounded-4xl h-[180px]">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-2 justify-center">
                                    <span className="text-lg">⭐</span>
                                    <span className="text-sm opacity-90">Most Played</span>
                                </div>
                                <div className="text-lg font-semibold mb-2 text-center">Deep Calm at Night</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Daily User Activity Chart */}
                <div className='flex gap-2'>
                    <div className='bg-white p-2 px-4 rounded-3xl flex-1'>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">📊</span>
                                <h2 className="text-lg font-medium text-[#013913]">Daily User Activity</h2>
                                <span className="text-sm text-[#777777]">( Last 7 Days Activity )</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#f4b03c] rounded"></div>
                                    <span className="text-sm text-[#777777]">Free Users</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#e59ee8] rounded"></div>
                                    <span className="text-sm text-[#777777]">Premium Users</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg p-6">
                            <div className="flex items-end justify-between h-64 gap-8">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                                    <div key={day} className="flex flex-col items-center gap-2 flex-1">
                                        <div className="flex flex-col items-center gap-1 h-48">
                                            {index < 5 ? (
                                                <>
                                                    <div
                                                        className="bg-[#f4b03c] rounded-t text-white text-xs flex items-center justify-center w-12"
                                                        style={{ height: `${120 + index * 20}px` }}
                                                    >
                                                        {2000 + index * 200}
                                                    </div>
                                                    <div
                                                        className="bg-[#e59ee8] rounded-b text-white text-xs flex items-center justify-center w-12"
                                                        style={{ height: `${80 + index * 15}px` }}
                                                    >
                                                        {800 + index * 100}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="border-2 border-dashed border-[#e4e4e4] rounded w-12 h-32"></div>
                                            )}
                                        </div>
                                        <span className="text-sm text-[#777777]">{day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='bg-white w-80 p-2 rounded-3xl text-[#013913]'>
                            <div className="flex items-center gap-2 mb-4 ">
                                <span className="text-lg">⚡</span>
                                <h3 className="font-medium text-[#013913]">Quick Actions</h3>
                            </div>

                            <div className="space-y-4">
                                <Link href="/dashboard/meditation/add" passHref>
                                    <Button asChild variant="ghost" className="w-full justify-start gap-2 text-[#013913] hover:bg-[#f5f5f5]">
                                        <span>
                                            <Plus size={16} />
                                            Add New Audio
                                        </span>
                                    </Button>
                                </Link>

                                <Link href="/feedback" passHref>
                                    <Button asChild variant="ghost" className="w-full justify-start gap-2 text-[#013913] hover:bg-[#f5f5f5]">
                                        <span>
                                            <MessageSquare size={16} />
                                            View Feedback
                                        </span>
                                    </Button>
                                </Link>

                                <Link href="/dashboard/plans" passHref>
                                    <Button asChild variant="ghost" className="w-full justify-start gap-2 text-[#013913] hover:bg-[#f5f5f5]">
                                        <span>
                                            <Crown size={16} />
                                            Manage Plans
                                        </span>
                                    </Button>
                                </Link>

                                <Link href="/dashboard/meditation/" passHref>
                                    <Button asChild variant="ghost" className="w-full justify-start gap-2 text-[#013913] hover:bg-[#f5f5f5]">
                                        <span>
                                            <Eye size={16} />
                                            View All Meditations
                                        </span>
                                    </Button>
                                </Link>

                                <Link href="/dashboard/users" passHref>
                                    <Button asChild variant="ghost" className="w-full justify-start gap-2 text-[#013913] hover:bg-[#f5f5f5]">
                                        <span>
                                            <Users size={16} />
                                            Manage Users
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >)
}

export default Dashboard