"use client"

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { title } from "process";

interface CardItemProps {
    data: Card;
    index: number;
}

export const CardItem = ({
    data, index
}: CardItemProps) => {
    const cardModal = useCardModal();

    return (
        <Draggable
            index={index}
            draggableId={data.id}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    role="button"
                    onClick={() => cardModal.onOpen((data.id))}
                    className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white  rounded-md shadow-md"
                >

                    {data.title}
                </div>
            )}

        </Draggable>

    );
};