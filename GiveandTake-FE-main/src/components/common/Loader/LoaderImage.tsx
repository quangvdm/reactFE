
export type ImageType = "square" | "circle";
function LoaderImage({ type = "square" }: { type?: ImageType }) {
    return <div className={`${type === "circle" ? "rounded-full h-[48px] w-[48px]" : "rounded-md h-[60px] w-[60px]"} dark:bg-slate-700 bg-slate-300 aspect-square`}></div>;
}

export default LoaderImage;
