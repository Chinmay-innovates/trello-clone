import { Plus } from "lucide-react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form-popover";

export const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center px-4">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex ">
                    <Logo />
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button variant="primary" size="sm" className="rounded-md hidden md:block h-auto py-1.5 px-2">
                        Create
                    </Button>
                </FormPopover>

                <FormPopover sideOffset={18} >
                    <Button variant="primary" size="sm" className="rounded-sm block md:hidden">
                        <Plus className="size-4" />
                    </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/organisation/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectPersonalUrl="/organisation/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }
                    }}
                />
                <UserButton afterSignOutUrl="/" appearance={{
                    elements: {
                        avatarBox: {
                            height: 30,
                            width: 30
                        }
                    }
                }}
                />
            </div>
        </nav>
    );
};