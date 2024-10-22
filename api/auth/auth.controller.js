"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.refresh = exports.register = exports.login = void 0;
const services = __importStar(require("../users/users.services"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = require("bcryptjs");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    const user = yield services.findByEmail(email);
    if (!user || !(yield (0, bcryptjs_1.compare)(password, user.password)))
        return res.status(400).send("Wrong Credentials");
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.accessSecret, {
        expiresIn: config_1.default.accessSecretExpiresIn,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.refreshSecret, {
        expiresIn: config_1.default.refreshSecretExpiresIn,
    });
    return res.status(200).send({ user, accessToken, refreshToken });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const isUserExist = yield services.findByEmail(email);
    if (isUserExist)
        return res.status(400).send("User already exist");
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const user = yield services.create({ email, password: hashedPassword, name });
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.accessSecret, {
        expiresIn: config_1.default.accessSecretExpiresIn,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.refreshSecret, {
        expiresIn: config_1.default.refreshSecretExpiresIn,
    });
    return res.status(201).send({ user, accessToken, refreshToken });
});
exports.register = register;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.refreshSecret);
        const user = yield services.findById(decoded.id);
        if (!user)
            return res.status(400).send("User not found");
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.accessSecret, {
            expiresIn: config_1.default.accessSecretExpiresIn,
        });
        return res.status(200).send({ accessToken });
    }
    catch (error) {
        return res.status(403).send("Forbidden");
    }
});
exports.refresh = refresh;
//# sourceMappingURL=auth.controller.js.map