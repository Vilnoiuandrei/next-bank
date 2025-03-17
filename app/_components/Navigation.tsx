"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";

function Navigation() {
  // For mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="border-b">
      <nav className="z-10 text-xl flex justify-between items-center h-16 tracking-wide px-6 py-4 ">
        <div>
          <Link href="/" className="hover:text-hoverLight transition-colors">
            NextBank
          </Link>
        </div>
        {/* Desktop Navigation */}
        <ul className="md:flex gap-12 items-center justify-between py-4 hidden">
          <li>
            <Link
              href="/about"
              className="hover:text-hoverLight transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className="hover:text-hoverLight transition-colors"
            >
              Account
            </Link>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <button onClick={togglePopup} className="block md:hidden text-2xl">
          ☰
        </button>
        {/* Mobile Navigation */}
        <div
          className={`${
            isOpen ? "opacity-95" : "opacity-0 pointer-events-none"
          } h-screen bg-customDark z-10 absolute top-0 left-0 w-full transition-opacity duration-300`}
        >
          <button
            onClick={togglePopup}
            className="block text-2xl absolute top-0 right-0 mr-10 mt-4"
          >
            ✖
          </button>
          <ul className="flex flex-col gap-16 items-center justify-between mt-28 text-4xl">
            <li>
              <Link
                onClick={togglePopup}
                href="/"
                className="hover:text-hoverLight transition-colors flex items-center gap-1"
              >
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={togglePopup}
                href="/about"
                className="hover:text-hoverLight transition-colors flex items-center gap-1"
              >
                <IoIosInformationCircle />
                About Us
              </Link>
            </li>
            <li>
              <Link
                onClick={togglePopup}
                href="/account"
                className="hover:text-hoverLight transition-colors flex items-center gap-1"
              >
                <MdAccountCircle />
                Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
