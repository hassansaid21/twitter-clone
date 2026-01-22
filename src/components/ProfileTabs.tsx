"use client";

import { useState } from "react";
import Feed from "./Feed";

type TabType = "posts" | "replies" | "specials" | "media";

const tabs: { id: TabType; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "replies", label: "Replies" },
  { id: "specials", label: "Specials" },
  { id: "media", label: "Media" },
];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("posts");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b border-borderGray">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-center font-medium transition-colors relative hover:bg-white/10
              ${activeTab === tab.id ? "text-white" : "text-textGray"}
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-iconBlue rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === "posts" && <Feed />}
        {activeTab === "replies" && (
          <div className="p-8 text-center text-textGray">
            <p className="text-xl font-bold text-white mb-2">No replies yet</p>
            <p>When this user replies to posts, they'll show up here.</p>
          </div>
        )}
        {activeTab === "specials" && (
          <div className="p-8 text-center text-textGray">
            <p className="text-xl font-bold text-white mb-2">No specials yet</p>
            <p>Special posts will appear here.</p>
          </div>
        )}
        {activeTab === "media" && (
          <div className="p-8 text-center text-textGray">
            <p className="text-xl font-bold text-white mb-2">No media yet</p>
            <p>Photos and videos will show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
