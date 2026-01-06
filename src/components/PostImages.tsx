import {  PostImagesProps } from "@/types";
import ImageBlock from "./ImageBlock";



export default function PostImages({ media, onRemove }: PostImagesProps) {
  const count = media.length;

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {count === 1 && (
        <ImageBlock media={media[0]} onRemove={onRemove} />
      )}

      {count === 2 && (
        <div className="grid grid-cols-2 h-full gap-1">
          {media.map(m => (
            <ImageBlock key={m.id} media={m} onRemove={onRemove} />
          ))}
        </div>
      )}

      {count === 3 && (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
          <div className="row-span-2 relative">
            <ImageBlock media={media[0]} onRemove={onRemove} />
          </div>
          {media.slice(1).map(m => (
            <ImageBlock key={m.id} media={m} onRemove={onRemove} />
          ))}
        </div>
      )}

      {count >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
          {media.slice(0, 4).map(m => (
            <ImageBlock key={m.id} media={m} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  );
}



