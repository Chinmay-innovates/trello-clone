"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

import { toast } from "sonner";
import { useProModal } from "@/hooks/use-pro-modal";
import { stripeCheckOut } from '@/actions/stripe-checkout';

interface SubscriptionButtonProps {
    isPro: boolean
}
export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
    const proModal = useProModal();
    const { execute, isLoading } = useAction(stripeCheckOut, {
        onSuccess: (data) => {
            window.location.href = data as string;
        },
        onError: (error) => {
            toast.error(error)
        }
    });
    const onClickButton = () => {
        if (isPro) {
            execute({});
        } else {
            proModal.onOpen()
        }
    }
    return (
        <Button variant="primary" disabled={isLoading} onClick={onClickButton}>
            {isPro ? "Manage Subscription" : "Upgrade to Pro"}
        </Button>
    );
};