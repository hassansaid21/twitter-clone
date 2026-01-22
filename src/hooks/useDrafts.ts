"use client";

import { useState, useEffect, useCallback } from "react";
import { Draft, DraftMedia, MediaFile } from "@/types";

const DRAFTS_KEY = "twitter_clone_drafts";

export function useDrafts() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load drafts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(DRAFTS_KEY);
    if (stored) {
      try {
        setDrafts(JSON.parse(stored));
      } catch {
        setDrafts([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Persist drafts to localStorage
  const persistDrafts = useCallback((newDrafts: Draft[]) => {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(newDrafts));
    setDrafts(newDrafts);
  }, []);

  // Convert File to base64 dataUrl
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Convert MediaFile[] to DraftMedia[]
  const convertMediaToDraft = async (media: MediaFile[]): Promise<DraftMedia[]> => {
    return Promise.all(
      media.map(async (m) => ({
        id: m.id,
        dataUrl: await fileToDataUrl(m.file),
        type: m.type,
        settings: m.settings,
        fileName: m.file.name,
        mimeType: m.file.type,
      }))
    );
  };

  // Convert base64 dataUrl back to File
  const dataUrlToFile = async (dataUrl: string, fileName: string, mimeType: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: mimeType });
  };

  // Convert DraftMedia[] back to MediaFile[]
  const convertDraftToMedia = async (draftMedia: DraftMedia[]): Promise<MediaFile[]> => {
    return Promise.all(
      draftMedia.map(async (dm) => {
        const file = await dataUrlToFile(dm.dataUrl, dm.fileName, dm.mimeType);
        return {
          id: dm.id,
          file,
          url: URL.createObjectURL(file),
          type: dm.type,
          settings: dm.settings,
        };
      })
    );
  };

  // Save a new draft
  const saveDraft = useCallback(
    async (text: string, media: MediaFile[]) => {
      const draftMedia = await convertMediaToDraft(media);
      const newDraft: Draft = {
        id: crypto.randomUUID(),
        text,
        media: draftMedia,
        createdAt: Date.now(),
      };
      persistDrafts([newDraft, ...drafts]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drafts, persistDrafts]
  );

  // Delete drafts by ids
  const deleteDrafts = useCallback(
    (ids: string[]) => {
      const newDrafts = drafts.filter((d) => !ids.includes(d.id));
      persistDrafts(newDrafts);
    },
    [drafts, persistDrafts]
  );

  // Get a single draft
  const getDraft = useCallback(
    (id: string) => {
      return drafts.find((d) => d.id === id);
    },
    [drafts]
  );

  // Load draft data for editing (converts back to MediaFile format)
  const loadDraftForEditing = useCallback(
    async (id: string): Promise<{ text: string; media: MediaFile[] } | null> => {
      const draft = getDraft(id);
      if (!draft) return null;

      const media = await convertDraftToMedia(draft.media);
      return { text: draft.text, media };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getDraft]
  );

  // Delete a draft after loading it
  const deleteDraft = useCallback(
    (id: string) => {
      deleteDrafts([id]);
    },
    [deleteDrafts]
  );

  return {
    drafts,
    isLoaded,
    saveDraft,
    deleteDrafts,
    deleteDraft,
    getDraft,
    loadDraftForEditing,
  };
}
