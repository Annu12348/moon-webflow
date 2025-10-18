import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const backImageRef = useRef(null);
  const frontImageRef = useRef(null);
  const scrollRef = useRef(null);
  const indicatorRef = useRef(null);
  const sectionmobileRef = useRef(null);

  useEffect(() => {
    //first section
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

    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locomotiveScroll.scrollTo(value, 0, 0)
          : locomotiveScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());
    ScrollTrigger.refresh();

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

    //second section
    // parent div ka height
    gsap.to("#scroll-Line", {
      y: 142,
      ease: "none",
      scrollTrigger: {
        trigger: scrollRef.current,
        scroller: scrollRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.fromTo(
      indicatorRef.current, // kis element par animation karna hai
      { x: -100, opacity: 0 }, // starting position (hidden, left side)
      {
        x: 0, // end position (slide in)
        opacity: 1, // visible
        ease: "power2.out", // smooth easing
        scrollTrigger: {
          trigger: ".text-section", // kis section par scroll hone par animation chalega
          scroller: scrollRef.current, // Locomotive scroll ka scroller element
          start: "top center", // jab section ka top viewport ke center tak aayega
          endTrigger: ".last-section", // animation end last section ke center pe
          end: "center center", // jab section ka bottom center tak pahunch jaaye
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.from(".textSectionRef", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      scrollTrigger: {
        trigger: ".text-section",
        scroller: scrollRef.current,
        start: "top 80%",
      },
    });

    // Animate the third section to rotate and scale as user scrolls,
    // after the fixed section is out of view (normal scrolling resumes)
    // Pehle scale karo 5 se 1 tak, fir uske baad rotation 0 se 90deg tak
    // Step 1: Scale animation
    gsap.fromTo(
      sectionmobileRef.current,
      {
        scale: 5,
        rotate: 0,
      },
      {
        scale: 1,
        rotate: 0, // Pehle sirf scale
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionmobileRef.current,
          scroller: scrollRef.current,
          start: "top center",
          end: "center center", // Animation half section tak chalegi
          scrub: true,
        },
      }
    );
    // Step 2: Rotation animation after scale is done
    gsap.fromTo(
      sectionmobileRef.current,
      {
        rotate: 0,
        scale: 1,
      },
      {
        rotate: 90,
        scale: 1, // scale ko 1 pe hi rakho
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionmobileRef.current,
          scroller: scrollRef.current,
          start: "center center", // scale complete hote hi rotate start
          end: "bottom center", // end of section pe 90deg ho jaaye
          scrub: true,
        },
      }
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
        className="fixed z-40 flex flex-col items-center gap-3  rounded-full left-[3%] top-1/2 -translate-y-1/2 opacity-0    "
      >
        <span className="text-sm tracking-tight leading-none text-zinc-500  ">
          001
        </span>
        <div className="w-[1px] bg-zinc-400 h-[140px] ">
          <div
            id="scroll-Line"
            className="bg-zinc-400 -ml-[5.6px] mt-2 w-3 h-3 rounded-full "
          ></div>
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
        className="text-section h-[100vh] relative  top-0 left-0 w-full z-[10] flex flex-col items-center justify-center"
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
        className=" w-full flex items-center justify-center h-[100vh] bg-[#070707] z-[10] relative"
      >
        <img
          ref={sectionmobileRef}
          className="w-[37%]  h-[40%] object-cover"
          src="https://assets.website-files.com/5d3b05ac6e3cf05bd80dd91c/5daf566b5d7dc95fd39e8c97_phone-case-light-1-min-p-800.png"
          alt="Moon UltraLight Off"
        />
      </section>
      

      <section
        data-scroll-section
        className="  w-full h-[100vh] bg-[#BE5A49]  z-[10] relative "
      ></section>
      <section
        data-scroll-section
        className="last-section  w-full h-[100vh] bg-[#ad827a]  z-[10] relative "
      ></section>
      <section
        data-scroll-section
        className="w-full h-[100vh] bg-[#BE5A49]  z-[10] relative "
      ></section>
    </div>
  );
};

export default Home;