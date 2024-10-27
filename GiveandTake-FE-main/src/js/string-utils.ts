import removeAccents from 'remove-accents';
declare global {
    interface String {
        removeAccents(): string;
    }
}

String.prototype.removeAccents = function () {
    return removeAccents(this as string);
};

export const createQueryString =
    (params: { [key: string]: any }) => {
        const urlParams = new URLSearchParams(params);
        Object.keys(params).forEach(key => {
            if (params[key] === undefined || params[key] === null || params[key] === '') return;
            urlParams.set(key, params[key]);
        });

        return urlParams.toString();
    }
