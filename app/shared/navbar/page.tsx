import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import { getCategories, getMarquee } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import MarqueeText from "../components/marquee";
import { getBrandInfo } from "@/lib/social";
import Link from "next/link";
import { NavBarMenu } from "../components/navBarMenu";
import AccountDropdown from "../components/AccountDropdown";

const Navbar = async () => {
  const getAllCategories = await getCategories();
  const brandInfoRaw = await getBrandInfo();
  const marqueeText = await getMarquee();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
  };

  return (
    <header className="w-full bg-white">
      <div className="max-w-full bg-white">
        <div className="border-b border-gray-300">
          <div className="text-center mx-auto">
            <ComLogo />
          </div>
          <div className="max-w-7xl mx-auto px-4 flex flex-row gap-4 lg:gap-0 justify-between items-center py-5">
            <div className="hidden md:block">
              <HeaderSearchBar
                categories={getAllCategories.data}
                name={brandInfo.name}
                phone={brandInfo.phone}
              />
            </div>
            <div className="flex items-center gap-x-5">
              <BookCard />
              <div>
                <NavBarMenu />
              </div>
              <div className="block md:hidden">
                <AccountDropdown />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-300 shadow-md">
          <MenuNavbar categories={getAllCategories.data} />
        </div>
        <div className="bg-white border-b border-gray-300 shadow-md">
          <MarqueeText text={marqueeText?.data?.text} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
