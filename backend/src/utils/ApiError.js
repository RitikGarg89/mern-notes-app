class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = "",
        name = "ApiError"
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.stack = stack;
        this.name = name;
    }
}