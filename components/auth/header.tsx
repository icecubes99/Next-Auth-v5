import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Image src={"/kupler.svg"} width={150} height={150} alt="Kupler" />
      {/* <h1 className={cn("text-3xl font-semibold", font.className)}>Kupler Industries</h1> */}
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export default Header;
