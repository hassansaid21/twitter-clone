import Link from "next/link";
import ImageKitMedia from "./ImageKitMedia";
import Avatar from "./Avatar";

const Recommendations = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">You might like</h2>
      {/* USER CARD */}
      <div className="flex items-center justify-between">
        {/* IMAGE AND USER INFO */}
        <div className="flex items-center gap-2">
        <Avatar />
          <div className="">
            <h1 className="text-md font-bold">John Doe</h1>
            <span className="text-textGray text-sm">@johnDoe</span>
          </div>
        </div>
        {/* BUTTON */}
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <div className="flex items-center justify-between">
        {/* IMAGE AND USER INFO */}
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <ImageKitMedia
              src="general/avatar.png"
              alt="John Doe"
              width={100}
              height={100}
              type="image"
            />
          </div>
          <div className="">
            <h1 className="text-md font-bold">John Doe</h1>
            <span className="text-textGray text-sm">@johnDoe</span>
          </div>
        </div>
        {/* BUTTON */}
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
     <hr  className=" border-borderGray"/>
      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
