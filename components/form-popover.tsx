"use client"

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FormInput } from "./form/form-input";
import { FormSubmit } from "./form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form/form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children, align,
    side = "bottom", sideOffset = 0
}: FormPopoverProps) => {
    const proModal = useProModal();
    const closeRef = useRef<ElementRef<"button">>(null);
    const router = useRouter();

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success("Board created!")
            closeRef.current?.click();
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toast.error(error);
            proModal.onOpen();
        }
    })
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        execute({ title, image })
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className="w-80 pt-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose
                    ref={closeRef}
                    asChild>
                    <Button className="size-auto absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="size-4" />
                    </Button>
                </PopoverClose>
                <form
                    action={onSubmit}
                    className="space-y-4"
                >
                    <FormPicker
                        id="image"
                        errors={fieldErrors}
                    />
                    <FormInput
                        id="title"
                        label="Board title"
                        type="text"
                        errors={fieldErrors}
                    />
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};