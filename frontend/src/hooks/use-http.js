import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState({});

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios({
                method: requestConfig.method ? requestConfig.method : 'get',
                url: requestConfig.url,
                headers: {
                    Authorization: requestConfig.token ? "Bearer " + requestConfig.token : '',
                },
                data: requestConfig.data ? requestConfig.data : null,
            });

            if (response.statusText !== 'OK') {
                throw new Error('Request Failed');
            }

            const data = await response.data;
            console.log('http-data: ' + data);
            setResponseData(data);
        }
        catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false);
    },[]);

    return {
        isLoading,
        error,
        sendRequest,
        responseData
    }
};

export default useHttp;