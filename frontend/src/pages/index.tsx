import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to our Patient Portal!</h1>

        <div className="mt-4">
          <Link href="/patient-list">
            <button className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
              View The Patient List
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
