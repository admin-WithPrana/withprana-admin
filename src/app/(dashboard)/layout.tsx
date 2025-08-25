import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Navigator from '@/components/navigator';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <div className='bg-[#F5F5F5] min-h-screen flex-1'>
            <SidebarProvider>
                <AppSidebar />
                <main className='flex-1 overflow-x-hidden'>
                    <div className='flex gap-2 pt-3 items-center'>
                        <SidebarTrigger />
                        <Navigator />
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </div >
    );
}
