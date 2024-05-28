import React, { useState } from "react";
import { motion } from "framer-motion";
import HomeTabs from "../../common/HomePage/HomeTabs";
import FirstSection from "./HomePageMiddleBottomSection/Sections/FirstSection";
import SecondSection from "./HomePageMiddleBottomSection/Sections/SecondSection";
import ThirdSection from "./HomePageMiddleBottomSection/Sections/ThridSection";
function HomePageBottomMiddleSection() {
  const [tab, setTab] = useState(0);
  return (
    <motion.div className="w-full px-4 py-2 h-fit flex flex-col gap-4 relative top-[-26rem] md:top-[-23rem] lg:top-[-4rem]">
      {/* <HomeTabs tabInfo={tab} tab={setTab} /> */}
      {tab === 0 && <FirstSection />}
      {tab === 1 && (
        <div className="flex flex-row-reverse">
          <SecondSection />
        </div>
      )}
      {tab === 2 && <ThirdSection />}
    </motion.div>
  );
}

export default HomePageBottomMiddleSection;
