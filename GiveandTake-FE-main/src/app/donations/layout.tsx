import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Donations",
    description: "Donations page",

};

function Layout({ children }: Readonly<React.PropsWithChildren<{}>>) {
    return <div>{children}</div>;
}

export default Layout;
