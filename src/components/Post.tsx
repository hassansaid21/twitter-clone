import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import Avatar from "./Avatar";
import { ImageKit as Client } from "@imagekit/nodejs";
import { FileDetails } from "@/types";
import PostMedia from "./PostMedia";
const client = new Client({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default async function Post() {
  async function getFileDetails(fileId: string): Promise<FileDetails> {
    try {
      return (await client.files.get(fileId)) as FileDetails;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Getting  File Details  failed: ${error.message}`);
      }
      throw new Error("Failed to fetch file details");
    }
  }
  const fileDetails = await getFileDetails("696151085c7cd75eb8261bf6");
  // console.log(fileDetails)
  return (
    <div className="p-4 border-b-[1px] border-borderGray">
      {/** post type */}
      <div className="flex items-center gap-2 text-sm mb-2 text-textGray font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
            className="fill-textGray  "
          />
        </svg>
        <span className=""> hassan said reposted</span>
      </div>

      <div className="flex gap-2 md:gap-4">
        {/** avatar */}

        <Avatar />
        {/** post creator info */}
        <div className="flex flex-1 flex-col gap-2 ">
          <div className="flex  items-center justify-between  gap-2">
            <div className="flex gap-1  flex-wrap text-textGray ">
              <h2 className="text-white text-md font-bold cursor-pointer">
                Karim Said
              </h2>
              <span>@karim13 &apos;</span>
              <span>25/12/2026</span>
            </div>
            <PostInfo />
          </div>
          {/* post content  */}
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            molestiae doloremque nihil debitis sequi tempore, cupiditate at
            ducimus, natus nostrum harum, ab explicabo sit. Quam amet
            consequatur deleniti expedita omnis.
          </p>

          {fileDetails && <PostMedia fileDetails={fileDetails} />}
          <PostInteractions />
        </div>
      </div>
    </div>
  );
}
