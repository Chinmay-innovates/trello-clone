import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
}
    from "@/components/ui/tooltip";

interface HintProps {
    children: React.ReactNode;
    description: string;
    side?: "top" | "bottom" | "left" | "right";
    sideOffset?: number;
}
export const Hint = ({
    description,
    children,
    side ,
    sideOffset=0,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    sideOffset={sideOffset}
                    side={side}
                    className="text-xs max-w-[220px] break-words"
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}