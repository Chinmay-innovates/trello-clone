"use client"

import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AlignLeft } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface DescriptionProps {
    data: CardWithList
}

export const CardDescription = ({ data }: DescriptionProps) => {
    const queryClient = useQueryClient();
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef = useRef<ElementRef<"textarea">>(null);
    const formRef = useRef<ElementRef<"form">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef.current?.focus();
        })
    }
    const disableEditing = (): void => {
        setIsEditing(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            disableEditing();
        }
    }
    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disableEditing);
    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            })
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            })
            toast.success(`card "${data.title}" updated`);
            disableEditing()
        },
        onError: (error) => toast.error(error),
    })
    const onSubmit = (formData: FormData) => {
        const description = formData.get('description') as string;
        const boardId = params.boardId as string;
        execute({description ,boardId, id: data.id});
    }
    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {
                    isEditing ? (
                        <form action={onSubmit} ref={formRef} className="space-y-2" >
                            <FormTextarea
                                id="description"
                                className="w-full mt-2"
                                placeholder="Add more detailed description..."
                                defaultValue={data.description || undefined}
                                errors={fieldErrors}
                                ref={textAreaRef}
                            />
                            <div className="flex items-center gap-x-2">
                                <FormSubmit>Save</FormSubmit>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={disableEditing}>Cancel</Button>
                            </div>
                        </form>
                    ) : (
                        <div
                            onClick={enableEditing}
                            role={"button"}
                            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                        >
                            {data.description || "Add more detailed description"}
                        </div>
                    )
                }

            </div>
        </div>
    )
}

CardDescription.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="bg-neutral-200 w-24 h-6 mb-2" />
                <Skeleton className="bg-neutral-200 w-full h-[78px]" />
            </div>
        </div>
    )
}