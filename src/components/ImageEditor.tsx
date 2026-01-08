import { MediaFile, Settings } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface ImageEditorProps {
  media: MediaFile;
  onClose: () => void;
  onSave: (settings: Settings) => void;
}

export default function ImageEditor({
  media,
  onClose,
  onSave,
}: ImageEditorProps) {
 
  const [draftSettings, setDraftSettings] = useState<Settings>(
    media.settings
  );

  function handleSave() {
    onSave(draftSettings);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/75 z-10 flex items-center justify-center">
      <div className="bg-black rounded-xl flex flex-col gap-8 p-12">

        {/* Header */}
        <div className="flex justify-between items-center">
            
          <button onClick={onClose} className="px-2 py-1 rounded-full hover:bg-bgHover  ">←</button>
          <h2 className="font-bold text-lg">Media Settings</h2>
          <button
          type="button"
            onClick={handleSave}
            className="bg-white text-black px-4 py-2 rounded-full font-bold"
          >
            Save
          </button>
        </div>

        {/* Image Preview */}
        <div className="w-[600px] h-[500px] rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src={media.url}
            alt=""
            width={600}
            height={600}
            className={
              draftSettings.type === "original"
                ? "h-full object-contain"
                : draftSettings.type === "square"
                ? "aspect-square object-cover"
                : "aspect-video object-cover"
            }
          />
        </div>

        {/* Controls */}
        <div className="flex justify-between text-sm">
          <div className="flex gap-6">
            {(["original", "wide", "square"] as const).map((type) => (
              <button
              type="button"
                key={type}
                onClick={() =>
                  setDraftSettings((prev) => ({ ...prev, type }))
                }
                className={
                  draftSettings.type === type
                    ? "text-blue-400"
                    : "text-white"

                }
              >
                {type}
              </button>
            ))}
          </div>

          <button
          type="button"
            onClick={() =>
              setDraftSettings((prev) => ({
                ...prev,
                sensitive: !prev.sensitive,
              }))
            }
            className={`px-4 py-1 rounded-full text-black ${
              draftSettings.sensitive ? "bg-red-500" : "bg-white"
            }`}
          >
            Sensitive
          </button>
        </div>
      </div>
    </div>
  );
}
