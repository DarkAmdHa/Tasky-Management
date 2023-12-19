import React from "react";
import Nav from "@/app/ui/Nav";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="max-w-7xl m-auto pt-3 min-h-[90vh] flex items-center justify-center">
        <div className="bg-white rounded-lg h-full w-full max-w-lg mt-5 mb-5 p-10 flex items-center justify-center  shadow-lg">
          {children}
        </div>
      </main>
    </>
  );
}

export default layout;
