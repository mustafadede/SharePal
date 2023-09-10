import { useDispatch, useSelector } from "react-redux";
import Root from "./routes/Root";
import { getSelectedUserFollowing } from "./firebase/firebaseActions";
import { followingActions } from "./store/followingSlice";
import { getAuth } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
  const getData = async () => {
    if (!localStorage.getItem("user")) return;
  };
  getData();
  return (
    <div className="min-h-screen bg-cGradient2">
      <Root />
    </div>
  );
}

export default App;
