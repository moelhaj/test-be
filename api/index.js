"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const files_route_1 = __importDefault(require("./files/files.route"));
const router = express_1.default.Router();
router.use("/auth", auth_route_1.default);
router.use("/files", files_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map