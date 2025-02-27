"use client"

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
    data: List;
    onAddCard: () => void;
}
export const ListHeader = ({
    data,onAddCard
}: ListHeaderProps) => {
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }
    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            disableEditing();
        }
    }
    useEventListener("keydown", onKeyDown);

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Renamed to "${data.title}"`)
            setTitle(data.title);
            disableEditing();
        },
        onError: (error) => {
            console.error({ error })
        }
    })
    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string;

        if (title === data.title) return disableEditing();
        execute({
            title, id, boardId
        });
    }
    const onBlur = () => {
        formRef.current?.requestSubmit();
    }
    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form
                    ref={formRef}
                    action={handleSubmit}
                >
                    <input hidden id="id" name="id" value={data.id} />
                    <input hidden id="boardId" name="boardId" value={data.boardId} />
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        placeholder="Enter alist title..."
                        defaultValue={title}
                        className="px-[7px] py-1 text-sm font-medium border-transparent hover:border-input focus:border-input transition bg-transparent focus:bg-white"
                    />
                    <button hidden type="submit" />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
                    {title}
                </div>
            )}
            <ListOptions 
            onAddCard={onAddCard}
            data={data}
            />
        </div>
    )
}