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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.join(__dirname, "../.env") });
const envSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid("development", "production").required(),
    PORT: joi_1.default.number().default(3500),
    DATABASE_URL: joi_1.default.string().required(),
    ACCESS_SECRET: joi_1.default.string().required(),
    ACCESS_SECRET_EXPIRES_IN: joi_1.default.string().required(),
    REFRESH_SECRET: joi_1.default.string().required(),
    REFRESH_SECRET_EXPIRES_IN: joi_1.default.string().required(),
})
    .unknown();
const { value: envVars, error } = envSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const config = {
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    databaseURL: envVars.DATABASE_URL,
    accessSecret: envVars.ACCESS_SECRET,
    accessSecretExpiresIn: envVars.ACCESS_SECRET_EXPIRES_IN,
    refreshSecret: envVars.REFRESH_SECRET,
    refreshSecretExpiresIn: envVars.REFRESH_SECRET_EXPIRES_IN,
};
exports.default = config;
//# sourceMappingURL=config.js.map