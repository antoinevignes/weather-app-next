import Location from "@/components/location";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";

export default function Home() {
  return (
    <div>
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <Location />
    </div>
  );
}
