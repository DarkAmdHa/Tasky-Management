import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

function UserDetails() {
  const hasNotification = true;
  return (
    <div className="flex gap-2 items-center justify-center">
      <Link
        href="/user"
        className={clsx("relative", {
          "before:absolute before:w-5 before:h-5 before:rounded-full before:bg-primary before:bottom-2 before:right-0 before:border-2 before:border-white":
            hasNotification === true,
        })}
      >
        <div className="rounded-full shadow-lg border-8 border-slate-100 overflow-hidden w-30 transition hover:shadow-xl">
          <Image
            src="https://picsum.photos/100"
            width={100}
            height={100}
            className="rounded"
            alt=""
          />
        </div>
      </Link>

      <Link href="/user">
        <p className="text-gray-900 font-semibold">Hamid Tahir</p>
        <p className="text-gray-500 text-sm font-semibold">
          Front-end Developer
        </p>
      </Link>
    </div>
  );
}

export default UserDetails;
