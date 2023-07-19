import React from "react";
import Navbar from "../../components/layout/Navbar";
import { getAuth } from "firebase/auth";

function FeedPage() {
  const user = getAuth().currentUser;
  console.log(user);
  return (
    <>
      <Navbar isNotLoggedin={false} />
      <div className="mx-10">
        <h1 className="text-5xl font-bold text-cWhite">Feed Page</h1>
        <p className="text-2xl text-cWhite">{user.email}</p>
      </div>
    </>
  );
}

export default FeedPage;
