import { useSearchParams, usePathname, useRouter } from "next/navigation";
function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handlePageChange = (index: number) => {
    if (index != currentPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", index.toString());
      router.push(pathname + "?" + params.toString());
    }
  };
  let Pagination = <></>;
  if (totalPages > 1) {
    if (totalPages > 7) {
      let firstElipsisAdded = false;
      let secondElipsisAdded = false;
      {
        Pagination = [...Array(totalPages)].map((i, index) => {
          if (
            index < 2 ||
            index > totalPages - 2 ||
            index === currentPage - 1 ||
            index === currentPage + 1 ||
            index === currentPage
          ) {
            return (
              <div
                className={`flex items-center justify-center p-3 rounded cursor-pointer transition hover:bg-secondary ${
                  index + 1 === currentPage && "bg-primary text-white"
                }`}
                onClick={(e) => handlePageChange(index + 1)}
                key={index + 1}
              >
                {index + 1}
              </div>
            );
          } else if (
            !firstElipsisAdded &&
            index >= 2 &&
            index < currentPage - 1
          ) {
            firstElipsisAdded = true;
            return <div key={index}>...</div>;
          } else if (
            !secondElipsisAdded &&
            index <= totalPages - 3 &&
            index > currentPage + 1
          ) {
            secondElipsisAdded = true;
            return <div key={index}>...</div>;
          }
        });
      }
    } else {
      Pagination = (
        <>
          {[...Array(totalPages)].map((i, index) => (
            <div
              onClick={(e) => handlePageChange(index + 1)}
              className={`flex items-center justify-center p-3 rounded cursor-pointer transition hover:bg-secondary ${
                index + 1 === currentPage && "bg-primary text-white"
              }`}
              key={index + 1}
            >
              {index + 1}
            </div>
          ))}
        </>
      );
    }
  }

  return <div className="flex justify-center pt-8 gap-2">{Pagination}</div>;
}

export default Pagination;
