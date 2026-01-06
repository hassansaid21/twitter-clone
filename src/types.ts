

export interface MediaFile {
    id: string;
    file: File;
    url: string;
  }

 export interface PostImagesProps {
    media: MediaFile[];
    onRemove: (id: string) => void;
  }
  

  export interface ImageBlockProps {
    media: MediaFile;
    onRemove: (id: string) => void;
  }
  