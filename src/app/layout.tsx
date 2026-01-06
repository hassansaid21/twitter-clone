import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  return (
    <html lang="en">
      <body>
  
<div className="flex justify-between md:max-w-screen-md lg:max-w-screen-lg  xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto ">
  <div className="px-4 xxl:px-8  "><LeftBar/></div>
  <div className="flex-1 border-x-[1px] border-borderGray  lg:min-w-[600px] min-h-screen ">{children}</div>
  <div className="hidden lg:flex flex-1 md:ml-8  "><RightBar /></div>
</div>


</body>
</html>

  ) 
}