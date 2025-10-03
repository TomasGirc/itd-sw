"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface FooterItem {
  name: string;
  href: string;
}

interface PersonLayoutProps {
  title: string;
  backLink: string;
  leftSection: ReactNode;
  rightSection: ReactNode;
  footerTitle?: string;
  footerItems?: FooterItem[];
}

export default function DataLayout({
  title,
  backLink,
  leftSection,
  rightSection,
  footerTitle,
  footerItems,
}: PersonLayoutProps) {
  return (
    <div className="h-full star-background rounded-xl shadow-lg bg-black border border-yellow-600 hover:shadow-yellow-500 transition-shadow duration-300 flex flex-col">
      {/* Header */}
      <div className="flex-none border-b border-yellow-600 pb-2 h-[10%]">
        <Link href={backLink} className="text-yellow-400 hover:underline ml-4">
          &larr; Back to list
        </Link>
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 text-center font-starjedi">
          {title}
        </h1>
      </div>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-yellow-600 h-[70%]">
        <div
          id="left-section"
          className="flex justify-center items-center border-yellow-600 border-r"
        >
          {leftSection}
        </div>
        <div
          id="right-section"
          className="space-y-2 flex justify-center items-center flex-col"
        >
          {rightSection}
        </div>
      </div>

      {/* Footer */}
      {footerItems && footerItems.length > 0 && footerTitle && (
        <div id="footer" className="flex-none h-auto p-6">
          <p className="text-xl text-yellow-400 border-yellow-600 pt-2">
            <span className="font-semibold">{footerTitle}:</span>{" "}
            {footerItems.map((item, index) => (
              <Link key={index} href={item.href} className="hover:underline">
                {item.name}
                {index < footerItems.length - 1 ? ", " : ""}
              </Link>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
