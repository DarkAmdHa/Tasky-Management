import Link from "next/link";

function Button({
  link,
  onClick,
  round,
  extraClasses,
  children,
}: {
  link?: string;
  onClick?: () => {};
  extraClasses?: string;
  round?: boolean;
  children: React.ReactNode;
}) {
  if (link)
    return (
      <Link
        className={`bg-primary text-white font-bold py-2 px-2 text-sm shadow transition hover:shadow-lg ${
          round ? "rounded-full" : "rounded-lg"
        } ${extraClasses}`}
        href={link}
      >
        {children}
      </Link>
    );

  return (
    <button
      className={`bg-primary text-white font-bold py-2 px-2 text-sm shadow transition hover:shadow-lg ${
        round ? "rounded-full" : "rounded-lg"
      } ${extraClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
