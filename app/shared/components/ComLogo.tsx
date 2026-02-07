import { getBrandInfo } from "@/lib/social";
import Image from "next/image";
import Link from "next/link";

export const ComLogo =async () => {

   const brandInfoRaw = await getBrandInfo();

  return (
    <Link href="/" className="inline-block">
      <div className="hover:cursor-pointer">
        <Image
          src={brandInfoRaw?.data?.logo || "/placeholder.svg"}
          alt={brandInfoRaw?.data?.name || "Crab fashion"}
          width={150}
          height={150}
          className="w-32"
        />
      </div>
    </Link>
  );
};
