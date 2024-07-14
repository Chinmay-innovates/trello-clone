"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { createSaferAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, boardId, listId } = data;

  let card;
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!list) {
      return {
        error: "List not found",
      };
    }
    const listCard = await db.list.findFirst({
      where: { boardId },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });
    const newOrder = listCard ? listCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
  } catch (error) {
    return { error: "Failed to create." };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};
export const createCard = createSaferAction(CreateCard, handler);
