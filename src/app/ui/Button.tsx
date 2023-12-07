import Link from "next/link";

function Button({
  link,
  onClick,
  children,
}: {
  link: string;
  onClick?: () => {};
  children: React.ReactNode;
}) {
  if (link)
    return (
      <Link
        className="bg-primary text-white font-bold py-2 px-2 text-sm shadow transition hover:shadow-lg rounded-lg"
        href={link}
      >
        {children}
      </Link>
    );

  return <button onClick={onClick}>{children}</button>;
}

export default Button;
