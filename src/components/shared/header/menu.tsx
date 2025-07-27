import Link from "next/link";
import { ShoppingCartIcon, UserIcon } from "lucide-react";
import React from "react";
import CartButton from "./cart-button";
import UserButton from "./user-button";

const menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="flex gap-6 w-full">
        <UserButton />
        <CartButton />
      </nav>
    </div>
  );
};

export default menu;
