import React from "react";

function HalfStar({ className = "", size = "1rem" }) {
  return (
    <svg
      viewBox="0 0 13 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-2.5 ${className}`}
    >
      <path d="M13 0L13 9.16718V10.7156L13 13.2669V14.8328L13 17.349L4.96556 24L8.03444 14.8328L0 9.16718H9.93111L13 0Z" />
    </svg>
  );
}

export default HalfStar;
