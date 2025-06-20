import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {  StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { config } from "dotenv";

config()
// Define tools
const multiply = tool(
  async ({ a, b }) => {
    return (a * b).toString();
  },
  {
    name: "multiply",
    description: "Multiply two numbers together",
    schema: z.object({
      a: z.coerce.number().describe("first number"),
      b: z.coerce.number().describe("second number"),
    }),
  }
);

const add = tool(
  async ({ a, b }) => {
    return (a + b).toString();
  },
  {
    name: "add",
    description: "Add two numbers together",
    schema: z.object({
      a: z.coerce.number().describe("first number"),
      b: z.coerce.number().describe("second number"),
    }),
  }
);

const divide = tool(
  async ({ a, b }) => {
    if (b === 0) {
      return "Error: Cannot divide by zero.";
    }
    return (a / b).toString();
  },
  {
    name: "divide",
    description: "Divide two numbers",
    schema: z.object({
      a: z.coerce.number().describe("first number"),
      b: z.coerce.number().describe("second number"),
    }),
  }
);

// Augment the LLM with tools
const tools = [add, multiply, divide];
const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const gemini_api_key = process.env.GEMINI_API_KEY;
const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash-latest", // Using "gemini-1.5-flash-latest" or a specific preview like "gemini-1.5-flash-preview-0514"
    apiKey: gemini_api_key,
    maxOutputTokens: 2048,
  });


const llmWithTools = model.bindTools(tools);

// Nodes
async function llmCall(state) {
    // LLM decides whether to call a tool or not
    const result = await llmWithTools.invoke([
      {
        role: "system", // Explicitly instruct the LLM to use the tools
        content: "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
      },
      ...state.messages
    ]);
  
    return {
      messages: [result]
    };
  }

  const toolNode = new ToolNode(tools);

// Conditional edge function to route to the tool node or end
function shouldContinue(state) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  // If the LLM makes a tool call, then perform an action
  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

  // Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
.addNode("llmCall", llmCall)
.addNode("tools", toolNode)
// Add edges to connect nodes
.addEdge("__start__", "llmCall")
.addConditionalEdges(
  "llmCall",
  shouldContinue,
  {
    // Name returned by shouldContinue : Name of next node to visit
    "Action": "tools",
    "__end__": "__end__",
  }
)
.addEdge("tools", "llmCall")
.compile();

// Invoke
const messages = [{
role: "user",
content: "Add 3 and 4 then multiple it by 10 and then divide the result by 7"
}];
const result = await agentBuilder.invoke({ messages });
console.log(result.messages);
  