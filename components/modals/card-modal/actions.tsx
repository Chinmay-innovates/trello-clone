"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";

interface CardActionsProps {
    data: CardWithList
}
export const CardActions = ({ data }: CardActionsProps) => {
    const params = useParams();
    const boardId = params.boardId as string;
    const cardModal = useCardModal()
    const { execute: executeCopyCard, isLoading: isLoadingCopyCard } = useAction(copyCard, {
        onSuccess: (): void => {
            toast.success(`Card copied`);
            cardModal.onClose();
        },
        onError: (error) => toast.error(error),
    });


    const { execute: executeDeleteCard, isLoading: isLoadingDeleteCard } = useAction(deleteCard, {
        onSuccess: () => {
            toast.success(`Card deleted`);
            cardModal.onClose();
        },
        onError: (error) => toast.error(error),
    });
    const onCopy = () => {
        executeCopyCard({ id: data.id, boardId })
    }
    const onDelete = () => {
        executeDeleteCard({ id: data.id, boardId })
    }
    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">Actions</p>
            <Button
                variant="gray"
                className="w-full justify-start"
                size="inline"
                onClick={onCopy}
                disabled={isLoadingCopyCard}
            >
                <Copy className="w-4 h-4 mr-2" />Copy
            </Button>
            <Button
                variant="gray"
                size="sm"
                className="w-full justify-start"
                disabled={isLoadingDeleteCard}
                onClick={onDelete}
            >
                <Trash className="w-4 h-4 mr-2" />Delete
            </Button>
        </div>
    )
}

CardActions.Skeleton = function ActionsSkeleton() {
    return (
        <div className={"space-y-2 mt-2"}>
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    )
}