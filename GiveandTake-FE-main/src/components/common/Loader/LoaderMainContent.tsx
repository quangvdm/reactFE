import LoaderImage, { ImageType } from "@/components/common/Loader/LoaderImage";
import LoaderSubContent from "@/components/common/Loader/LoaderSubContent";

function LoaderMainContent({ withImage, line = 1 }: Readonly<{ withImage?: ImageType, line?: number }>) {
    return <>
        {withImage && <LoaderImage type={withImage} />}
        <div className="w-70">
            <div className="rounded-full bg-slate-300  dark:bg-slate-700 h-4 w-[75%] mb-2"></div>
            <LoaderSubContent line={line} />
        </div>
    </>;
}

export default LoaderMainContent;
