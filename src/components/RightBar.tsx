import Link from "next/link";
import PopularTags from "./PopularTags";
import Recommendations from "./Recommendations";
import Search from "./Search";

const RightBar = () => {
  return (
    <div className=" flex flex-col gap-4 sticky bottom-[-13rem] top-[-13rem]   h-max">
       <div className=" sticky top-0 z-20 w-full bg-black py-2 ">
      <Search />

       </div>
      <PopularTags />
      <Recommendations />
      <div className="text-textGray text-sm flex gap-x-4 flex-wrap mb-2">
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Cookie Policy</Link>
        <Link href="/">Accessibility</Link>
        <Link href="/">Ads Info</Link>
        <span>© 2026 X Corp.</span> 
      </div>
    </div>
  );
};

export default RightBar;
