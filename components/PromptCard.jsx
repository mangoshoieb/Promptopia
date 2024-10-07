import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const {data : session}=useSession();
  const pathname=usePathname();
  const router=useRouter();

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy=()=>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {
        setCopied("")
    }, 3000);
  }
  const [copied, setCopied] = useState("");
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi text-gray-900 font-semibold">
              {post.creator.username}
            </h3>
            <p className="font-inter text-gray-500 text-sm">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={14}
            height={14}
            alt="copy"
          />
        </div>
      </div>
      <p className="font-satoshi my-4 text-sm text-gray-700">{post.prompt}</p>
      <p
        className="text-sm font-inter blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathname==="/profile" &&(
      <div className="mt-5 flex-center gap-4 pt-3 border-t border-gray-100">
      <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
        Edit
      </p>
      <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
        Delete
      </p>
    </div>
      )}

    </div>
  );
};

export default PromptCard;
