import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";

import Avatar from "../Avatar";
import LoginModal from "../modals/LoginModal";
interface CollectionItemProps {
  data: Record<string, any>;
  userId?: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  data = {},
  userId,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  return (
    <div key={data.id} className="group relative m-25 min-h-50 min-w-400">
      <div className="h-40 w-full rounded-md bg-gray-200 group-hover:opacity-75">
        <img
          src={data.imageSrc}
          alt={data.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute top-32 left-5">
        <Avatar userId={currentUser?.id || ''} />
      </div>
      <h2 className="mt-4 text-sm text-gray-700">
        <p className="mt-1 text-sm font-medium text-gray-900">{data.name}</p>
      </h2>
      <p className="mt-1 text-sm text-gray-500">{data.body}</p>
      <button className="rounded-full bg-[#3960EF] text-white min-w-full p-2 mt-5 absolute right-0 -bottom-20">
      {data.waitlist 
      ? "Claim"
      : "Join Waitlist"}
      </button>
      {!currentUser && (<LoginModal/>)}
    </div>
  );
};

export default CollectionItem;
