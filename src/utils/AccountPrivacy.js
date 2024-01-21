const AccountPrivacyHelperFunction = (profileUserId, followingList, privacy) => {
  let flag = false;
  const followingListFind = followingList.find((item) => item.uid === profileUserId);
  if (followingListFind) {
    flag = true;
  } else {
    privacy === "Public" ? (flag = true) : (flag = false);
  }
  return flag;
};

export default AccountPrivacyHelperFunction;
