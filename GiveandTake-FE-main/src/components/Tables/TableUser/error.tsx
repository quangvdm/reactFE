
function TableError({ error }: { error?: any }) {
    return <div className="h-75 flex flex-col">
        <div className="m-auto">{error.response?.data.message || error.message}</div>
        {process.env.NODE_ENV === "development" && <div className="m-auto">{error?.stack}</div>}
    </div>;
}

export default TableError;
