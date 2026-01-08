import { ImageBlockProps } from "@/types";
import Image from "next/image";
import { memo, useCallback } from "react";

const IMAGE_FIT_CLASS = {
  original: "object-contain",
  square: "object-cover",
  wide: "object-cover",
} as const;

function ImageBlock({ media, onRemove, onEdit }: ImageBlockProps) {
  const handleEdit = useCallback(() => {
    onEdit(media);
  }, [media, onEdit]);

  const handleRemove = useCallback(() => {
    onRemove(media.id);
  }, [media.id, onRemove]);

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden bg-stone-950/70">
      <Image
        fill
        src={media.url}
        alt={media.file.name}
        className={IMAGE_FIT_CLASS[media.settings.type]}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
      />

      <button
        type="button"
        onClick={handleEdit}
        className="absolute top-2 left-2 rounded-full bg-black/60 px-4 py-2 text-sm font-bold text-white
                   hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={handleRemove}
        aria-label="Remove image"
        className="absolute top-2 right-2 rounded-full bg-black/60 px-3 py-2 text-sm font-bold text-white
                   hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        ✕
      </button>
    </div>
  );
}

export default memo(ImageBlock);
