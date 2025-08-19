'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function Navigator() {
    const pathname = usePathname()

    const pathSegments = pathname.split("/").filter((segment) => segment)

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/")
        const isLast = index === pathSegments.length - 1

        return (
            <React.Fragment key={href}>
                <BreadcrumbItem>
                    {isLast ? (
                        <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink asChild>
                            <Link href={href}>{capitalize(segment)}</Link>
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
        )
    })

    return (
        <Breadcrumb className="font-rubik-400">
            <BreadcrumbList>

                {pathSegments.length > 0 && <BreadcrumbSeparator />}
                {breadcrumbs}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default Navigator
