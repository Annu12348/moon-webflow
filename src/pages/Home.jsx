import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
  const backImageRef = useRef(null);
  const frontImageRef = useRef(null);
  const scrollRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.5,
      tablet: {
        smooth: true,
      },
      smartphone: {
        smooth: true,
      },
    });

    locomotiveScroll.on("scroll", ScrollTrigger.update);

    const tl = gsap.timeline();
    tl.from(backImageRef.current, {
      scale: 1.4,
      opacity: 2,
      filter: "grayscale(100%) contrast(1.5)",
      duration: 1.8,
      ease: "power3.out",
    });
    tl.from(
      frontImageRef.current,
      {
        y: "120%",
        rotate: 130,
        duration: 1.2,
        delay: -0.5,
        opacity: 0,
      },
      "-=1"
    );
  }, []);

  return (
    <div
      data-scroll-container
      className="w-full min-h-screen relative "
      ref={scrollRef}
    >
      <div
        ref={indicatorRef}
        className="fixed z-10 flex flex-col items-center gap-3  rounded-full left-[3%] top-1/2 -translate-y-1/2    "
      >
        <span className="text-sm tracking-tight leading-none text-zinc-500  ">
          001
        </span>
        <div className="w-[1px] bg-zinc-400 h-[160px] ">
          <div className="bg-zinc-400 -ml-[5.6px] mt-2 w-3 h-3 rounded-full "></div>
        </div>
        <span className="text-sm tracking-tight leading-none text-zinc-500">
          010
        </span>
      </div>

      <section className=" flex    bg-[#D3D3D3] fixed top-0 left-0 right-0 bottom-0 items-center justify-center h-[100vh]  overflow-hidden ">
        <div className="w-full h-screen flex items-center justify-center relative ">
          <img
            ref={backImageRef}
            className="w-[70%] object-cover opacity-10 "
            src="https://assets.website-files.com/5d3b05ac6e3cf05bd80dd91c/5dac78ab65b2d90ba20df77e_moon-main.svg"
          />
          <img
            ref={frontImageRef}
            className="object-cover  w-[24%] absolute"
            src="https://assets.website-files.com/5d3b05ac6e3cf05bd80dd91c/5db896f221f4f762489b5bc8_hero-render-min.png"
          />
        </div>
      </section>

      <section
        data-scroll-section
        className="w-full h-[100vh]  z-[10] relative "
      ></section>
      <section
        data-scroll-section
        className="h-[100vh] relative  top-0 left-0 w-full z-[10] flex flex-col items-center justify-center"
      >
        <h1 className="text-[#FC8E7B] text-5xl text-center w-[47%] leading-15  font-semibold ">
          Meet Mobile’s Most Revolutionary Lighting Device
        </h1>
        <p className="font-semibold text-zinc-500 text-md w-[39%] mt-8 text-center">
          MOON UltraLight is a new, ultra-portable lighting device designed with
          you in mind. Its intuitive touch controls provide customizable
          brightness and tone, allowing you to perfectly capture your special
          moments.
        </p>
      </section>
      <section
        data-scroll-section
        className="w-full h-[100vh] bg-black  z-[10] relative "
      ></section>
    </div>
  );
};

export default Home;
