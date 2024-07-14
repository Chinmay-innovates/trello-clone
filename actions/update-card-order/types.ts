import { z } from "zod";
import { Card } from "@prisma/client";

import { Actionstate } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = Actionstate<InputType, Card[]>;
