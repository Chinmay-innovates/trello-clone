"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";


interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" |
    "destructive" |
    "outline" |
    "secondary" |
    "ghost" |
    "link" |
    "primary"
}

export const FormSubmit = ({
    children, className, variant="primary",
    disabled
}: FormSubmitProps) => {
    const { pending } = useFormStatus();
    return (
        <Button
            variant={variant}
            type="submit"
            disabled={pending || disabled}
            size="sm"
            className={className}
        >
            {children}
        </Button>

    );
};