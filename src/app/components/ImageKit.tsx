


import { Image } from "@imagekit/next"
import type { ImageProps as NextImageProps } from "next/image";
import type { IKImageProps, Transformation } from "@imagekit/next";

/**
 * Remove `src` from Next.js props
 * because ImageKit does NOT support StaticImport
 */
type NextImagePropsWithoutSrc = Omit<NextImageProps, "src">;

export interface ImageKitImageProps extends NextImagePropsWithoutSrc {
  /** ImageKit image path or full URL */
  src: string;

  /** Optional override for ImageKit base URL */
  urlEndpoint?: string;

  /** ImageKit transformations */
  transformation?: Transformation[];

  /** Extra query parameters */
  queryParameters?: Record<string, unknown>;

  /** Enable responsive behavior */
  responsive?: boolean;

  /** Where transformations appear in the URL */
  transformationPosition?: "query" | "path";

}


const ImageKit = (props:IKImageProps) => {
    const imageKitURL = process.env.IMAGE_KIT_URL_ENDPOINT
   return (
   
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image urlEndpoint={imageKitURL} transformation={[{ width: 600, height: 600  }]} {...props} />
 

  )
}


export default ImageKit