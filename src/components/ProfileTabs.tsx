"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabType = "posts" | "replies" | "specials" | "media";

const tabs: { id: TabType; label: string; path: string }[] = [
  { id: "posts", label: "Posts", path: "" },
  { id: "replies", label: "Replies", path: "/replies" },
  { id: "specials", label: "Specials", path: "/specials" },
  { id: "media", label: "Media", path: "/media" },
];

interface ProfileTabsProps {
  username: string;
}

export default function ProfileTabs({ username }: ProfileTabsProps) {
  const pathname = usePathname();
  const basePath = `/users/${username}`;
  
  const getActiveTab = (): TabType => {
    if (pathname.endsWith("/replies")) return "replies";
    if (pathname.endsWith("/specials")) return "specials";
    if (pathname.endsWith("/media")) return "media";
    return "posts";
  };
  
  const activeTab = getActiveTab();

  return (
    <div className="flex border-b border-borderGray">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`${basePath}${tab.path}`}
          className={`flex-1 py-4 text-center font-medium transition-colors relative hover:bg-white/10
            ${activeTab === tab.id ? "text-white" : "text-textGray"}
          `}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-iconBlue rounded-full" />
          )}
        </Link>
      ))}
    </div>
  );
}
