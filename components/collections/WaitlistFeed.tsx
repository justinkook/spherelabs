import WaitlistItem from './WaitlistItem';

interface WaitlistFeedProps {
  waitlists?: Record<string, any>[];
}

const WaitlistFeed: React.FC<WaitlistFeedProps> = ({ waitlists = [] }) => {
  return (
    <>
      {waitlists.map((waitlist: Record<string, any>,) => (
        <WaitlistItem key={waitlist.id} data={waitlist} />
      ))}
    </>
  );
};

export default WaitlistFeed;
