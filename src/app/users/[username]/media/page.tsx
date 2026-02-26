import type { Metadata } from "next";
import ProfileHeader from "@/components/ProfileHeader";

export const metadata: Metadata = {
  title: "Media posts by Hassan Said (@hassansaid)",
};

export default function MediaPage() {
  return (
    <div>
      <ProfileHeader username="hassansaid" />
      <div className="p-8 text-center text-textGray min-h-[200px]">
        <p className="text-xl font-bold text-white mb-2">No media yet</p>
        <p>When @hassansaid posts photos or videos, they will show up here.</p>
      </div>
    </div>
  );
}
