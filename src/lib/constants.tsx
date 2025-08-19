import { ChartColumnBig, SquareUserRound, Settings, Headphones } from "lucide-react";

export const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: ChartColumnBig,
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
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];
