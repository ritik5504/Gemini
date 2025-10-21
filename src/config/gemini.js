import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC1_7kCzeNSxI847-VCkufOpmjxYNQLyd0"; 
const genAI = new GoogleGenerativeAI(apiKey);

async function main(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
    const result = await model.generateContent(prompt);
    return result.response.text();
    
  } catch (error) {
    console.error("Error using Gemini API:", error);
    return null;
  }
}

export default main;
