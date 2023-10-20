import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const FollowRecommendSkeleton = ({ username, photoURL }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/user/${username}`, { replace: true });
  }
  return (
    <div className="flex items-center justify-between my-2">
      {photoURL && <img loading="lazy" src={photoURL} alt="profile" className="w-[40px] h-[40px] rounded-full object-cover" />}
      <div className="w-56 pt-1 pl-2">
        <button onClick={handleClick}>
          <p className="duration-150 text-md text-slate-400 hover:text-fuchsia-600">@{username}</p>
        </button>
      </div>
      {/* <FollowButton /> */}
    </div>
  );
};

export default FollowRecommendSkeleton;
