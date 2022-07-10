import { VercelRequest, VercelResponse } from "@vercel/node";
import db from "../database/db";
import { checkForBestsellerUpdates, triggerUpdate } from "./_util/bestsellers";

export default async function handler(
  req: VercelRequest,
  resp: VercelResponse
) {
  console.log("1. Checking for updates");
  // Check if update needed
  let updateNeeded: boolean = false;
  try {
    updateNeeded = await checkForBestsellerUpdates();
  } catch (e) {
    handleError(e, resp);
  }

  console.log("Update needed:", updateNeeded);
  if (updateNeeded) {
    try {
      console.log("Updating...");
      await triggerUpdate();
    } catch (e) {
      return handleError(e, resp);
    }
  }

  // Finally, no matter what response with a list of bestsellers
  responsedWithListofBestsellers(resp);
}

async function responsedWithListofBestsellers(resp: VercelResponse) {
  return resp.status(200).json(await db.bestsellerBook.findMany());
}

function handleError(e: unknown, resp: VercelResponse) {
  console.log(e);
  if (process.env.NODE_ENV === "production") {
    return resp.status(500).send("Something went wrong!");
  }
  return resp.status(500).json(e);
}
