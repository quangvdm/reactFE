import LoaderAction from "@/components/common/Loader/LoaderAction";
import LoaderMainContent from "@/components/common/Loader/LoaderMainContent";
import LoaderSubContent from "@/components/common/Loader/LoaderSubContent";

function TableDonationLoader() {
    return Array.of(1, 2, 3).map((_, key) => (
        <div
            className="animate-pulse grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={_}
        >
            <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
                    <LoaderMainContent withImage={"square"} />
                </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
                <LoaderSubContent />
            </div>
            <div className="col-span-1 flex items-center">
                <LoaderSubContent />

            </div>
            <div className="col-span-1 flex items-center">
                <LoaderSubContent />
            </div>
            <div className="col-span-1 flex items-center text-xs gap-2">
                <LoaderSubContent />
            </div>
            <div className="flex items-center justify-center space-x-3.5">
                <LoaderAction number={3} />
            </div>
        </div>
    )
    );
}

export default TableDonationLoader;
