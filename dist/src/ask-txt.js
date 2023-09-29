"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.main = void 0;
const console_1 = __importDefault(require("console"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs = __importStar(require("fs"));
const chains_1 = require("langchain/chains");
const embeddings_1 = require("langchain/embeddings");
const llms_1 = require("langchain/llms");
const text_splitter_1 = require("langchain/text_splitter");
const vectorstores_1 = require("langchain/vectorstores");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const model = new llms_1.OpenAI({ maxTokens: 1000, temperature: 0.1 });
    const text = fs.readFileSync("tesla.txt", "utf8");
    const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = yield textSplitter.createDocuments([text]);
    const vectorStore = yield vectorstores_1.HNSWLib.fromDocuments(docs, new embeddings_1.OpenAIEmbeddings());
    const qaChain = chains_1.VectorDBQAChain.fromLLM(model, vectorStore);
    const questions = [
        "What is the company's core business?",
        "What are the key products or services offered by the company?",
        "Who are the company's main competitors?",
        "What are the primary markets and target customers for the company?",
        "What are the most significant risks faced by the company?",
        "How is the company mitigating these risks?",
        "What potential industry-wide or macroeconomic risks could affect the company's performance?",
        "What are the key financial and operational highlights from the past year?",
        "What is the management's outlook on the company's future performance?",
        "What are the main drivers of growth for the company?",
        "How does the company plan to address any operational or financial challenges?",
        "How has the company's revenue and net income changed over the past few years?",
        "What are the main sources of the company's cash flow?",
        "How does the company's debt and equity structure compare to industry benchmarks?",
        "Are there any significant changes in the company's assets or liabilities?",
        "Does the company have effective internal controls in place?",
        "Were there any material weaknesses identified in the internal control system?",
        "Did the auditors issue an unqualified or qualified opinion on the company's financial statements?",
        "Were there any concerns or discrepancies noted by the auditors?",
        "Are there any ongoing or pending legal proceedings involving the company?",
        "How might these legal proceedings impact the company's financial position?",
        "What is the compensation structure for the company's top executives?",
        "Are the executive compensation packages tied to company performance or stock prices?",
        "How does the company's financial performance compare to its historical performance?",
    ];
    const answers = yield Promise.all(questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
        const answer = yield qaChain.call({
            input_documents: docs,
            query: "You are a financial analyst for Tesla. " + question,
        });
        return "\n\n> " + question + "\n" + answer.text;
    })));
    console_1.default.log(answers.join("\n"));
});
exports.main = main;
(0, exports.main)();
//# sourceMappingURL=ask-txt.js.map