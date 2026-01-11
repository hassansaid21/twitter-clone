"use server";
import ImageKit, { toFile } from "@imagekit/nodejs";
import { MediaFile } from "./types";

export const sharePost = async (formData: FormData, media: MediaFile[]) => {
  const client = new ImageKit();
  // const desc = formData.get("desc") as string | null;
  const files = formData.getAll("media") as File[];

  if (files.length > 4) {
    throw new Error("Maximum 4 images allowed");
  }

  // for (let i=0 ; i<files.length ; i++) {
  //   // validate size/type
  //   console.log(media[i].type)
  //   if (media[i].type!== 'video'||media[i].type!=='image') {
  //     throw new Error("Invalid file type");
  //   }
  // }

  if (files.length > 0) {
    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file, index) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const ikFile = await toFile(buffer, file.name);
          const transformation = `w-600 q-20 bl-20  ${
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
            ...(media[index].type === "image" && {
              transformation: {
                pre: transformation,
              },
            }),
            customMetadata: {
              sensitive: media[index].settings.sensitive,
            },
          });
        })
      );

      return {
        success: true,
        media: uploadedFiles.map((file) => ({
          fileId: file.fileId,
          url: file.url,
          width: file.width,
          height: file.height,
          sensitive: file.customMetadata?.sensitive ?? false,
        })),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Image upload failed: ${error.message}`);
      }
      throw new Error("Unknown error occurred during file upload");
    }
  }
};
