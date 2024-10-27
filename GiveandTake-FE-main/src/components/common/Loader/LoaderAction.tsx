
function LoaderAction({ number }: { number: number }) {
    return <div className="flex items-center space-x-3.5">
        {Array.from({ length: number }).map((_, index) => (
            <p key={index} className="inline-flex rounded-full bg-slate-300  dark:bg-slate-700 w-4 h-4"></p>
        ))}
    </div>;
}

export default LoaderAction;
