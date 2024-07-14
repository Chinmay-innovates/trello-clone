import { z } from "zod";
import { Card } from "@prisma/client";

import { Actionstate } from "@/lib/create-safe-action";

import { CreateCard } from "./schema";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = Actionstate<InputType, Card>;
