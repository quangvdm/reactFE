import React from "react";

export type HeadTailConfig = {
    typeHead?: "transparent" | "normal",
    typeTail?: "transparent" | "normal",
    type?: "text" | "email" | "password"
}
export type InputProps = {
    className?: string,
    label?: string,
    name: string,
    description?: React.ReactNode,
    head?: React.ReactNode,
    tail?: React.ReactNode
    config?: HeadTailConfig
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    invalid?: boolean
    disabled?: boolean
    data?: any
    placeholder?: string
}

function Input({ className, label, name, description, head, tail, data, config = {
    typeHead: "transparent",
    typeTail: "transparent"
}, onChange, ...others }: Readonly<InputProps>) {

    const { typeHead, typeTail } = config;
    return (
        <div className={className + " custom-input "}>
            {label && <label htmlFor={name} className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>}
            <div className="input-group flex justify-between transition-all   ">
                {head && <div className={`input-group-item ${typeHead}`}>{head}</div>}
                <input
                    type={config?.type ?? 'text'}
                    name={name}
                    id={name}
                    value={data ? data[name] : ''}
                    onChange={onChange}
                    className="w-full rounded  bg-transparent px-5 py-3 text-black outline-none 
                                 dark:bg-form-input dark:text-white  
                                disabled:text-opacity-50 disabled:cursor-default disabled:bg-whiter"
                    {...others}
                />
                {tail && <div className={`input-group-item ${typeTail}`}>{tail}</div>}

            </div>
            {description && <div>{description}</div>}
        </div>
    );
}

export default Input;
