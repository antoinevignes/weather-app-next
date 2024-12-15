import Location from "@/components/location";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";

export default function Home() {
  return (
    <div className="text-[#4c4f69] dark:text-[#cdd6f4] bg-gradient-to-b from-[#e6e9ef] to-[#dce0e8] dark:from-[#181825] dark:to-[#11111b]">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <Location />
    </div>
  );
}
