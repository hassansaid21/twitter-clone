

import { useState } from "react";
import { MediaFile, Settings } from "@/types";

const DEFAULT_SETTINGS: Settings = {
  type: "original",
  sensitive: false,
};

export function useMediaEditor(maxFiles: number = 4) {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);

  /* ---------------------------------
     ADD MEDIA
  ---------------------------------- */
  function addMedia(files: FileList | null) {
    if (!files) return;

    const newMedia: MediaFile[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      settings: { ...DEFAULT_SETTINGS },
    }));

    setMedia((prev) =>
      [...prev, ...newMedia].slice(0, maxFiles)
    );
  }

  /* ---------------------------------
     REMOVE MEDIA
  ---------------------------------- */
  function removeMedia(id: string) {
    setMedia((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target) URL.revokeObjectURL(target.url);

      return prev.filter((m) => m.id !== id);
    });
  }

  /* ---------------------------------
     OPEN EDITOR
  ---------------------------------- */
  function editMedia(media: MediaFile) {
    setEditingMedia(media);
  }

  /* ---------------------------------
     UPDATE SETTINGS
  ---------------------------------- */
  function updateMediaSettings(
    id: string,
    settings: Partial<Settings>
  ) {
    setMedia((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, settings: { ...m.settings, ...settings } }
          : m
      )
    );
  }

  /* ---------------------------------
     CLOSE EDITOR
  ---------------------------------- */
  function closeEditor() {
    setEditingMedia(null);
  }

  return {
    media,
    editingMedia,
    addMedia,
    removeMedia,
    editMedia,
    updateMediaSettings,
    closeEditor,
    setMedia
  };
}
