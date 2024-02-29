import React from "react";

function SocialSectionComponent({ instagram, setInstagram, github, setGithub, linkedin, setLinkedin }) {
  return (
    <>
      <p className="w-full my-2 text-xl text-slate-300">Socials</p>
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={instagram ? instagram : `Your Instagram Profile Link`}
        onChange={(e) => {
          setInstagram(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={github ? github : `Your GitHub Profile Link`}
        onChange={(e) => {
          setGithub(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={linkedin ? linkedin : `Your LinkedIn Profile Link`}
        onChange={(e) => {
          setLinkedin(e.target.value);
        }}
      />
    </>
  );
}

export default SocialSectionComponent;
