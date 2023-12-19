import Link from "next/link";
import Button from "@/app/ui/Button";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
function Upsell() {
  return (
    <div className="rounded-2xl bg-tertiary py-5 px-5 flex items-center flex-col gap-2 text-center mt-auto">
      <WrenchScrewdriverIcon width={50} className="text-primary" />
      <p className="font-bold text-gray-600 mb-2">
        Premium for more creativity
      </p>
      <Button link="/premium">Get 3 months free</Button>
    </div>
  );
}

export default Upsell;
