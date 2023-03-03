"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_soure_1 = require("./src/data-soure");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
data_soure_1.AppDataSource.initialize().then(() => {
    console.log('database connected');
});
app.use((0, cors_1.default)());
app.use(express_1.default.static('./public'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(3000, () => {
    console.log('Server is running on port 8000');
});
//# sourceMappingURL=index.js.map