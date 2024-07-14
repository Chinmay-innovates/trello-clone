"use client"

import { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>
    (({
        id,
        label,
        placeholder,
        required,
        disabled,
        errors,
        className,
        onBlur,
        onClick,
        onKeyDown,
        defaultValue,
    }, ref) => {
        const { pending } = useFormStatus();

        return (
            <div className="w-full space-y-2">
                <div className="w-full space-y-1">
                    {label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null}
                    <Textarea
                        id={id}
                        ref={ref}
                        name={id}
                        onBlur={onBlur}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        required={required}
                        disabled={pending || disabled}
                        defaultValue={defaultValue}
                        aria-describedby={`${id}-error`}
                        className={cn(
                            "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 outline-none shadow-sm", className
                        )}
                    />
                </div>
                <FormErrors
                    id={id}
                    errors={errors}
                />
            </div>
        );
    });

FormTextarea.displayName = "FormTextarea";