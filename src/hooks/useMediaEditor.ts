import { useReducer } from "react";
import { MediaFile, Settings } from "@/types";

const DEFAULT_SETTINGS: Settings = {
  type: "original",
  sensitive: false,
};

interface MediaEditorState {
  media: MediaFile[];
  editingMedia: MediaFile | null;
}
type MediaEditorAction =
  | { type: "ADD_MEDIA"; payload: { files: FileList; maxFiles: number } }
  | { type: "REMOVE_MEDIA"; payload: { id: string } }
  | { type: "EDIT_MEDIA"; payload: { media: MediaFile } }
  | {
      type: "UPDATE_SETTINGS";
      payload: { id: string; settings: Partial<Settings> };
    }
  | { type: "CLOSE_EDITOR" }
  | { type: "RESET" };

function mediaEditorReducer(
  state: MediaEditorState,
  action: MediaEditorAction
): MediaEditorState {
  switch (action.type) {
    case "ADD_MEDIA": {
      const { files, maxFiles } = action.payload;

      const newMedia: MediaFile[] = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file), // ⚠️ allowed ONLY if you accept minimal impurity
        settings: { ...DEFAULT_SETTINGS },
        type: file.type.includes("video") ? "video" : "image",
      }));

      return {
        ...state,
        media: [...state.media, ...newMedia].slice(0, maxFiles),
      };
    }

    case "REMOVE_MEDIA": {
      return {
        ...state,
        media: state.media.filter((m) => m.id !== action.payload.id),
      };
    }

    case "EDIT_MEDIA": {
      return {
        ...state,
        editingMedia: action.payload.media,
      };
    }

    case "UPDATE_SETTINGS": {
      const { id, settings } = action.payload;
      return {
        ...state,
        media: state.media.map((m) =>
          m.id === id ? { ...m, settings: { ...m.settings, ...settings } } : m
        ),
      };
    }

    case "CLOSE_EDITOR":
      return { ...state, editingMedia: null };

    case "RESET":
      return { media: [], editingMedia: null };

    default:
      return state;
  }
}

export function useMediaEditor(maxFiles: number = 4) {
  const [state, dispatch] = useReducer(mediaEditorReducer, {
    media: [],
    editingMedia: null,
  });

  /* ---------------------------------
     ADD MEDIA
  ---------------------------------- */
  function addMedia(files: FileList | null) {
    if (!files) return;
    dispatch({
      type: "ADD_MEDIA",
      payload: { files, maxFiles },
    });
  }

  /* ---------------------------------
     REMOVE MEDIA (with cleanup)
  ---------------------------------- */
  function removeMedia(id: string) {
    const target = state.media.find((m) => m.id === id);
    if (target) URL.revokeObjectURL(target.url);

    dispatch({
      type: "REMOVE_MEDIA",
      payload: { id },
    });
  }

  /* ---------------------------------
     OPEN EDITOR
  ---------------------------------- */
  function editMedia(media: MediaFile) {
    dispatch({ type: "EDIT_MEDIA", payload: { media } });
  }

  /* ---------------------------------
     UPDATE SETTINGS
  ---------------------------------- */
  function updateMediaSettings(id: string, settings: Partial<Settings>) {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { id, settings },
    });
  }

  /* ---------------------------------
     CLOSE EDITOR
  ---------------------------------- */
  function closeEditor() {
    dispatch({ type: "CLOSE_EDITOR" });
  }

  /* ---------------------------------
     RESET
  ---------------------------------- */
  function reset() {
    state.media.forEach((m) => URL.revokeObjectURL(m.url));
    dispatch({ type: "RESET" });
  }

  return {
    media: state.media,
    editingMedia: state.editingMedia,
    addMedia,
    removeMedia,
    editMedia,
    updateMediaSettings,
    closeEditor,
    reset,
  };
}
