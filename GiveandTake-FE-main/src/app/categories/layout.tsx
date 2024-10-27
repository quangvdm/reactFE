import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories page",
};

function Layout({ children }: Readonly<React.PropsWithChildren<{}>>) {
  return <div>{children}</div>;
}

export default Layout;
