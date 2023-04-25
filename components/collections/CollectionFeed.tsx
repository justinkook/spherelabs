import CollectionItem from './CollectionItem';
import useCollections from '@/hooks/useCollections';

interface CollectionFeedProps {
  userId?: string;
}

const CollectionFeed: React.FC<CollectionFeedProps> = ({ userId }) => {
  const { data: collections = [] } = useCollections(userId);

  return (
    <>
    <div className="bg-white">
      <div className="max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available Pre-Sales</h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-0 lg:gap-x-8">
          {collections.map((collection: Record<string, any>,) => (
            <CollectionItem userId={userId} key={collection.id} data={collection} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CollectionFeed;
