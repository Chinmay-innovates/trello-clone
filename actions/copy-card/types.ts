import { z } from "zod";
import { Card } from "@prisma/client";

import { Actionstate } from "@/lib/create-safe-action";

import { CopyCard } from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = Actionstate<InputType, Card>;
