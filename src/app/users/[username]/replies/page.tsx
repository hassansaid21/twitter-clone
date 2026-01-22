import type { Metadata } from "next";
import Comment from "@/components/Comment";


export const metadata: Metadata = {
  title: "Posts with replies by Hassan Said (@hassansaid)",
};

export default function RepliesPage() {
  return (
    <div>
     
      <Comment username="hassansaid" postId="1" />
      <Comment username="hassansaid" postId="2" />
      <Comment username="hassansaid" postId="3" />
    </div>
  );
}
