import FollowRecommendSkeleton from "./FollowRecommendSkeleton";

const FollowCard = ({ users }) => {
  return (
    <div className="flex flex-col p-4 overflow-hidden h-96 w-72 bg-slate-900 rounded-2xl">
      <p className="text-xl font-bold text-slate-200">Recommended Users</p>
      {users?.map((user, index) => (
        <FollowRecommendSkeleton key={index} username={user.displayName} photoURL={user.photoURL} />
      ))}
    </div>
  );
};

export default FollowCard;
