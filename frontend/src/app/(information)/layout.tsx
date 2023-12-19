import Nav from "@/app/ui/Nav";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}

export default layout;
