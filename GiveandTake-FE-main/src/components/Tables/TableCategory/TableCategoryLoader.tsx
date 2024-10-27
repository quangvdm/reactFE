import LoaderAction from "@/components/common/Loader/LoaderAction";
import LoaderMainContent from "@/components/common/Loader/LoaderMainContent";
import LoaderStatus from "@/components/common/Loader/LoaderStatus";
import LoaderSubContent from "@/components/common/Loader/LoaderSubContent";

function TableCategoryLoader() {
    return Array.of(1, 2, 3).map((index) => (
        <tr key={index} className="animate-pulse">
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                <LoaderMainContent />
            </td>

            <td className="border-b border-[#3b2f2f] px-4 py-5 dark:border-strokedark max-w-[200px]">
                <p className="line-clamp-2"><LoaderSubContent /></p>
            </td>

            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <LoaderStatus />
            </td>

            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <LoaderAction number={3} />
            </td>
        </tr>
    )
    );
}

export default TableCategoryLoader;
