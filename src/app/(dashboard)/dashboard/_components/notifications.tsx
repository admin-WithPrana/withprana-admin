import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'

function Notification() {
    return (
        <div className="w-80 md:hidden inline-flex m-3 bg-white border-l border-[#e4e4e4] p-6 rounded-3xl">
            {/* Notifications */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Bell size={20} className="text-[#013913]" />
                    <h3 className="font-medium text-[#013913]">Notifications</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-[#013913]">📅 Today</span>
                        </div>
                        <div className="space-y-3">
                            <div className="text-sm">
                                <div className="text-[#777777] mb-1">10:45 AM</div>
                                <div className="text-[#013913]">New meditation uploaded by team on June 15.</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-[#777777] mb-1">8:30 PM</div>
                                <div className="text-[#013913]">User feedback pending reply (3 items).</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-[#013913]">📅 Yesterday</span>
                        </div>
                        <div className="space-y-3">
                            <div className="text-sm">
                                <div className="text-[#777777] mb-1">4:00 PM</div>
                                <div className="text-[#013913]">💡 New content added: 'Emotional Reset - 7 mins'</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-[#777777] mb-1">1:00 PM</div>
                                <div className="text-[#013913]">
                                    ⏰ Your 7-day trial ends tomorrow. Don't lose your calm—upgrade now.
                                </div>
                                <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent border border-[#1F5D57] text-[#1F5D57] rounded-full">
                                    View Plans
                                </Button>
                            </div>
                        </div>
                    </div >

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-[#013913]">📅 Older</span>
                        </div>
                        <div className="space-y-3">
                            <div className="text-sm">
                                <div className="text-[#777777] mb-1">June 10, 11:02 AM</div>
                                <div className="text-[#013913]">🔥 Welcome to With Prana! Your calm journey begins here.</div>
                            </div>
                            <div className="text-sm">
                                <div className="text-[#777777] mb-1">June 9, 8:00 AM</div>
                                <div className="text-[#013913]">⚠️ "Your mindful pause is scheduled for 8 PM daily."</div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default Notification