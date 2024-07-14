import { z } from "zod";

import { Actionstate } from "@/lib/create-safe-action";

import { StripeCheckOut } from "./schema";

export type InputType = z.infer<typeof StripeCheckOut>;
export type ReturnType = Actionstate<InputType, string>;
