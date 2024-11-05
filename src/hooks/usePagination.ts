import { useMemo, useState } from "react";

export const usePagination = <T>({
    arr,
    pageSize,
}: {
    arr: T[];
    pageSize: number;
}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const chunkedArray = useMemo(() => {
        return chunkArray<T>(arr, pageSize);
    }, [arr]);

    const chunk = useMemo(() => {
        return chunkedArray[currentPage];
    }, [chunkedArray, currentPage]);

    return {
        chunk,
        currentPage,
        pageCount: chunkedArray.length,
        setCurrentPage
    };
};

function chunkArray<T>(array: T[], size: number) {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }

    return result;
}
