import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.Gemini_api_key
});

export async function testAI() {
   model.invoke("What is capital of INDIA?").then((response)=>{
    console.log(response.text);
   })
    
}