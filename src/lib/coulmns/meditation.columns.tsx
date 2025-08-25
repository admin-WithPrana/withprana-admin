import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Volume2 } from "lucide-react";

export const mediationColumns: ColumnDef<any>[] = [
    {
        accessorKey: "title",
        header: () => < div className="text-[#2B7272]" >Title</div>,
        cell: ({ row }) => <div className="font-medium">
            <p className="capitalize">{row.original.title}</p>
            <Badge
                variant="outline"
                className={`border ${!row.original.isPremium ? "border-[#2B7272] text-[#2B7272]" : "border-yellow-600 text-yellow-600"
                    } font-rubik-400 rounded-2xl mt-1`}
            >
                {!row.original.isPremium ? "Free" : "Premium"}
            </Badge>
        </div>
    },
    {
        accessorKey: "category",
        header: () => < div className="text-[#2B7272]" >Category</div>,
        cell: ({ row }) => row.original.category?.name ?? "-",
    },
    {
        accessorKey: "subcategory",
        header: () => <div className="text-[#2B7272]">Sub Category</div>,
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className={`border font-rubik-400 rounded-2xl mt-1 capitalize`}
            >
                {row.original.subcategory?.name}
            </Badge>
        ),
    },
    {
        accessorKey: "Duration",
        cell: ({ row }) => {
            const totalSeconds = Number(row.original.duration)
            const minutes = String(Math.floor(totalSeconds)).padStart(2, "0")
            const seconds = String(Math.round((totalSeconds % 1) * 60)).padStart(2, "0")
            return `${minutes}:${seconds}`
        },
    },
    {
        accessorKey: "link",
        header: () => <div className="text-[#2B7272]">Type</div>,
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className={`border font-rubik-400 rounded-2xl mt-1 capitalize`}
            >
                <Volume2 className="h-8 w-8" />
                {row.original.type}
            </Badge>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Added Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"))
            return <div>{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        },
    },
]