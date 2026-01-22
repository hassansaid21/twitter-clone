


import type { Metadata } from "next";
import { type ReactNode } from "react";
import ProfileHeader from "@/components/ProfileHeader";

export const metadata: Metadata = {
  title: "Hassan Said (@hassansaid)",
};

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    username: string;
  }>;
};

export default async function Layout({children, params}: LayoutProps) {
  const {username} = await params;
 
  return (
    <div>
      <ProfileHeader username={username} />
      {children}
    </div>
  );
}
