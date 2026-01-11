import Link from "next/link";
import ImageKitMedia from "./ImageKitMedia";

const trends = Array.from({ length: 3}, () => ({
  category: "Technology • Trending",
  title: "OpenAI",
  posts: "20K posts",
}));

const PopularTags = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGrayLight">
        {"What's"} Happening
      </h1>
      {/* TREND EVENT */}
      <div className="flex gap-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden">
          
          <ImageKitMedia
            type="image"
            src="general/Jjk-culling-game-season-3.webp"
            alt="event"
            width={100}
            height={100}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2 ">
          <h2 className="font-bold text-textGrayLight">
            Jujutsu Kaisen S3
          </h2>
          <span className="text-sm text-textGray">Airing Now</span>
        </div>
      </div>
      {/* TOPICS */}
      {trends.map((trend) => (
        <div key={trend.title} className="">
          <div className="flex items-center justify-between">
            <span className="text-textGray text-sm">{trend.category}</span>
            <div className="p-2 rounded-full flex items-center  hover:bg-iconBlue/20">
            <ImageKitMedia
              type="image"
              src="icons/infoMore.svg"
              alt="info"
              width={16}
              height={16}  
              className="cursor-pointer"
              />
              </div>
          </div>
          <h2 className="text-textGrayLight font-bold">{trend.title}</h2>
          <span className="text-textGray text-sm">{trend.posts}</span>
        </div>
      ))}
     <hr  className=" border-borderGray"/>

      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default PopularTags;
