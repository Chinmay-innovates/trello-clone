"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { createSaferAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id } = data;

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (error) {
    return { error: "Failed to delete." };
  }

  revalidatePath(`/organisation/${orgId}`);
  redirect(`/organisation/${orgId}`);
};
export const deleteBoard = createSaferAction(DeleteBoard, handler);
