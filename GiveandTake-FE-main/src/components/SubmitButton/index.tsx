import SubmitLoader from "@/components/common/SubmitLoader";
import React from "react";

function SubmitButton({ content, loading, className }: React.PropsWithChildren<{
    content: string,
    loading: boolean,
    className?: string
}>) {
    return (
        <button
            className={className + ` rounded-lg border border-primary bg-primary p-4 disabled:bg-opacity-70 disabled:border-opacity-70 disabled:hover:bg-opacity-70
                 text-white transition hover:bg-opacity-90`}
            disabled={loading}
            type="submit">
            <SubmitLoader content={content} loading={loading} />
        </button>);
}

export default SubmitButton;
