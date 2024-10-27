"use client"
import { createQueryString } from "@/js/string-utils";
import * as next from "next/navigation";

const useSearchParams = (): [{ [key: string]: any }, (params: { [key: string]: any }) => void] => {
    const searchParams = next.useSearchParams();
    const paramsObject: { [key: string]: string | string[] } = {};
    let item: IteratorResult<[string, string | string[]]>;
    const entries = searchParams.entries();
    while (true) {
        item = entries.next();
        if (item.done) break;
        const [key, value] = item.value;
        const values = (value as string).split(',');
        if (paramsObject[key]) {
            if (Array.isArray(paramsObject[key])) {
                (paramsObject[key] as string[]).push(...values);
            } else {
                paramsObject[key] = [paramsObject[key] as string, ...values];
            }
        } else {
            paramsObject[key] = values.length > 1 ? values : value;
        }
    }
    return [paramsObject, createQueryString];
}
export default useSearchParams;