"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { createSaferAction } from "@/lib/create-safe-action";
import { StripeCheckOut } from "./schema";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }
  const settingsUrl = absoluteUrl(`/organisation/${orgId}`);
  let url = "";
  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });
    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Taskify Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });
      url = stripeSession.url || "";
    }
  } catch (error) {
    console.log("Check out err: ",error)
    return { error: "Failed to create checkout session." };
  }

  revalidatePath(`organisation/${orgId}`);
  return { data: url };
};
export const stripeCheckOut = createSaferAction(StripeCheckOut, handler);
