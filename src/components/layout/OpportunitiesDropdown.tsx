import React from "react";
import { Link } from "react-router-dom";
import { categoryData, iconMap } from "@/data/categories";
import { LucidePlayCircle } from "lucide-react";
import { FaPlay } from "react-icons/fa";

const OpportunitiesDropdown = () => {
  return (
    <div className="fixed mx-auto max-w-[1340px] rounded-2xl bg-white inset-x-0 top-[70px] bg-background/95 backdrop-blur-lg border">
      <div className="h-full max-h-[calc(65vh-4rem)] p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Categories grid */}
          <div className="col-span-8">
            <div className="grid grid-cols-3 gap-1">
              {categoryData.map((category) => {
                const IconComponent = iconMap[category.iconName];
                return (
                  <Link
                    key={category.title}
                    to={`/opportunities?category=${encodeURIComponent(
                      category.title
                    )}`}
                    className="group flex items-start px-4 py-3 rounded-xl hover:bg-main_color/5 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`shrink-0 h-fit w-fit p-2 rounded-xl bg-white ring-1 ring-stone-200/60`}
                      >
                        <IconComponent className="size-6 min-w-6 stroke-[1.2px]" />
                      </div>
                      <div>
                        <div className="font-medium group-hover:text-main_color transition-colors">
                          {category.title}
                        </div>
                        <p className="text-sm text-text_color/60 mt-0.5">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Featured section */}
          <div className="h-full col-span-4 border-l pl-4 overflow-hidden">
            <div className="h-full p-5 bg-accent rounded-xl flex flex-col">
              <h3 className="font-semibold text-base">How it works</h3>
              <p className="text-sm text-text_color/60 max-w-[70%]">
                Learn how to use applyonce.
              </p>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                className="mt-4 flex-1 w-full overflow-hidden rounded-md relative group"
              >
                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-tr from-black/20 to-transparent flex items-center justify-center flex-col gap-0 text-white">
                  <div className="bg-main_color size-12 p-1 flex items-center backdrop-blur-sm justify-center rounded-full group-hover:scale-110 transition">
                    <FaPlay className="text-xl ml-1 text-white stroke-[1px]" />
                  </div>
                  <img
                    src="/youtube.png"
                    className="absolute bottom-4 left-4 h-5 opacity-85 "
                  />
                </div>
                <img
                  src="./work_from_home.png"
                  className="w-full h-48 object-cover object-center"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesDropdown;
