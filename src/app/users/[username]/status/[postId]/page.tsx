import type { Metadata } from "next";
import Post from "@/components/Post";
import ReplyBox from "@/components/ReplyBox";
import Comment from "@/components/Comment";
import ImageKitMedia from "@/components/ImageKitMedia";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Post",
};

export default function SinglePostPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-8 sticky top-0 h-max bg-black/60 backdrop-blur-md p-2 z-10 ">
        <Link href="/" className="p-2 rounded-full hover:bg-bgHover">
          <ImageKitMedia
            src="icons/back.svg"
            type="image"
            width={20}
            height={20}
            alt="back"
          />
        </Link>
        <h1 className="text-xl font-bold">Post</h1>
      </div>

      {/* Single Post */}
      <Post />

      {/* Reply Box */}
      <ReplyBox replyingTo="karim13" />

      {/* Comments Section */}
      <div>
        <Comment username="johndoe" postId="2" />
        <Comment username="jane" postId="3" />
        <Comment username="mike" postId="4" />
        <Comment username="sarah" postId="5" />
      </div>
    </div>
  );
}
