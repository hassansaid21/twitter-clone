import { ImageBlockProps } from "@/types";
import Image from "next/image";

export default function ImageBlock({ media, onRemove }: ImageBlockProps) {
  return (
    <div className="relative w-full h-full">
      <Image
        fill
        src={media.url}
        alt={media.file.name}
        className="object-cover"
      />

      <div
        onClick={() => onRemove(media.id)}
        className="absolute top-2 left-2 bg-black/50 text-white px-4 py-2 rounded-full cursor-pointer font-bold text-sm hover:bg-blue-500/90"
      >
        Edit
      </div>
      <div
        onClick={() => onRemove(media.id)}
        className="absolute top-2 right-2 bg-black/50 text-white px-4 py-2 rounded-full cursor-pointer font-bold text-sm hover:bg-red-500/90"
      >
        X
      </div>
    </div>
  );
}
