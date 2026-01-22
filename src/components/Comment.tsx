import Link from "next/link";
import Avatar from "./Avatar";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";

interface CommentProps {
  username?: string;
  postId?: string;
}

export default function Comment({ username = "user", postId = "1" }: CommentProps) {
  return (
    <Link 
      href={`/users/${username}/status/${postId}`}
      className="block p-4 border-b-[1px] border-borderGray hover:bg-white/[0.03] transition-colors"
    >
      <div className="flex gap-2 md:gap-4">
        {/* Avatar */}
        <Avatar />
        
        {/* Comment content */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1 flex-wrap text-textGray">
              <h2 className="text-white text-md font-bold cursor-pointer hover:underline">
                John Doe
              </h2>
              <span>@johndoe</span>
              <span>• 2h</span>
            </div>
            <PostInfo />
          </div>
          
          {/* Replying to */}
          <span className="text-textGray text-sm">
            Replying to <span className="text-iconBlue">@karim13</span>
          </span>
          
          {/* Comment text */}
          <p>
            This is a great post! I totally agree with your perspective on this topic.
          </p>
          
          <PostInteractions />
        </div>
      </div>
    </Link>
  );
}
