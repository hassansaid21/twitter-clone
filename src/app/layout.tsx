import type { Metadata } from "next";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "X - Social Media",
  description: "A social media platform to share your thoughts",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex justify-between md:max-w-screen-md lg:max-w-screen-lg  xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto  ">
          <div className="px-1 xxl:px-8  ">
            <LeftBar />
          </div>
          <div className="flex-1 border-x-[1px] border-borderGray  lg:min-w-[600px] min-h-screen ">
            {children}
            {modal}
           </div>
          <div className="hidden lg:flex flex-1 md:ml-8  ">
            <RightBar />
          </div>
        </div>
      </body>
    </html>
  );
}
