"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countries_1 = __importDefault(require("./api/countries"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "API",
        data: {
            version: "16.1",
        },
    });
});
router.use("/countries", countries_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map