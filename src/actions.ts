'use server'
import ImageKit, { toFile } from "@imagekit/nodejs";


//  import { getUploadAuthParams } from "@imagekit/next/server"
// const { token, expire, signature } = getUploadAuthParams({
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
//     // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
//     // token: "random-token", // Optional, a unique token for request
// })




export const sharePost = async (formData: FormData) => {
    const imagekit = new ImageKit();
  const file = formData.get("media") as File | null;
  // const desc = formData.get("desc") as string | null;

  if (!file) {
    throw new Error("No file provided");
  }

  // Browser File → Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Buffer → ImageKit file
  const ikFile = await toFile(buffer, file.name);

  try {
    await imagekit.files.upload({
      file: ikFile,
      fileName: file.name,
      folder: "/twitter/posts/",
      transformation: {
        pre: "w-600",
      },
    });

    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
    throw new Error("Unknown error occurred during file upload");
  }
};

