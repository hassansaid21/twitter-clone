export interface Settings {
  type: "square"|"original"|"wide";
  sensitive: boolean;
}
import { SetStateAction } from "react";

export interface MediaFile {
  id: string;
  file: File;
  url: string;
  settings:Settings
}

export interface PostImagesProps {
  media: MediaFile[];
  onRemove: (id: string) => void;
  onEdit: (media: MediaFile) => void;
  
}

export interface ImageBlockProps {
  media: MediaFile;
  onRemove: (id: string) => void;
  onEdit: (media: MediaFile) => void; 
}


interface ImageEditorProps {
  media: MediaFile;
  onClose: () => void;
  onUpdate: (settings: {
    type?: "original" | "wide" | "square";
    sensitive?: boolean;
  }) => void;
}