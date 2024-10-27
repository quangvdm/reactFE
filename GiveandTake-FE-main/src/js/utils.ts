

export function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

let timeoutId: ReturnType<typeof setTimeout>;
export const debounce = (fn: Function, ms = 300) => {
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};