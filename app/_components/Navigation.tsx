import Link from "next/link";

function Navigation() {
  return (
    <header className="border-b">
      <nav className="z-10 text-xl flex justify-between  items-center h-16">
        <div className="px-6 py-4">
          <Link href="/" className="hover:text-hoverLight transition-colors ">
            NextBank
          </Link>
        </div>
        <ul className="flex gap-12 items-center justify-between py-4">
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
      </nav>
    </header>
  );
}

export default Navigation;
