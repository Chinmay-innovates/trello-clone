import { z } from "zod";
import { Board } from "@prisma/client";

import { Actionstate } from "@/lib/create-safe-action";

import { CreateBoard } from "./schema";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = Actionstate<InputType, Board>;
