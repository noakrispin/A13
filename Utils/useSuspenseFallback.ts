import { useEffect, useState } from 'react';

export function useSuspenseFallback<T>(promise: Promise<T>): T | null {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        promise
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                setError(err);
            });
    }, [promise]);

    if (error) {
        throw error;
    }

    return data;
}
