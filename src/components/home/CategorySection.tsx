import {
  ArrowRight,
  Briefcase,
  Building,
  LineChart,
  Lock,
  PenTool,
  UserSearch,
  Wallet,
} from "lucide-react";
import { MdChevronRight } from "react-icons/md";
import {
  PiAirplaneTakeoff,
  PiBuilding,
  PiCoins,
  PiGraduationCap,
  PiHandshake,
  PiMicrophoneStage,
  PiMoneyWavyLight,
  PiStudent,
  PiToolbox,
  PiUsersThree,
} from "react-icons/pi";

const categories = [
  {
    title: "Scholarships",
    jobs: "58 Available",
    icon: <PiStudent size={24} />,
  },
  { title: "Grants", jobs: "48 Jobs Available", icon: <PiCoins size={24} /> },
  {
    title: "Interneship",
    jobs: "78 Available",
    icon: <PiBuilding size={24} />,
  },
  {
    title: "felowship",
    jobs: "120 Available",
    icon: <PiUsersThree size={24} />,
  },
  {
    title: "Competitions",
    jobs: "90 Available",
    icon: <PiMicrophoneStage size={24} />,
  },
  { title: "Workshops", jobs: "31 Available", icon: <PiToolbox size={24} /> },
  {
    title: "Studies abroad",
    jobs: "52 Available",
    icon: <PiAirplaneTakeoff size={24} />,
  },
  { title: "Volunteer", jobs: "80 Available", icon: <PiHandshake size={24} /> },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-[#f7f9f9]">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-medium text-foreground/85">
            One platform Many Solutions
          </h2>
          <a
            href="#"
            className="text-main_color text-sm font-medium flex items-center gap-1"
          >
            See All Opportunities
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {categories.map((category) => (
            <a
              key={category.title}
              href="#"
              className="flex items-center gap-4 p-2 rounded-2xl border border-stone-200/70 bg-white hover:border-main_color/40 hover:bg-main_color/10 group transition-all duration-300"
            >
              <div className="flex items-center justify-center size-[48px] rounded-xl bg-[#f7f9f9] text-main_color group-hover:bg-main_color/80 transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                {category.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{category.title}</h3>
                <p className="text-xs text-main_color font-medium">{category.jobs}</p>
              </div>
              <div className="ml-auto px-1">
                <MdChevronRight
                  size={20}
                  className="text-gray-400 group-hover:text-main_color"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
