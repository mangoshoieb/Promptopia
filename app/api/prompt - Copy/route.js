import Prompt from "@models/prompt";
import { mongoToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await mongoToDB();
    const Prompts = await Prompt.find({}).populate("creator")

    return new Response(JSON.stringify(Prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};
