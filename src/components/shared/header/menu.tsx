import Link from "next/link";
import { ShoppingCartIcon, UserIcon } from "lucide-react";
import React from "react";

const menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="flex gap-6 w-full">
        <Link href="/">
          <UserIcon />
          <span>Sign In</span>
        </Link>
        <Link href="/">
          <ShoppingCartIcon />
        </Link>
      </nav>
    </div>
  );
};

export default menu;
