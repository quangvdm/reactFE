import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rewards",
    description: "Rewards page",

};

export default function layout({ children }: any) {
    return <DefaultLayout>
        <Breadcrumb pageName="Rewards" />
        <div className="gap-9 flex">
            {children}
        </div >
    </DefaultLayout>;
}
