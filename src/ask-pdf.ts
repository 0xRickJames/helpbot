import * as dotenv from "dotenv";
import { CustomPDFLoader } from "../utils/CustomPDFLoader";
dotenv.config();

import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores";

export const askPdf = async (question: string) => {
  try {
    const model = new OpenAI({ maxTokens: 1000, temperature: 0.1 });

    const loader = new CustomPDFLoader("lootheroes.pdf");
    const doc = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

    const docs = await textSplitter.splitDocuments(doc);

    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    const qaChain = VectorDBQAChain.fromLLM(model, vectorStore);

      const answer = await qaChain.call({
        input_documents: docs,
        query: "You are a helpful AI bot for Loot Heroes. " + question,
      });
      console.log(answer.text);
      return answer.text;


  } catch (e) {

    console.log(e)
  }
};

//main();
