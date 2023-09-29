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
Object.defineProperty(exports, "__esModule", { value: true });
exports.askPdf = void 0;
const dotenv = __importStar(require("dotenv"));
const CustomPDFLoader_1 = require("../utils/CustomPDFLoader");
dotenv.config();
const chains_1 = require("langchain/chains");
const embeddings_1 = require("langchain/embeddings");
const llms_1 = require("langchain/llms");
const text_splitter_1 = require("langchain/text_splitter");
const vectorstores_1 = require("langchain/vectorstores");
const askPdf = (question) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const model = new llms_1.OpenAI({ maxTokens: 1000, temperature: 0.1 });
        const loader = new CustomPDFLoader_1.CustomPDFLoader("lootheroes.pdf");
        const doc = yield loader.load();
        const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({ chunkSize: 1000 });
        const docs = yield textSplitter.splitDocuments(doc);
        const vectorStore = yield vectorstores_1.HNSWLib.fromDocuments(docs, new embeddings_1.OpenAIEmbeddings());
        const qaChain = chains_1.VectorDBQAChain.fromLLM(model, vectorStore);
        const answer = yield qaChain.call({
            input_documents: docs,
            query: "You are a helpful AI bot for Loot Heroes. " + question,
        });
        console.log(answer.text);
        return answer.text;
    }
    catch (e) {
        console.log(e);
    }
});
exports.askPdf = askPdf;
//main();
//# sourceMappingURL=ask-pdf.js.map