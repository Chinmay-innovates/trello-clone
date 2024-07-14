import { z } from "zod";
import { List } from "@prisma/client";

import { Actionstate } from "@/lib/create-safe-action";

import { UpdateListOrder } from "./schema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = Actionstate<InputType, List[]>;
