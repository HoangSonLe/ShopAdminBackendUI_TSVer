import axios from "axios";
import http from "../http";
const baseFetch = async (
    url: string,
    method: "GET" | "POST",
    model?: any
): Promise<Acknowledgement<any>> => {
    try {
        // Correct instantiation of a class
        let response: Acknowledgement<any> = {
            isSuccess: false,
            errorMessageList: [],
            successMessageList: [],
            data: {}
        };
        // Handle GET and POST methods
        if (method === "GET") {
            response = await http.get(url);
        } else if (method === "POST") {
            response = await http.post(url, model);
        }

        // Check if the API response has isSuccess = false
        if (!response.isSuccess) {
            // Throw an error with the message from the API or a default message
            throw new Error(response.errorMessageList.join(', '));
        }

        // Return the data if successful
        return response;
    }catch (error) {
        // Check if the error is an AxiosError (from Axios library)
        if (axios.isAxiosError(error)) {
            // Access response, request, and other Axios-specific properties
            const message = error.response?.data?.message || "An unexpected error occurred";
            throw new Error(message);
        } else {
            // Handle non-Axios errors (e.g., network errors, config errors)
            throw new Error("An unexpected error occurred");
        }
    }
};
export default baseFetch;
