import CollectionItem from './CollectionItem';
import useCollections from '@/hooks/useCollections';

interface PostFeedProps {
  userId?: string;
}

const CollectionFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: collections = [] } = useCollections(userId);

  return (
    <>
      {collections.map((post: Record<string, any>,) => (
        <CollectionItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default CollectionFeed;
