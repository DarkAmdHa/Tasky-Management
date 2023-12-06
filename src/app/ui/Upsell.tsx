import Link from "next/link";
import Button from "@/app/ui/Button";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
function Upsell() {
  return (
    <div className="rounded-lg bg-tertiary py-10 px-5 flex items-center flex-col text-center">
      <WrenchScrewdriverIcon width={50} />
      <p className="font-bold text-lg">Premium for more creativity</p>
      <Button link="/premium">Get 3 months free</Button>
    </div>
  );
}

export default Upsell;
