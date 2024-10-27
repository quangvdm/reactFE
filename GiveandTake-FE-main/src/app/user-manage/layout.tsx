import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Manage",
  description: "User manage page",
};

function Layout({ children }: Readonly<React.PropsWithChildren<{}>>) {
  return <div>{children}</div>;
}

export default Layout;
