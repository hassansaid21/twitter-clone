"use server";
import ImageKit, { toFile } from "@imagekit/nodejs";
import { MediaFile } from "./types";

//  import { getUploadAuthParams } from "@imagekit/next/server"
// const { token, expire, signature } = getUploadAuthParams({
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
//     // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
//     // token: "random-token", // Optional, a unique token for request
// })

export const sharePost = async (formData: FormData, media: MediaFile[]) => {
  const client = new ImageKit();
  // const desc = formData.get("desc") as string | null;
  const files = formData.getAll("media") as File[];

  if (files.length > 4) {
    throw new Error("Maximum 4 images allowed");
  }

  for (const file of files) {
    // validate size/type
    if (!file.type.startsWith("image/")) {
      throw new Error("Invalid file type");
    }
  }

  if (files.length > 0) {
    try {
      await Promise.all(
        files.map(async (file, index) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const ikFile = await toFile(buffer, file.name);
          const transformation = `w-600 ${
            media[index].settings.type === "square"
              ? "ar-1-1"
              : media[index].settings.type === "wide"
              ? "ar-16-9"
              : ""
          }`;
          return client.files.upload({
            file: ikFile,
            fileName: file.name,
            folder: "/twitter/posts/",
            transformation:{
              pre:transformation,
            },
            customMetadata:{
              sensitive : media[index].settings.sensitive
            }
          });
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Image upload failed: ${error.message}`);
      }
      throw new Error("Unknown error occurred during file upload");
    }
  }
};
