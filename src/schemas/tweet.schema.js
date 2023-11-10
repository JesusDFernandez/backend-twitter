import { z } from "zod";

export const createTweetSchema = z.object({
    text: z.string(),

});
