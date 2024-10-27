
function LoaderSubContent({ line = 1 }: Readonly<{ line?: number }>) {

    if (line === 0) return <></>;
    if (line === 1) return <div className="rounded-full bg-slate-300  dark:bg-slate-700 h-3 w-[90%]"></div>;
    if (line === 2) return <div className="block w-full">
        <div className="rounded-full bg-slate-300  dark:bg-slate-700 h-3 w-[75%] my-2"></div>
        <div className="rounded-full bg-slate-300  dark:bg-slate-700 h-3 w-[90%] my-2 " ></div>
    </div>;

    return <div className="w-full">
        {
            Array(line).fill(null).map((i, key) => {
                if (key == 0) return <div key={key} className="rounded-full bg-slate-300  dark:bg-slate-700 h-3 w-[75%] my-2"></div>;
                if (key == 1) return <div key={key} className="rounded-full bg-slate-300  dark:bg-slate-700 h-3 w-[87%] my-2"></div>;
                return <div key={key} className="rounded-full bg-slate-300  dark:bg-slate-700 h-3 w-[90%] my-2 "></div>;
            })
        }
    </div>
        ;
}

export default LoaderSubContent;
