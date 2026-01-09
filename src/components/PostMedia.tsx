"use client";
import { useState } from "react";
import { FileDetails } from "@/types";
import ImageKitMedia from "./ImageKitMedia";

export default function PostMedia({
  fileDetails,
}: {
  fileDetails: FileDetails;
}) {
  const [isSensitive, setIsSensitive] = useState(
    fileDetails.customMetadata?.sensitive
  );

  return (
    <div className="rounded-md border border-borderGray overflow-hidden font-bold text-lg  relative">
      <ImageKitMedia
        type={fileDetails.mime.startsWith('video')?'video':'image'}
        src={fileDetails.url}
        alt="post image"
        width={fileDetails.width}
        height={fileDetails.height}
        className={`${isSensitive ? "blur-xl" : ""}`}
      />

      {isSensitive && (
        <button
          onClick={() => setIsSensitive(false)}
          className="bg-white px-4 py-2 rounded-full text-center text-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
        >
          Show Content
        </button>
      )}
    </div>
  );
}
