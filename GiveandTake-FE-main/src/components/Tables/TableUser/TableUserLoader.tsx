import LoaderAction from "@/components/common/Loader/LoaderAction";
import LoaderMainContent from "@/components/common/Loader/LoaderMainContent";
import LoaderStatus from "@/components/common/Loader/LoaderStatus";
import LoaderSubContent from "@/components/common/Loader/LoaderSubContent";

function TableUserLoader({ count }: { count: number }) {

    return Array.apply(null, Array(count)).map((_, key) => (
        <div
            className={`grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark`}
            key={key}
        >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <LoaderMainContent withImage="circle" line={0} />
            </div>
            <div className="flex items-start justify-center p-2.5 xl:p-5 flex-col">
                <LoaderSubContent line={2} />
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 ">
                <LoaderSubContent line={3} />
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <LoaderStatus />
            </div>
            <div className="items-center justify-center p-2.5 flex xl:p-5">
                <LoaderAction number={3} />
            </div>
        </div>
    ));
}

export default TableUserLoader;
