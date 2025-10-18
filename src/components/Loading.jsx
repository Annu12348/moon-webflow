import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Loading = ({ setLoading }) => {
  const loadRef1 = useRef(null);
  const loadRef2 = useRef(null);
  const loadLogoRef2 = useRef(null);

  useEffect(() => {
    if (loadRef1.current && loadRef2.current && loadLogoRef2.current) {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });
      
      tl.to(loadLogoRef2.current, {
        y: "30",
        duration: 0.5,
        delay: 0.3,
        ease: "power3.inOut",
      });
      
      tl.to(
        [loadRef1.current, loadRef2.current],
        {
          y: (i, target) => (target === loadRef1.current ? "-100%" : "100%"),
          duration: 0.9,
          delay: 0.5,
          ease: "power3.inOut",
          stagger: 0, 
        },
        "+=0" 
      );
      return () => tl.kill();
    }
  }, []);

  
  return (
    <div className=" w-full h-screen  absolute overflow-hidden ">
      <div
        ref={loadRef1}
        className="w-full h-[50%] bg-[#BE5A49] flex items-end justify-center overflow-hidden "
      >
        <img
          ref={loadLogoRef2}
          className=" h-7  "
          src="https://assets.website-files.com/5d3b05ac6e3cf05bd80dd91c/5dac6910f43e6f5356e0ebfc_moon-ultralight-white.svg"
          alt="logo moon"
        />
      </div>
      <div ref={loadRef2} className="w-full h-[50%] bg-[#BE5A49] "></div>
    </div>
  );
};

export default Loading;
