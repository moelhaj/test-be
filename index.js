"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const api_1 = __importDefault(require("./api"));
const auth_middleware_1 = require("./api/auth/auth.middleware");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.get("/file/:filename", auth_middleware_1.auth, (req, res) => {
    const filename = req.params.filename;
    const filepath = path_1.default.join(__dirname, "/src/" + "/../../uploads/", filename);
    fs_1.default.access(filepath, fs_1.default.constants.F_OK, err => {
        if (err) {
            return res.status(404).send("File not found");
        }
        res.sendFile(filepath);
    });
});
app.use("/api/v1", api_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "../", "client", "build", "index.html")));
}
else {
    app.get("/", (req, res) => {
        res.send("Please set to production");
    });
}
app.use((err, req, res, next) => {
    console.log(err);
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "500 Internal Server Error";
    res.status(statusCode).send(err);
    next();
});
app.listen(config_1.default.port, () => console.log(`Server started on port ${config_1.default.port}`));
//# sourceMappingURL=index.js.map