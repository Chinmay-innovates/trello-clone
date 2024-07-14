import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type Actionstate<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};
export const createSaferAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<Actionstate<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<Actionstate<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validationResult.data);
  };
};
