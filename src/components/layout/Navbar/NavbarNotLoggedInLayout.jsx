import React from "react";
import SecondaryButton from "../../common/SecondaryButton";
import PrimaryButton from "../../common/PrimaryButton";

function NavbarNotLoggedInLayout() {
  return (
    <>
      <SecondaryButton title="Sign Up" whereTo={"/signup"} />
      <PrimaryButton title="Log In" whereTo={"/login"} />
    </>
  );
}

export default NavbarNotLoggedInLayout;
