# langgraph-node-js
This repo shows the integration of langgraph with langsmith for debugging along with Google Gemini LLM

langgraph-node-js
This repository demonstrates the integration of LangGraph with LangSmith for debugging, leveraging the Google Gemini LLM within a Node.js environment. It provides a foundational structure for orchestrating AI agents, managing conversational state, and creating dynamic, decision-making pipelines.

🌟 Features
Stateful Agent Orchestration: Build and manage complex conversational flows with stateful agents using LangGraph.

Node.js Integration: Seamlessly integrate powerful AI orchestration capabilities into your Node.js applications.

LangSmith Debugging: Utilize LangSmith for comprehensive tracing, monitoring, and debugging of your LangGraph applications, offering deep insights into agent interactions.

Google Gemini LLM: Leverage the advanced capabilities of Google Gemini for natural language understanding and generation within your AI agents.

Modular Design: A well-structured project that allows for easy extension and customization of agents, tools, and graphs.

Dynamic Decision-Making: Create pipelines where agents can dynamically decide on the next action based on the current state and LLM outputs.

Extensibility: Designed to be easily extended with new agents, tools, and LLMs.

🚀 Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

Installation
Clone the repository:

git clone https://github.com/shdhumale/langgraph-node-js.git
cd langgraph-node-js

Install dependencies:

npm install
# or
yarn install

Environment Variables:

Create a .env file in the root directory and add your API keys:

GOOGLE_API_KEY=your_google_gemini_api_key
LANGCHAIN_API_KEY=your_langsmith_api_key
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=your_langsmith_project_name

Google API Key: Obtain this from the Google Cloud Console or Google AI Studio.

LangSmith API Key: Obtain this from your LangSmith dashboard.

Usage
Run the application:

node index.js

(Replace index.js with your main application file if it's different).

Monitor with LangSmith:
Once the application is running, you can visit your LangSmith dashboard to see the traces and debugging information for your LangGraph runs.

📦 Download
You can download a ZIP archive of this project directly from GitHub:

Download langgraph-node-js.zip

🤝 Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
