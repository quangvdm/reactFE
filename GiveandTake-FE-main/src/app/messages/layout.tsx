import MessageSideBar from "@/app/messages/MessageSideBar";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Messages",
    description: "Messages page",

};

export default function layout({ children }: any) {
    return <DefaultLayout>
        <div className="mx-auto h-[calc(100vh-80px)] max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Breadcrumb pageName="Messages" />
            <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
                <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
                    <div className="hidden h-full flex-col xl:flex xl:w-1/4">
                        <MessageSideBar />
                    </div>
                    <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
                        {children}
                    </div>
                </div>
            </div>
        </div >
    </DefaultLayout>;
}
