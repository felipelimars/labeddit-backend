"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestError_1 = require("../errors/BadRequestError");
const User_1 = __importDefault(require("../models/User"));
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, tokenManager) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userDatabase.findUserByEmail(input.email);
            if (userDB) {
                throw new BadRequestError_1.BadRequestError("E-mail já cadastrado.");
            }
            const newId = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(input.password);
            const newUser = new User_1.default(newId, input.username, input.email, hashedPassword);
            yield this.userDatabase.createUser(newUser.toUserDB());
            const payload = {
                id: newId
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userDatabase.findUserByEmail(input.email);
            if (!userDB) {
                throw new BadRequestError_1.BadRequestError("E-mail não cadastrado.");
            }
            const user = new User_1.default(userDB.id, userDB.username, userDB.email, userDB.password);
            const plaintext = input.password;
            const hash = user.getPassword();
            const isPasswordCorrect = yield this.hashManager.compare(plaintext, hash);
            if (!isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError("Senha incorreta.");
            }
            const payload = {
                id: user.getId()
            };
            const token = this.tokenManager.createToken(payload);
            const output = {
                token
            };
            return output;
        });
    }
}
exports.default = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map