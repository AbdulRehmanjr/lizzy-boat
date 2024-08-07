import Image from "next/image";
import Link from "next/link";
import React from "react";


const Header = () => {
  return (
    <header className="mb-5 mt-10 flex items-center justify-center px-5 py-2">
      <Link href={"/"}>
        <Image src={"/logos/logo_1.png"} alt="Logo" width={130} height={130} />
      </Link>
    </header>
  );
};

export default Header;
