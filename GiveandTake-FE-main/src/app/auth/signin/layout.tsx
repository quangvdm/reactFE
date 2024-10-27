import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In To Give&Take",
    description: "Sign in page",
};
export default function layout({ children, ...props }: Readonly<{ children: React.ReactNode; }>) {
    return <div>{children}</div>;
}