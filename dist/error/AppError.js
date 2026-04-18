//./src/error/AppError.ts
export class AppError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
//# sourceMappingURL=AppError.js.map