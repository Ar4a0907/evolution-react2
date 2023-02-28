import React from "react";

interface UseRequest<R> {
    response: R | Error | null;
    isLoading: boolean;
    makeRequest: () => void;
}

export function isResponseError<R>(response: R | Error | null): response is Error {
    return response instanceof Error;
}

export function useRequest<Response>(request: () => Promise<Response>): UseRequest<Response> {
    const [response, setResponse] = React.useState<Response | Error | null >(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const makeRequest = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await request();
            setResponse(result);
        } catch (error) {
            console.log(`Request failed: ${error}`);
            setResponse(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [request]); // include request in the dependency array

    return {
        response,
        isLoading,
        makeRequest,
    };
}
