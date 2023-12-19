import Link from "next/link";

function Button({
  link,
  round,
  extraClasses,
  disabled,
  children,
}: {
  link?: string;
  extraClasses?: string;
  round?: boolean;
  disabled?: boolean;
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
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
