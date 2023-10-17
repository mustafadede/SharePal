import { useState } from "react";

const FollowButton = () => {
  const [followState, setFollowState] = useState(false);
  const onFollowAction = async () => {
    if (!followState) {
      setFollowState(true);
    } else {
      setFollowState(false);
    }
  };
  return (
    <>
      {!followState ? (
        <button
          className="flex items-center justify-center h-10 px-4 text-white select-none text-md bg-fuchsia-700 hover:bg-fuchsia-900 rounded-2xl"
          onClick={onFollowAction}
        >
          Follow
        </button>
      ) : (
        <button className="flex items-center justify-center h-10 px-4 text-white rounded-md select-none text-md" onClick={onFollowAction}>
          Followed
        </button>
      )}
    </>
  );
};

export default FollowButton;
