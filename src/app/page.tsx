import Location from "@/components/location";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";

export default function Home() {
  return (
    <div className="text-[#4c4f69] dark:text-[#cdd6f4]">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <Location />
    </div>
  );
}
