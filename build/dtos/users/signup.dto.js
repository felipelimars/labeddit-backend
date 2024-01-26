"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupSchema = zod_1.default.object({
    username: zod_1.default.string().min(2),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4)
}).transform(data => data);
//# sourceMappingURL=signup.dto.js.map