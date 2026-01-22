export interface Settings {
  type: "square"|"original"|"wide";
  sensitive: boolean;
}
import { SetStateAction } from "react";

export interface MediaFile {
  id: string;
  file: File;
  url: string;
  settings:Settings ;
  type:'video'|'image' ;
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


export interface FileDetails {
  width : number ; 
  height : number ;
  filePath : string ;
  url : string ;
  fileType :  string ;
  customMetadata ?: {sensitive : boolean}
  mime: string;
}

export interface DraftMedia {
  id: string;
  dataUrl: string;
  type: 'video' | 'image';
  settings: Settings;
  fileName: string;
  mimeType: string;
}

export interface Draft {
  id: string;
  text: string;
  media: DraftMedia[];
  createdAt: number;
}