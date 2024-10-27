
function SubmitLoader({ content = "Text", loading = true }: React.PropsWithChildren<{ content?: string, loading?: boolean }>) {
    return (
        <div className="flex items-center justify-center relative m-auto">
            {loading &&
                <div className="animate-spin rounded-full border-2 border-solid border-whiter border-t-transparent absolute h-8 w-8"></div>
            }
            <div className={loading ? "opacity-0" : ""}>{content}</div>
        </div>);
}

export default SubmitLoader;
