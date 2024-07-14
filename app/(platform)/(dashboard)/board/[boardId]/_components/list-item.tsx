"use client"

import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";

interface ListItemProps {
    data: ListWithCards;
    index: number;
}

export const ListItem = ({
    data, index
}: ListItemProps) => {
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();

        })
    }
    const disableEditing = () => {
        setIsEditing(false);

    }
    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-sm bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader data={data} onAddCard={enableEditing} />
            </div>
            <CardForm
                listId={data.id}
                ref={textareaRef}
                isEditing={isEditing}
                enableEditing={enableEditing}
                disableEditing={disableEditing}
            />
        </li>

    );
};