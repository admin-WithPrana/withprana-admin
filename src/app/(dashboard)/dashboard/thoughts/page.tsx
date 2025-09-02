"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { thoughtsApi } from "@/lib/api"
import { fetcher } from "@/lib/fetcher"
import { mediationColumns } from "@/lib/coulmns/meditation.columns"
import { Button } from "@/components/ui/button"
import { thoughtColumns } from "@/lib/coulmns/thoughtOfTheDay"


export default function ThoughtOfTheDayTable() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const extendedColumns = React.useMemo(() => [
        ...thoughtColumns,
        {
            accessorKey: "action",
            header: ({ column }) => (
                <div className="text-[#2B7272]">Action</div>
            ),
            cell: ({ row }) => <div className="capitalize cursor-pointer "><Badge variant={"outline"} className="text-rubik-400 rounded-2xl "><span className="text-[14px] font-light"><Link href={`/dashboard/meditation/${row.original.id}`} >View</Link></span></Badge></div>,
        },
    ], [thoughtColumns, data]);

    const table = useReactTable({
        data,
        columns: extendedColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res: any = await fetcher(thoughtsApi.getAll, {
                    method: 'GET',
                    params: {
                        order: 'desc'
                        // order: sortValue.order,
                        // sort: sortValue.field,
                        // subscriptionType: subscriptionType,
                        // signupMethod,
                        // page,
                    }
                });

                console.log(res)
                if (res?.success) {
                    setData(res.thoughts)
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false)
            }
        })();
    }, [])

    return (
        <div className="rounded-[20px]  p-6">
            <div className="flex justify-between items-center">
                <div className="py-4 font-rubik-400 flex md:flex-row flex-col gap-3">
                    <Select
                    // value={signupMethod} onValueChange={handleChange}
                    >
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
                            // onClick={handleClear}
                            >
                                Clear Selection
                            </div>
                        </SelectContent>
                    </Select>

                    <Select
                    // value={subscriptionType} onValueChange={handleChangeSubscription}
                    >
                        <SelectTrigger className="w-44 bg-white">
                            <SelectValue
                                placeholder="Signup Method"
                                className="data-[placeholder]:text-black"
                            />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="free" className="font-rubik-400">Free</SelectItem>
                            <SelectItem value="premium" className="font-rubik-400">Premium</SelectItem>

                            <div className="border-t my-1" />
                            <div
                                className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer rounded-md font-rubik-400"
                            // onClick={handleClearSubscription}
                            >
                                Clear Selection
                            </div>
                        </SelectContent>
                    </Select>

                    <Select
                    // value={sortValue?.field ? `${sortValue.field}-${sortValue.order}` : ""} onValueChange={handleSort}
                    >
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

                            {/* <div className="px-2 py-1">
                            <p className="text-sm text-gray-500 px-2 font-rubik-400">Last Login</p>
                            <SelectItem value="lastLogin-asc" className="font-rubik-400 pl-6">
                                Ascending
                            </SelectItem>
                            <SelectItem value="lastLogin-desc" className="font-rubik-400 pl-6">
                                Descending
                            </SelectItem>
                        </div> */}

                            <div className="border-t border-gray-200 my-1" />

                            <div
                                className="cursor-pointer px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded font-rubik-400 select-none"
                            // onClick={handleSortClear}
                            >
                                Clear Selection
                            </div>
                        </SelectContent>
                    </Select>

                </div >
                <Button className="font-rubik-400 bg-[#2B7272] py-3 text-white hover:bg-[#2B7272]"><Link href="/dashboard/thoughts/add" className="">Add Thoughts</Link></Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-[#DDF3E5] font-rubik-600 text-[#2B7272]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4 font-rubik-400 bg-white ">
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
                                <TableCell colSpan={mediationColumns.length} className="h-24 text-center font-rubik-400">
                                    {loading ? "Loading ..." : "No data available"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    )
}
