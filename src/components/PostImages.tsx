import { MediaFile, PostImagesProps } from "@/types";
import ImageBlock from "./ImageBlock";

export default function PostImages({ media, onRemove, onEdit  }: PostImagesProps) {
  const count = media.length;

  if (count === 0) return null;

  const renderImage = (m:MediaFile) => (
    <ImageBlock
      key={m.id}
      media={m}
      onRemove={onRemove}
      onEdit={onEdit}
      
    />
  );

  return (
    <div className="relative w-full  h-[300px] md:h-[380px]  rounded-lg overflow-hidden border-[1px]  border-gray-900">
      {/* 1 image */}
      {count === 1 && renderImage(media[0])}

      {/* 2 images */}
      {count === 2 && (
        <div className="grid grid-cols-2 h-full gap-1">
          {media.map(renderImage)}
        </div>
      )}

      {/* 3 images */}
      {count === 3 && (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
          <div className="row-span-2 relative">
            {renderImage(media[0])}
          </div>
          {media.slice(1).map(renderImage)}
        </div>
      )}

      {/* 4+ images */}
      {count >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1 ">
          {media.slice(0, 4).map(renderImage)}
        </div>
      )}
    </div>
  );
}
