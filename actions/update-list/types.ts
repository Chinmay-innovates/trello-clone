import { z } from "zod";
import { List } from "@prisma/client";

import { Actionstate } from "@/lib/create-safe-action";

import { UpdateList } from "./schema";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = Actionstate<InputType, List>;
