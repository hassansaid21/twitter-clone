import type { Metadata } from "next";
import Feed from "@/components/Feed";
import ProfileHeader from "@/components/ProfileHeader";

export const metadata: Metadata = {
  title: "Hassan Said (@hassansaid)",
};

export default function PostsPage() {
  return (
    <div>
      <ProfileHeader username="hassansaid" />
      <Feed />
    </div>
  );
}
