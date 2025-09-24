import { ChartColumnBig, SquareUserRound, Settings, Headphones, CalendarCheck } from "lucide-react";

export const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: ChartColumnBig,
    },
    {
        label: "Onboarding control",
        href: "/dashboard/onboarding_control",
        icon: SquareUserRound,
    },
    {
        label: "User Management",
        href: "/dashboard/users",
        icon: SquareUserRound,
    },
    {
        label: "Manage Meditation",
        href: "/dashboard/meditation",
        icon: Headphones,
    },
    {
        label: "Thought of the Day",
        href: "/dashboard/thoughts",
        icon: CalendarCheck,
    },
    {
        label: "Policy & Terms",
        href: "/dashboard/policy_and_terms",
        icon: CalendarCheck,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];
