function Title({
  title,
  extraClasses,
}: {
  title: string;
  extraClasses?: string;
}) {
  return (
    <p className={`font-semibold text-gray-900 ${extraClasses}`}>{title}</p>
  );
}

export default Title;
