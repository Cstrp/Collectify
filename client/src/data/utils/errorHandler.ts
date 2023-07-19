import { AxiosError } from "axios";

export interface ErrorResponse {
  message: string;
  status?: number;
  data?: { message: string } | undefined;
}

export const errorHandler = (error: (AxiosError & ErrorResponse) | unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return {
        message:
          (error.response.data as ErrorResponse).message ||
          "Something went wrong",
        status: error.response.status,
        data: error.response.data as ErrorResponse,
      };
    } else if (error.request) {
      return { message: "Request failed: no response received" };
    } else {
      return { message: error.message || "Something went wrong" };
    }
  }
};
