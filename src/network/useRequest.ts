import React from "react";

interface UseRequest<R> {
    response: R | Error | null;
    isLoading: boolean;
    makeRequest: () => void;
}

export function isResponseError<R>(response: R | Error | null): response is Error {
    return response instanceof Error;
}

// todo: implement a hook that would help Bob to use the network
// this hook should help to keep track on request status,
// return response or error depending on the result of request

export function useRequest<Response>(request: () => Promise<Response>): UseRequest<Response> {
    const [response, setResponse] = React.useState<Response | null>(null);
    const makeRequest = React.useCallback(async () => {
        const result = await request();

        setResponse(result);
    }, []);

    // interface should be kept as is, implement only functionality
    return {
        response: response,
        isLoading: false,
        makeRequest: makeRequest,
    };
}
