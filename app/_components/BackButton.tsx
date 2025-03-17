import Link from "next/link";
import { IoChevronBackCircle } from "react-icons/io5";

export default function BackButton() {
  return (
    <div className=" absolute top-0 left-0 mt-4 ml-4">
      <Link
        href="/account"
        className="hover:text-hoverLight transition-colors flex items-center gap-1"
      >
        <IoChevronBackCircle />
        Back
      </Link>
    </div>
  );
}
