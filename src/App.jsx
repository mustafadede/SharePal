import { useDispatch, useSelector } from "react-redux";
import Root from "./routes/Root";
import { getSelectedUserFollowing } from "./firebase/firebaseActions";
import { followingActions } from "./store/followingSlice";

function App() {
  const dispatch = useDispatch();
  const getData = async () => {
    if (!localStorage.getItem("user")) return;
    const followingData = await getSelectedUserFollowing(localStorage.getItem("user"));
    followingData.length > 0 && followingData.forEach((user) => dispatch(followingActions.updateFollowing(user)));
  };
  getData();
  return (
    <div className="min-h-screen bg-cGradient2">
      <Root />
    </div>
  );
}

export default App;
