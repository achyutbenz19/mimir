import { config } from "@/app/config";
import Groq from "groq-sdk";
import { traceable } from "langsmith/traceable";

const groq = new Groq();

export const answerEngine = traceable(
  async (query: string) => {
    async function rephraseInput(inputString: string) {
      const groqResponse = await groq.chat.completions.create({
        model: config.inferenceModel,
        messages: [
          {
            role: "system",
            content:
              "You are a rephraser and always respond with a rephrased version of the input that is given to a search engine API. Always be succinct and use the same words as the input. ONLY RETURN THE REPHRASED VERSION OF THE INPUT.",
          },
          { role: "user", content: inputString },
        ],
      });
      return groqResponse.choices[0].message.content;
    }

    async function searchEngineForSources(message: string) {
      const rephrasedMessage = await rephraseInput(message);
      if (config.searchEngine === "BRAVE") {
        const response = await fetch(
          `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(
            rephrasedMessage,
          )}&count=1`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "gzip",
              "X-Subscription-Token": process.env
                .BRAVE_SEARCH_API_KEY as string,
            },
          },
        );
        return response.json();
      } else {
        const data = JSON.stringify({ q: rephrasedMessage });
        const response = await fetch("https://google.serper.dev/search", {
          method: "POST",
          headers: {
            "X-API-KEY": process.env.SERPER_API_KEY!,
            "Content-Type": "application/json",
          },
          body: data,
        });
        return response.json();
      }
    }

    const docs = await searchEngineForSources(query);
    if (!docs) {
      return "Please obtain an API key to enable the search functionality.";
    }

    let sources = JSON.stringify(docs);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `- Here is my query "${query}", only respond back with the answer in ONE SENTENCE. Never mention the system message.`,
        },
        {
          role: "user",
          content: `RETURN ANSWER IN ONE SENTENCE ONLY. ${sources}.`,
        },
      ],
      model: config.inferenceModel,
    });
    return chatCompletion.choices[0].message.content;
  },
  { name: "answerEngine" },
);
