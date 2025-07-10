"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Server action to generate logos using OpenAI's GPT Image model.
 * @param brandName - The brand name to generate logos for.
 * @returns A promise that resolves to an object with a list of image data URLs.
 * Location: /actions/logo-generator/logo-generator-actions.ts
 */
export async function generateLogoAction(brandName: string): Promise<{ images: string[] }> {
  if (!brandName) {
    throw new Error("Brand name is required.");
  }

  const imagePromises = Array.from({ length: 4 }, () =>
    openai.responses.create({
      model: "gpt-4o-mini", // Use a model that supports the image_generation tool
      input: `A clean, modern, and minimalist logo for a company named "${brandName}". The logo should be simple, memorable, and suitable for a tech brand.`,
      tools: [{ type: "image_generation" }],
    })
  );

  try {
    const imageResults = await Promise.all(imagePromises);

    const images = imageResults
      .map((response) => {
        const imageOutput = response.output.find(
          (output) => output.type === "image_generation_call"
        );
        
        if (imageOutput && "result" in imageOutput && typeof imageOutput.result === "string") {
          return `data:image/png;base64,${imageOutput.result}`;
        }
        return null;
      })
      .filter((url): url is string => !!url);

    if (images.length < 4) {
      console.error("OpenAI API did not return 4 images.", JSON.stringify(imageResults, null, 2));
      throw new Error("Failed to generate all logo variations.");
    }

    return { images };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("An error occurred while generating logos.");
  }
} 