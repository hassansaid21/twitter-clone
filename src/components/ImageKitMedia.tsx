"use client";
export type MediaType = "image" | "video";
import { Image, Video } from "@imagekit/next";
import type { ImageProps as NextImageProps } from "next/image";
import type { Transformation } from "@imagekit/next";

type NextImagePropsWithoutSrc = Omit<NextImageProps, "src">;

interface BaseMediaProps {
  src: string;
  urlEndpoint?: string;
  type: "image" | "video";
  className?: string;
}

/* ---------------- IMAGE ---------------- */

export interface ImageKitImageProps
  extends BaseMediaProps,
    NextImagePropsWithoutSrc {
  type: "image";
  transformation?: Transformation[];
}

/* ---------------- VIDEO ---------------- */

export interface ImageKitVideoProps extends BaseMediaProps {
  type: "video";
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

/* ---------------- UNION ---------------- */

export type ImageKitMediaProps =
  | ImageKitImageProps
  | ImageKitVideoProps;



const ImageKitMedia = (props: ImageKitMediaProps) => {
  const urlEndpoint =
    props.urlEndpoint ??
    process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT;

  if (!urlEndpoint) {
    throw new Error("ImageKit urlEndpoint is missing");
  }

  /* ---------------- IMAGE ---------------- */
  if (props.type === "image") {
    const { type, transformation, ...imageProps } = props;

    return (
      <Image
        urlEndpoint={urlEndpoint}
        {...imageProps}
      />
    );
  }

  /* ---------------- VIDEO ---------------- */
  const {
    type,
    src,
    controls = true,
    autoPlay = false,
    muted = false,
    loop = false,
    className,
  } = props;

  return (
    <Video
      className={className}
      urlEndpoint={urlEndpoint}
      src={src}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      transformation={[{quality:90 ,width:"1920" , height:"1080"}]}
      
    />
  );
};

export default ImageKitMedia;
