import React from "react";

export type HeadTailConfig = {
    typeHead?: "transparent" | "normal",
    typeTail?: "transparent" | "normal",
}
export type TextAreaProps = {
    className?: string,
    label?: string,
    name: string,
    description?: React.ReactNode,
    head?: React.ReactNode,
    tail?: React.ReactNode
    config?: HeadTailConfig
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    invalid?: boolean
    disabled?: boolean
    data?: any
    placeholder?: string
    rows?: number
    cols?: number
}

function TextArea({ className, label, name, description, head, tail, data, config = {
    typeHead: "transparent",
    typeTail: "transparent"
}, onChange, rows = 4, cols = 50, ...others }: Readonly<TextAreaProps>) {

    const { typeHead, typeTail } = config;
    return (
        <div className={`${className} custom-textarea`}>
            {label && <label htmlFor={name} className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>}
            <div className="textarea-group flex justify-between transition-all">
                {head && <div className={`textarea-group-item ${typeHead}`}>{head}</div>}
                <textarea
                    name={name}
                    id={name}
                    value={data ? data[name] : ''}
                    onChange={onChange}
                    rows={rows}
                    cols={cols}
                    className={`${className} w-full flex max-h-full rounded bg-transparent px-5 py-3 text-black outline-none 
                                 dark:bg-form-input dark:text-white  
                                disabled:text-opacity-50 disabled:cursor-default disabled:bg-whiter`}
                    {...others}
                />
                {tail && <div className={`textarea-group-item ${typeTail}`}>{tail}</div>}
            </div>
            {description && <div>{description}</div>}
        </div>
    );
}

export default TextArea;