import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { Mail } from "lucide-react"

export type User = {
    id: string
    name: string
    email: string
    signupMethod: "email" | "google" | "github"
    subscriptionType: "free" | "premium"
    createdAt: string
    active: "active" | "inactive" | "banned",
    action: string
}


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <div className="text-[#2B7272]">Name</div>
        ),
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <div className="text-[#2B7272]">Email</div>
        ),
        cell: ({ row }) => <div className="lowercase"> {row.getValue("email")}</div>,
    },
    {
        accessorKey: "signupMethod",
        header: ({ column }) => (
            <div className="text-[#2B7272]">Signup Method</div>
        ),
        cell: ({ row }) => <div className="capitalize">{row.getValue("signupMethod")}</div>,
    },
    {
        accessorKey: "subscriptionType",
        header: ({ column }) => (
            <div className="text-[#2B7272]">Subscription</div>
        ),
        cell: ({ row }) => {
            const value = row.getValue("subscriptionType") as string;
            const isFree = value?.toLowerCase() === "free";

            return (
                <div className="capitalize">
                    <Badge
                        variant="outline"
                        className={`border ${isFree ? "border-[#2B7272] text-[#2B7272]" : "border-yellow-600 text-yellow-600"
                            } font-rubik-400 rounded-2xl`}
                    >
                        {isFree ? "Free" : "Premium"}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <div className="text-[#2B7272]">Created At</div>
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return <div>{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        },
    },
    {
        accessorKey: "active",
        header: ({ column }) => (
            <div className="text-[#2B7272]">Status</div>
        ),
        cell: ({ row }) => {
            const status: string = row.getValue("active")
            const color = status ? "text-green-600" : status === "inactive" ? "text-yellow-600" : "text-red-600"
            return <div className={`capitalize font-semibold ${color}`}>{status ? "Active" : "Inactive"}</div>
        },
    },
]
