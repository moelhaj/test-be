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
const joi_1 = __importDefault(require("joi"));
const validate = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const fileSchema = joi_1.default.object({
                name: joi_1.default.string().required(),
                url: joi_1.default.string().required(),
                tags: joi_1.default.array().items(joi_1.default.string()).required(),
                type: joi_1.default.string().required(),
                userId: joi_1.default.string().required(),
            });
            const file = {
                name: req.body.name,
                url: req.body.url,
                tags: req.body.tags,
                type: req.body.type,
                userId: req.body.userId,
            };
            yield fileSchema.validate(req.body);
            req.body = file;
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(422).send("validation error");
        }
    });
};
exports.default = validate;
//# sourceMappingURL=files.validation.js.map