"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input} from "@heroui/react";
import HeaderAuth from "@/components/header-auth";
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default  function Header() {


  return (
      <Navbar shouldHideOnScroll className="pb-2 border-b-2 border-gray-200">
        <div className="flex justify-between items-center w-screen">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Input placeholder="Search" className="mt-2" />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <HeaderAuth />
        </NavbarContent>
      </div>
    </Navbar>
  );
}
