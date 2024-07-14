"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, forwardRef, useRef } from "react";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    disableEditing,
    enableEditing,
    isEditing,
    listId
}, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const {execute,fieldErrors} = useAction(createCard);


    if (isEditing) {
        return (
            <form
                className="m-1 py-0.5 px-1 space-y-4"
                action=""
            >
                <FormTextarea
                    id="title"
                    ref={ref}
                    placeholder="Enter card title for this card..."
                />
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}
                />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add card
                    </FormSubmit>
                    <Button 
                    onClick={disableEditing}
                    size="sm"
                    variant="outline"
                    >
                        <X className="size-5" />
                        Cancel
                    </Button>
                </div>
            </form>
        )
    }
    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm bg-white hover:bg-white/80"
                size="sm"
                variant="ghost"
            >
                <Plus className="size-4 mr-2" />
                Add a card
            </Button>
        </div>
    );
});
CardForm.displayName = "CardForm"