import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-customDark text-customLight py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Bank</h1>
          <p className="text-lg mb-8">
            Secure and efficient banking services at your fingertips.
          </p>
          <Link
            href="/account"
            className="bg-white text-customDark px-6 py-3 rounded shadow-md"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features & Services */}
      <section className=" mx-auto py-20 bg-customDark2">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="flex justify-around px-6">
          <div className="text-center p-4   ">
            <h3 className="text-xl font-bold mb-2">Savings Accounts</h3>
            <p>Open a savings account with great interest rates.</p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-xl font-bold mb-2">Loans</h3>
            <p>Get personal, auto, or home loans with low rates.</p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-xl font-bold mb-2">Credit Cards</h3>
            <p>Choose from a variety of credit cards to suit your needs.</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="container mx-auto py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>
        <div className="flex justify-around">
          <div className="max-w-md p-4">
            <p className="text-lg italic">
              &quot;This bank has the best customer service!&quot;
            </p>
            <p className="mt-2 text-right">- Happy Customer</p>
          </div>
          <div className="max-w-md p-4">
            <p className="text-lg italic">
              &quot;I love the mobile app. It is so easy to use.&quot;
            </p>
            <p className="mt-2 text-right">- Satisfied User</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-customDark2 text-white py-10">
        <div className="container mx-auto text-center">
          <p className="mb-4">&copy; 2024 NextBank App. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400">
              FAQs
            </a>
          </div>
          <div className="mt-4">
            <a href="#" className="text-gray-400 mx-2">
              Facebook
            </a>
            <a href="#" className="text-gray-400 mx-2">
              Twitter
            </a>
            <a href="#" className="text-gray-400 mx-2">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
