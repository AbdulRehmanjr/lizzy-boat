"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";

interface BreadCrumb {
  path: string;
  href: string;
}

const BreadCrumbs: FC = () => {
  const [navHistory, setNavHistory] = useState<BreadCrumb[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const storedHistory = localStorage.getItem("breadcrumbHistory");
    if (storedHistory) {
      setNavHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    const pathArray = pathname.split("/").filter((path) => path);
    const currentBreadcrumb: BreadCrumb = {
      path: pathArray[pathArray.length - 1] || "hello",
      href: pathname,
    };

    setNavHistory((prevHistory) => {
      const exists = prevHistory.some(
        (breadcrumb) => breadcrumb.href === currentBreadcrumb.href,
      );
      if (exists) return prevHistory;

      const updatedHistory = [...prevHistory, currentBreadcrumb];
      localStorage.setItem("breadcrumbHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, [pathname]);

  const handleBreadcrumbClick = (href: string) => {
    setNavHistory((prevHistory) => {
      const index = prevHistory.findIndex(
        (breadcrumb) => breadcrumb.href === href,
      );
      const updatedHistory = prevHistory.slice(0, index + 1);
      localStorage.setItem("breadcrumbHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const formatBreadcrumbText = (text: string) => {
    if (text.includes("-")) {
      return text
        .split("-")
        .map(
          (part) =>
            part.trim().charAt(0).toUpperCase() +
            part.trim().slice(1).toLowerCase(),
        )
        .join(" ");
    } else {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
  };

  return (
    <>
      <nav className="mx-auto px-6 py-6">
        <ol className="inline-flex min-w-max max-w-full flex-wrap justify-center p-2 will-change-contents">
          {navHistory.slice(1).map((breadcrumb, index) => (
            <li
              className="flex items-center text-xs md:text-lg sm:text-base font-semibold text-[#6a9fad]"
              key={index}
            >
              <Link
                className={pathname === breadcrumb.href ? "text-[#1f788b]" : ""}
                href={breadcrumb.href}
                onClick={() => handleBreadcrumbClick(breadcrumb.href)}
              >
                {formatBreadcrumbText(breadcrumb.path)}
              </Link>
              {index < navHistory.length - 2 && (
                <span className="mx-2">{" > "}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default BreadCrumbs;
