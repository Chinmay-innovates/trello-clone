"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = useMobileSidebar((st) => st.onOpen);
    const onClose = useMobileSidebar((st) => st.onClose);
    const isOpen = useMobileSidebar((st) => st.isOpen);

    useEffect(() => {
        setIsMounted(true)
    }, []);
    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) return null;
    return (
        <>
            <Button
                onClick={onOpen}
                className="block md:hidden mr-2"
                variant="ghost"
                size="sm"
            >
                <Menu className="size-4" />
            </Button>
            <Sheet onOpenChange={onClose} open={isOpen}>
                <SheetContent
                    side="left"
                    className="p-2 pt-10"
                >
                    <Sidebar
                        storageKey="t-sidebar-mobile-state"
                    />
                </SheetContent>
            </Sheet>
        </>
    )
}