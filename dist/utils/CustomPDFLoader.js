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
exports.CustomPDFLoader = exports.BufferLoader = void 0;
const promises_1 = require("fs/promises");
const document_1 = require("langchain/document");
const document_loaders_1 = require("langchain/document_loaders");
// this loader is copied from https://github.com/mayooear/gpt4-pdf-chatbot-langchain/blob/main/utils/customPDFLoader.ts
class BufferLoader extends document_loaders_1.BaseDocumentLoader {
    constructor(filePathOrBlob) {
        super();
        this.filePathOrBlob = filePathOrBlob;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let buffer;
            let metadata;
            if (typeof this.filePathOrBlob === 'string') {
                buffer = yield (0, promises_1.readFile)(this.filePathOrBlob);
                metadata = { source: this.filePathOrBlob };
            }
            else {
                buffer = yield this.filePathOrBlob
                    .arrayBuffer()
                    .then((ab) => Buffer.from(ab));
                metadata = { source: 'blob', blobType: this.filePathOrBlob.type };
            }
            return this.parse(buffer, metadata);
        });
    }
}
exports.BufferLoader = BufferLoader;
class CustomPDFLoader extends BufferLoader {
    parse(raw, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pdf } = yield PDFLoaderImports();
            const parsed = yield pdf(raw);
            return [
                new document_1.Document({
                    pageContent: parsed.text,
                    metadata: Object.assign(Object.assign({}, metadata), { pdf_numpages: parsed.numpages }),
                }),
            ];
        });
    }
}
exports.CustomPDFLoader = CustomPDFLoader;
function PDFLoaderImports() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // the main entrypoint has some debug code that we don't want to import
            const { default: pdf } = yield Promise.resolve().then(() => __importStar(require('pdf-parse/lib/pdf-parse.js')));
            return { pdf };
        }
        catch (e) {
            console.error(e);
            throw new Error('Failed to load pdf-parse. Please install it with eg. `npm install pdf-parse`.');
        }
    });
}
//# sourceMappingURL=CustomPDFLoader.js.map