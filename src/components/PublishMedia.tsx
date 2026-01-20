import { MediaFile } from "@/types";
import PublishMediaBlock from "./PublishMediaBlock";

interface PublishMediaProps {
  media: MediaFile[];
  onRemove: (id: string) => void;
  onEdit: (media: MediaFile) => void;
}

export default function PublishMedia({
  media,
  onRemove,
  onEdit,
}: PublishMediaProps) {
  const count = media.length;
  if (count === 0) return null;

  const renderMedia = (m: MediaFile) => (
    <PublishMediaBlock
      key={m.id}
      media={m}
      onRemove={onRemove}
      onEdit={onEdit}
    />
  );

  return (
    <div className="relative w-full h-[300px] md:h-[250px] rounded-lg overflow-hidden border border-gray-900">
      {count === 1 && renderMedia(media[0])}

      {count === 2 && (
        <div className="grid grid-cols-2 h-full gap-1">
          {media.map(renderMedia)}
        </div>
      )}

      {count === 3 && (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
          <div className="row-span-2 relative">
            {renderMedia(media[0])}
          </div>
          {media.slice(1).map(renderMedia)}
        </div>
      )}

      {count >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
          {media.slice(0, 4).map(renderMedia)}
        </div>
      )}
    </div>
  );
}
