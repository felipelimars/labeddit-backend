"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const UserBusiness_1 = __importDefault(require("../business/UserBusiness"));
const UserDatabase_1 = __importDefault(require("../database/UserDatabase"));
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const TokenManager_1 = require("../services/TokenManager");
const userRouter = express_1.default.Router();
const userController = new UserController_1.default(new UserBusiness_1.default(new UserDatabase_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new TokenManager_1.TokenManager()));
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map