import React from "react";
import { Play } from "lucide-react";
import { PiPlugsConnectedFill, PiUserFill } from "react-icons/pi";
import { BiLogoGmail } from "react-icons/bi";
import { HiDocument, HiLockClosed } from "react-icons/hi2";
import { IoToggle } from "react-icons/io5";
import { BsCheckLg, BsFillPatchCheckFill } from "react-icons/bs";

const opportunities = [
  { title: "Junior Web Developer at CodeNest", match: "Skills match." },
  { title: "Marketing Assistant at BrightPath", match: "Relevant experience." },
  { title: "IT Support Trainee at TechEase", match: "Profile fit." },
  { title: "Content Writer at InkWave", match: "Good match." },
];
const Notifications = [
  {
    title: "Content Writer at InkWave",
    status: "accepted!",
    feedback: "Send a short writing sample.",
    time: "now",
  },
  {
    title: "Junior Web Developer at CodeNest",
    status: "accepted!",
    feedback: "You're in! Interview on Monday.",
    time: "18:34",
  },
  {
    title: "Marketing Assistant at BrightPath",
    status: "rejected!",
    feedback: "Needs stronger campaign work.",
    time: "17:50",
  },
  {
    title: "IT Support Trainee at TechEase",
    status: "rejected!",
    feedback: "Missing a key certification.",
    time: "16:12",
  },
];

const steps = [
  {
    number: "1",
    title: "Create Your Profile",
    description: "Upload your CV, certificates, and fill out one form",
    image: (
      <div className="relative h-full w-full bg-white/5 flex flex-col gap-2 px-4 pt-4 rounded-2xl">
        <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-main_color to-transparent "></div>
        <h1 className="mb-4 mt-2 text-sm font-semibold text-center w-full">
          Create Account
        </h1>
        <div className="w-full flex items-center justify-start gap-3 py-2.5 px-3 rounded-xl bg-white/10 text-sm font-medium">
          <PiUserFill />
          Name
        </div>
        <div className="w-full flex items-center justify-start gap-3 py-2.5 px-3 rounded-xl bg-white/10 text-sm font-medium">
          <BiLogoGmail />
          Email
        </div>
        <div className="w-full flex items-center justify-start gap-3 py-2.5 px-3 rounded-xl bg-white/10 text-sm font-medium">
          <HiDocument />
          CV
        </div>
        <div className="w-full flex items-center justify-start gap-3 py-2.5 px-3 rounded-xl bg-white/10 text-sm font-medium">
          <HiLockClosed />
          Password
        </div>
      </div>
    ),
  },
  {
    number: "2",
    title: "We Match You",
    description: "Our system finds the best-fit opportunities for you",
    image: (
      <div className="relative h-full w-full flex flex-col gap-2 rounded-2xl">
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-main_color to-transparent" />
        {opportunities.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex items-start gap-3 py-2 px-3 rounded-2xl bg-white/10 text-sm font-medium"
          >
            <PiPlugsConnectedFill className="mt-2 text-2xl mx-1" />
            <div className="flex-1">
              <p className="break-all line-clamp-1 pr-4 text-sm">
                {item.title}
              </p>
              <p className="text-xs text-white/65 pt-0.5">
                Matched: {item.match}
              </p>
            </div>
            <IoToggle className="text-3xl" />
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "3",
    title: "We Apply for You",
    description: "We handle manual applications to save you time",
    image: (
      <div className="relative bg-white/10 w-full h-full rounded-2xl py-7 px-4 flex flex-col items-center text-center gap-1">
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-main_color to-transparent" />
        <div className="relative w-fit h-fit opacity-85">
          <BsFillPatchCheckFill className="text-6xl text-white mb-3 animate-slow-spin" />
          <BsCheckLg className="text-3xl stroke-[1px] -translate-y-1.5 -translate-x-0.5 text-main_color bg-white absolute top-0 left-0 bottom-0 right-0 m-auto" />
        </div>
        <h1 className="font-semibold text-lg">Application Sent</h1>
        <p className="text-sm leading-5 mb-3">
          Application auto-submitted, <br /> We’ll keep you updated.
        </p>
        <button
          disabled
          className="w-full py-2 mt-2 rounded-xl bg-white font-medium text-main_color"
        >
          OK
        </button>
      </div>
    ),
  },
  {
    number: "4",
    title: "Feedback after rejection",
    description: "Just update your docs and kep apply for you",
    image: (
      <div className="relative h-full overflow-hidden w-full flex flex-col gap-2">
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-main_color to-transparent z-20" />
        {Notifications.map((item, idx) => (
          <div
            key={idx}
            className="w-full flex items-start gap-3 py-2 pl-3 rounded-2xl z-10 bg-white/10 text-sm font-medium"
          >
            <div className="size-10 min-w-10 bg-white opacity-75 -z-10 overflow-hidden p-2.5 rounded-full mt-1">
              <img src="./3.png" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pt-1">
              <p className="break-all capitalize line-clamp-1 pr-4 text-xs">
                {item.status}
              </p>

              <p className="break-all line-clamp-1 pr-4 pt-0.5 text-xs">
                {item.title}
              </p>

              <p className="text-xs text-white/65 pt-0.5">
                {item.feedback}
              </p>
              <p className="text-xs text-white/65 pt-2 pb-1 w-full text-end">
                {item.time}
              </p>
            </div>
            <p></p>
          </div>
        ))}
      </div>
    ),
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-main_color text-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-br from-white/10 to-white/5 text-white rounded-xl text-sm font-medium mb-6">
            How it works
          </div>
          <h2 className="text-5xl font-medium mb-6">
            4 Steps to Success
          </h2>
          <p className="text-base max-w-[600px] text-white/80 mx-auto">
            From profile creation to landing your dream opportunity—we've simplified every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-4 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative backdrop-blur-sm rounded-[25px] p-[2px] bg-gradient-to-b from-white/10 via-white/5 to-main_color shadow-2xl shadow-black/10"
            >
              <div className="flex flex-col gap-1 justify-center h-full rounded-[24px] bg-main_color p-6">
                <div className="max-h-64 overflow-hidden flex-1 mb-2 flex items-center justify-center">
                  {step.image}
                </div>
                <div className="flex items-start gap-2 mb-1 flex-col">
                  <div className="bg-white/10 size-7 rounded-full flex items-center justify-center text-sm text-white/80 font-medium">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold ">{step.title}</h3>
                </div>
                <p className=" text-sm text-white/80">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
