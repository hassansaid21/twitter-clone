import type { Metadata } from "next";
import ProfileHeader from "@/components/ProfileHeader";

export const metadata: Metadata = {
  title: "Specials by Hassan Said (@hassansaid)",
};

export default function SpecialsPage() {
  return (
    <div>
      <ProfileHeader username="hassansaid" />
      <div className="p-8 text-center text-textGray min-h-[200px]">
        <p className="text-xl font-bold text-white mb-2">No specials yet</p>
        <p>When @hassansaid posts special content, it will show up here.</p>
      </div>
    </div>
  );
}
