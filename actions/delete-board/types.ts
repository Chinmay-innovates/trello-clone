import { z } from "zod";
import { Board } from "@prisma/client";

import { Actionstate } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = Actionstate<InputType, Board>;
