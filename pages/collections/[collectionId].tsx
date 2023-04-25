import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import Header from "@/components/Header";
import Form from "@/components/Form";
import CollectionItem from "@/components/collections/CollectionItem";
import WaitlistFeed from "@/components/collections/WaitlistFeed";
import useCollection from "@/hooks/useCollection";


const CollectionView = () => {
  const router = useRouter();
  const { collectionId } = router.query;

  const { data: fetchedCollections, isLoading } = useCollection(collectionId as string);

  if (isLoading || !fetchedCollections) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return ( 
    <>
      <Header showBackArrow label="Tweet" />
      <CollectionItem data={fetchedCollections} />
      <Form collectionId={collectionId as string} isWaitlist placeholder="Tweet your reply" />
      <WaitlistFeed waitlists={fetchedCollections?.waitlist} />
    </>
   );
}
 
export default CollectionView;