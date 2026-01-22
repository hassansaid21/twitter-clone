import type { Metadata } from "next";
import Feed from "@/components/Feed";

export const metadata: Metadata = {
  title: "Hassan Said (@hassansaid)",
};


export default  function PostsPage() {

  return (
    <div>
      <Feed />
    </div>
  );
}
