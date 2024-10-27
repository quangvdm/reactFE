import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reports",
  description: "Reports",
};
export default function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
