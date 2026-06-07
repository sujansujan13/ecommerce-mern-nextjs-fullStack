import React from "react";

export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-[#ffe9e6]">
      <div className="w-full  p-6"> {children}</div>
    </div>
  );
}
