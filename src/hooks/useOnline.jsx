import { useSelector } from "react-redux";
import { getUserOnlineStatus } from "../firebase/firebaseActions";
import { useEffect, useState } from "react";

const useOnline = (username, data = false) => {
  const [online, setOnline] = useState(false);
  const { profileUser } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (username && !data) {
      getUserOnlineStatus(profileUser?.uid).then((res) => {
        setOnline(res?.online);
      });
    } else {
      setOnline(user?.online);
    }
    if (data && username) {
      getUserOnlineStatus(data?.userId || data).then((res) => {
        setOnline(res?.online);
      });
    }
  }, [username]);
  return online;
};

export default useOnline;
