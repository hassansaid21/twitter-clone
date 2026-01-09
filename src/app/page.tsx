import Feed from "../components/Feed";
import Link from "next/link";
import Publish from "../components/Publish";

const Homepage = () => {
  return (
    <div className="flex flex-col ">
      <div className=" flex  text-textGray border-borderGray border-b-[1px] font-bold text-center">
        <Link className="flex-1 py-4  hover:bg-bgHover" href="/">
          <span className="border-b-4 py-4  px-1 text-white border-iconBlue">
            For You
          </span>{" "}
        </Link>
        <Link className="flex-1 py-4 hover:bg-bgHover " href="/">
          <span className=" py-4 px-1  ">Following</span>
        </Link>
        <Link
          className="   hidden     md:block flex-1 py-4    hover:bg-bgHover "
          href="/"
        >
          <span className=" py-4 px-1 ">React.js</span>
        </Link>
        <Link
          className="  hidden     md:block flex-1 py-4    hover:bg-bgHover "
          href="/"
        >
          <span className=" py-4 px-1 ">Javascript</span>
        </Link>{" "}
        <Link
          className="  hidden     md:block flex-1 py-4    hover:bg-bgHover "
          href="/"
        >
          <span className=" py-4 px-1 "> CSS</span>
        </Link>
      </div>
      <Publish />
      <Feed />
    </div>
  );
};

export default Homepage;
