interface ResponseFormatType {
  statusCode: number;
  message: string;
  data: any | undefined;
}

class ResponseFormat implements ResponseFormatType {
  statusCode: number;
  message: string;
  data: any | undefined;

  constructor(data: any, message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  public static build(data: any, message: string) {
    return new ResponseFormat(data, message, 200);
  }

  public static buildWithData(data: object) {
    return new ResponseFormat(data, 'success', 200);
  }

  public static buildWithMessage(message: string, statusCode: number) {
    return new ResponseFormat(undefined, message, statusCode);
  }

  public static buildWithMessageAndStatusCode(
    message: string,
    statusCode: number,
  ) {
    return new ResponseFormat(undefined, message, statusCode);
  }

  public static buildWithErrorMessage(
    errorMessage: string = 'Internal Server Error',
    statusCode: number = 500,
  ) {
    return new ResponseFormat(undefined, errorMessage, statusCode);
  }
}

export default ResponseFormat;
