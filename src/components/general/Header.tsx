import Image from "next/image";
import Link from "next/link";
import React from "react";


const Header = () => {
  return (
    <header className="mb-5 mt-2 flex items-center justify-start px-5 py-2">
      <Link href={"/"} className="w-[100px]">
        <Image src={"/logos/logo_1.png"} alt="Logo" width={130} height={130} className="w-full" />
      </Link>
    </header>
  );
};

export default Header;
