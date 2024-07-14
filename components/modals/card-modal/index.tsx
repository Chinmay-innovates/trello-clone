"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-modal"
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { CardDescription } from "./description";
import { CardActions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";

export const CardModal = () => {
    const id = useCardModal((st) => st.id);
    const isOpen = useCardModal((st) => st.isOpen);
    const onClose = useCardModal((st) => st.onClose);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`)
    })
    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`)
    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {!cardData
                    ? <Header.Skeleton />
                    :
                    <Header data={cardData} />
                }
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {!cardData
                                ? <CardDescription.Skeleton />
                                : <CardDescription data={cardData} />
                            }
                            {!auditLogsData
                                ? <Activity.Skeleton />
                                : <Activity items={auditLogsData} />
                            }
                        </div>
                    </div>
                    {!cardData
                        ? <CardActions.Skeleton />
                        : <CardActions data={cardData} />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}