import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { FaBell, FaSearch } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import ContactSearch from "./search";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineUser,
} from "react-icons/hi2";

interface DashboardHeaderProps {
  title?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Dashboard",
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const notifpopupRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLButtonElement | null>(null);
  const [showNotifPopup, setShowNotifPopup] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifpopupRef.current &&
        !notifpopupRef.current.contains(event.target as Node) &&
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault(); // Prevent default browser behavior
        setIsSearchOpen(true);
      }

      // Close search on Escape key
      if (event.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  // Handle click on search input
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  // Handle close search
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={handleCloseSearch}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center"
          >
            <ContactSearch onClose={handleCloseSearch} />
          </div>
        </div>
      )}

      <header className="flex items-center justify-between py-[17px] mb-6 border-b-[2px] border-stone-200/60 overflow-x-clip">
        <h2 className="text-xl font-semibold max-md:ml-10">{title}</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="relative max-md:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-main_color focus:border-transparent cursor-pointer"
                onClick={handleSearchClick}
                readOnly
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="flex items-center justify-center h-5 w-8 text-xs text-gray-400 bg-gray-100 rounded">
                  ⌘ K
                </div>
              </div>
            </div>

            <button
              onClick={handleSearchClick}
              className="relative p-2 rounded-lg text-gray-400 hover:text-main_color hidden max-md:flex"
            >
              <span className="sr-only">Notifications</span>
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <button
              ref={notifRef}
              onClick={() => {
                setShowNotifPopup(true);
              }}
              className="relative p-2 rounded-lg text-gray-400 hover:text-main_color"
            >
              <span className="sr-only">Notifications</span>
              <FaBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {showNotifPopup && (
              <div
                ref={notifpopupRef}
                className="absolute top-[150%] right-0 w-[340px] max-md:w-[270px] max-md:right-[-50px] h-[500px] max-h-[70vh] z-30 overflow-y-auto rounded-2xl ring-1 ring-stone-200 bg-white shadow-lg p-1.5"
              >
                <h1 className="text-base font-medium text-left tracking-tight pt-1 pb-2 px-2 border-b border-foubg-main_color/10 text-text-color/80 w-full">
                  Notifications
                </h1>
                <div className="w-full h-fit flex flex-col gap-1 pt-1.5">
                  {[
                    {
                      pfp: "https://i.pinimg.com/236x/5e/6b/47/5e6b47f665725cf33d67cc1a8bbaeec5.jpg",
                      name: "Blessing spot",
                      publishedAt: "24/02/2025",
                      message: "requested a creative service",
                    },
                    {
                      pfp: "https://i.pinimg.com/236x/5e/6b/47/5e6b47f665725cf33d67cc1a8bbaeec5.jpg",
                      name: "Jeff Blessing",
                      publishedAt: "24/02/2025",
                      message:
                        "4 days left to register for exams, the applications are closing on 28th February.",
                    },
                  ].map((annoucement, index) => (
                    <Link
                      to="/"
                      key={index}
                      className="w-full h-fit p-2.5 cursor-pointer hover:bg-stone-200/50 rounded-2xl"
                    >
                      <div className="w-full flex items-start justify-start gap-3">
                        <div
                          className={`size-9 min-w-9 rounded-full aspect-square overflow-hidden bg-main-color-school`}
                        >
                          <img
                            src={annoucement.pfp}
                            className="w-full h-fit min-h-full object-cover rounded-full"
                          />
                        </div>

                        <div className="w-full flex flex-col">
                          <h1 className="text-sm text-text_color/85 line-clamp-3 max-w-[700px]">
                            <strong>{annoucement.name}</strong>&nbsp;&nbsp;
                            {annoucement.message} <br />
                          </h1>
                          <h1 className="text-xs font-normal text-text_color/60 mt-1">
                            2d ago
                          </h1>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* <button className="relative p-2 border rounded-lg text-gray-400 hover:text-gray-500">
            <span className="sr-only">Messages</span>
            <BiMessageDetail className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button> */}

          <div ref={menuRef} className="w-fit h-fit relative">
            <button onClick={() => setShowProfileMenu((prev) => !prev)}>
              <div className="h-8 w-8 rounded-full bg-main_color/10 flex items-center justify-center text-main_color font-medium">
                U
              </div>
            </button>
            {showProfileMenu && (
              <div className="absolute right-0.5 mt-2 w-52 bg-white ring-1 ring-foreground/20 shadow-xl rounded-2xl p-1.5 text-sm z-50">
                <div className="w-full truncate px-3 pt-2 pb-2 text-sm font-normal text-text_color/60">
                  user@gmail.com
                </div>
                <hr className="bg-card-bg mt-1 mb-1 w-[90%] mx-auto" />
                {/* <button className="w-full px-3 py-2 text-left text-text_color/80 hover:text-text_color hover:bg-main_color/10 text-sm flex items-center justify-start gap-2 rounded-xl">
                  <HiOutlineUser className="text-xl" />
                  My Account
                </button> */}
                <button
                  title="logout"
                  className="w-full px-3 py-2 text-left text-red-500 hover:bg-main_color/10 text-sm flex items-center justify-start gap-2 rounded-xl"
                >
                  <HiOutlineArrowRightStartOnRectangle className="text-xl" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
