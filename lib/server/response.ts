export type ActionResponseType<T> = {
  data?: T;
  message?: string;
  statusCode?: number;
  status?: "success" | "error";
};

export class ActionResponse {
  static success<T>(params: ActionResponseType<T>): ActionResponseType<T> {
    return {
      data: params.data,
      message: params.message,
      statusCode: params.statusCode,
      status: "success",
    };
  }
  static error<T>(params: ActionResponseType<T>): ActionResponseType<T> {
    return {
      data: params.data,
      message: params.message,
      statusCode: params.statusCode,
      status: "error",
    };
  }
}
