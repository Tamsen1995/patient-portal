import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to Next.js!</h1>
        <p className="mt-2">
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <div className="mt-4">
          <Link href="/patientList">
            <button className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
              Patient Page
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
