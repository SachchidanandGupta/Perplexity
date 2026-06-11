import "dotenv/config";
import readline  from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage} from "langchain";

const model = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const messageHistory = [];
while(true){
    const inputQuestion = await rl.question("user:");
        messageHistory.push(new HumanMessage(inputQuestion));
    const response = await model.invoke(messageHistory);
    messageHistory.push(response);
    console.log(response.text);
}

rl.close();