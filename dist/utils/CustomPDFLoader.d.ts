/// <reference types="node" />
import { Document } from 'langchain/document';
import { BaseDocumentLoader } from 'langchain/document_loaders';
export declare abstract class BufferLoader extends BaseDocumentLoader {
    filePathOrBlob: string | Blob;
    constructor(filePathOrBlob: string | Blob);
    protected abstract parse(raw: Buffer, metadata: Document['metadata']): Promise<Document[]>;
    load(): Promise<Document[]>;
}
export declare class CustomPDFLoader extends BufferLoader {
    parse(raw: Buffer, metadata: Document['metadata']): Promise<Document[]>;
}
