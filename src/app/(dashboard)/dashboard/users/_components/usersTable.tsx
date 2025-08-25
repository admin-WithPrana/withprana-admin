"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetcher } from "@/lib/fetcher"
import { apiUser } from "@/lib/api"
import { columns, User } from "@/lib/coulmns/user.columns"
import UserDetails from "./userDetails"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function DataTableDemo() {
    const [users, setUsers] = React.useState<User[]>([])
    const [loading, setLoading] = React.useState(false)
    const [selectedUser, setSelectedUser] = React.useState<Record<string, any> | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res: any = await fetcher(apiUser.getUser, {
                    method: 'GET',
                });

                if (res && res?.success) {
                    setUsers(res.users)

                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false)
            }
        })();
    }, [])

    const extendedColumns = React.useMemo(() => [
        ...columns,
        {
            accessorKey: "action",
            header: ({ column }) => (
                <div className="text-[#2B7272]">Action</div>
            ),
            cell: ({ row }) => <div className="capitalize cursor-pointer "><Badge variant={"outline"} className="text-rubik-400 rounded-2xl " onClick={() => setSelectedUser(row.original)}><span className="text-[14px] font-light">View</span></Badge></div>,
        },
    ], [columns, users]);



    const table = useReactTable({
        data: users,
        columns: extendedColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    const handleAction = (id: string, status: boolean) => {
        setUsers((prev: any[]) =>
            prev.map((item: any) =>
                item.id === id ? { ...item, active: status } : item
            )
        );

    }


    return (
        <div className="w-full">
            <div className="py-4 font-rubik-400 flex gap-3">
                <Select >
                    <SelectTrigger className="w-44 bg-white">
                        <SelectValue
                            placeholder="Signup Method"
                            className="data-[placeholder]:text-black"
                        />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="email" className="font-rubik-400">Email</SelectItem>
                        <SelectItem value="google" className="font-rubik-400">Google</SelectItem>

                        <div className="border-t my-1" />
                        <div
                            className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer rounded-md font-rubik-400"
                        >
                            Clear Selection
                        </div>
                    </SelectContent>
                </Select>

                <Select >
                    <SelectTrigger className="w-44 bg-white">
                        <SelectValue
                            placeholder="Signup Method"
                            className="data-[placeholder]:text-black"
                        />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="email" className="font-rubik-400">Email</SelectItem>
                        <SelectItem value="google" className="font-rubik-400">Google</SelectItem>

                        <div className="border-t my-1" />
                        <div
                            className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer rounded-md font-rubik-400"
                        >
                            Clear Selection
                        </div>
                    </SelectContent>
                </Select>

                <Select >
                    <SelectTrigger className="w-44 bg-white">
                        <SelectValue placeholder="Sort By" className="data-[placeholder]:text-black" />
                    </SelectTrigger>

                    <SelectContent>
                        <div className="px-2 py-1">
                            <p className="text-sm text-gray-500 px-2 font-rubik-400">Created At</p>
                            <SelectItem value="createdAt-asc" className="font-rubik-400 pl-6">
                                Ascending
                            </SelectItem>
                            <SelectItem value="createdAt-desc" className="font-rubik-400 pl-6">
                                Descending
                            </SelectItem>
                        </div>

                        <div className="px-2 py-1">
                            <p className="text-sm text-gray-500 px-2 font-rubik-400">Last Login</p>
                            <SelectItem value="lastLogin-asc" className="font-rubik-400 pl-6">
                                Ascending
                            </SelectItem>
                            <SelectItem value="lastLogin-desc" className="font-rubik-400 pl-6">
                                Descending
                            </SelectItem>
                        </div>

                        <div className="border-t border-gray-200 my-1" />

                        <div
                            className="cursor-pointer px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded font-rubik-400 select-none"
                        >
                            Clear Selection
                        </div>
                    </SelectContent>
                </Select>

            </div>
            <div className="max-w-full overflow-x-auto rounded-md border scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <Table>
                    <TableHeader className="bg-[#DDF3E5] font-rubik-600 text-[#2B7272]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4 font-rubik-400 bg-white">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center font-rubik-400"
                                >
                                    {
                                        loading ? "Loading..." : "No result"
                                    }
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div> */}
            <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} handleAction={handleAction} />
        </div >
    )
}
