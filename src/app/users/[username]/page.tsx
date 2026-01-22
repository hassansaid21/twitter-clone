import ImageKitMedia from "@/components/ImageKitMedia";
import ProfileTabs from "@/components/ProfileTabs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="">
      <div className=" flex items-center gap-8 sticky top-0 h-max bg-black/60 backdrop-blur-md p-2 z-10 b-bottom-[1px] 
      ">
        <Link href="/" className="p-2 rounded-full hover:bg-bgHover">
          <ImageKitMedia
            src="icons/back.svg"
            type="image"
            width={20}
            height={20}
            alt="back"
          />
        </Link>
        <div className="flex flex-col ">
          <h1 className="text-xl font-bold">Hassan Said</h1>
          <span className="text-sm text-textGray">214 posts</span>
        </div>
      </div>
      <div className="relative w-full ">
        <div className=" w-full relative aspect-[3/1] ">
          <ImageKitMedia
          type="image"
            src="general/cover.jpg"
            alt="background image"
            fill
            className="object-contain"
          />
        </div>

        <div className="border-[4px] scale-75 md:scale-100 border-black rounded-full overflow-hidden absolute  translate-y-[-50%] left-2 md:left-4 transition-all">
          <ImageKitMedia
            type="image"
            src="general/avatar.png"
            alt="profile image"
            width={140}
            height={140}
          />
        </div>
      </div>
      <div className="flex justify-end  px-6 py-4">
        <button className="px-4 py-2 bg-white rounded-full text-black text-lg font-bold ">
          follow
        </button>
      </div>

      <div className="px-4 py-2 flex flex-col justify-center border-b-[1px] border-borderGray gap-4">
        <div className="">
          <h2 className="font-bold text-3xl text-white">Hassan Said</h2>
          <span className="text-textGray text-sm ">@hassansaid</span>
        </div>
        <div className="text-lg">
          a software enginner with expertise in react , tailwind ,next.js and
          angular
        </div>
        <div className="flex items-center gap-4 text-md text-textGray">
          <span className="flex gap-1">
            {" "}
            <ImageKitMedia
              src="icons/date.svg"
              alt="calender"
              type="image"
              width={15}
              height={15}
            />
            join in Aug 2019
          </span>
          <span className="flex gap-1">
            {" "}
            <ImageKitMedia
              src="icons/userLocation.svg"
              alt="calender"
              type="image"
              width={15}
              height={15}
            />
            cairo Egypt
          </span>
          <span className="flex gap-1">
            {" "}
            <ImageKitMedia
              src="icons/job.svg"
              alt="calender"
              type="image"
              width={15}
              height={15}
            />
            software developer
          </span>
        </div>
        <div className="flex item-center gap-8">
          <span>
            <span className="text-textGray">Following</span> 200{" "}
          </span>
          <span>
            <span className="text-textGray">Followers</span> 100{" "}
          </span>
        </div>
      </div>
      <ProfileTabs />
    </div>
    
  
  );
}
