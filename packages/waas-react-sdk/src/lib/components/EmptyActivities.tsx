import emptyActivitiesImage from '../assets/empty-activities.svg';

export const EmptyActivities = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img className="w-[136px] h-[88px]" src={emptyActivitiesImage} alt="No activities" />
      <h1 className="text-subtitle-b">No past wallet activity</h1>
      <p className="mt-3 text-caption-m">
        This is your long-term memory on the blockchain. You'll be able to view your future
        transaction history here.
      </p>
    </div>
  );
};
