import { useDispatch, useSelector } from "react-redux";
import Root from "./routes/Root";
import { userActions } from "./store/userSlice";
import { getCurrentUserData, getSelectedUserFollowing } from "./firebase/firebaseActions";
import { followingActions } from "./store/followingSlice";

function App() {
  const dispatch = useDispatch();
  const getData = async () => {
    if (!localStorage.getItem("user")) return;
    const userData = await getCurrentUserData(localStorage.getItem("user"));
    userData && dispatch(userActions.updateUser(userData));
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
