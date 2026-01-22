'use client'
import { useEffect, useRef, useState } from "react";
import ImageKitMedia from "./ImageKitMedia";

export default function Search() {

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
    ref={containerRef}
    className={`flex items-center gap-2 rounded-full border-[2px] px-4 py-2 transition
      ${isFocused ? "border-iconBlue" : "border-borderGray"}`}
    onClick={() => setIsFocused(true)}
  >
      <label htmlFor="search" className="cursor-pointer">
        <ImageKitMedia
          src="icons/explore.svg"
          alt="search"
          type="image"
          width={16}
          height={16}
          
        />
      </label>
      <input
        type="text"
        id="search"
        placeholder="search"
        name="search"
        className="bg-transparent flex-1   text-white outline-none"
      />
    </div>
  );
}
