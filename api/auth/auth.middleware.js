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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rawHeader = req.headers.authorization || req.headers.Authorization;
    const token = rawHeader === null || rawHeader === void 0 ? void 0 : rawHeader.split(" ")[1];
    if (!token)
        return res.status(401).send("Unauthorized");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.accessSecret);
        req.id = decoded.id;
        next();
    }
    catch (error) {
        return res.status(403).send("Forbidden");
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map