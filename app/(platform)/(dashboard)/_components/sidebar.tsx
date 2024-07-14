'use client'

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { NavItem, Organization } from "./nav-item";
import { cn } from "@/lib/utils";


interface SidebarProps {
    storageKey?: string;
}
export const Sidebar = ({
    storageKey = "t-sidebar-state"
}: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    );
    const {
        organization: activeOrganisation,
        isLoaded: isLoadedOrg
    } = useOrganization();

    const {
        userMemberships,
        isLoaded: isLoadedOrgList,
    } = useOrganizationList({
        userMemberships: {
            infinite: true,
        }
    });

    const defaultAccordianValue: string[] = Object.keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key)
            }
            return acc
        }, []);

    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id]
        }))
    }
    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                </div>
            </>
        )
    }
    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className={cn("pl-4 text-xl")}>
                    Workspaces
                </span>
                <Button
                    asChild
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto"
                >
                    <Link href="/select-org" >
                        <Plus
                            className="size-4" />
                    </Link>
                </Button>
            </div>
            <Accordion
                type="multiple"
                defaultValue={defaultAccordianValue}
                className="space-y-2"
            >
                {userMemberships.data.map(({ organization }) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganisation?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as unknown as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    )
}