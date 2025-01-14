import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export const reqGroqAI = async (content) => {
    let input=`provide me a json only (without any text above or below it for description just json and also analyse the reasons of failing the habits) report in the following format by analysing the given data:{
  "report": {
    "overallProgress": {
      "trend": "Description of overall performance trend over the period.",
      "highlights": {
        "bestDay": "Date with the highest performance and score.",
        "lowestDay": "Date with the lowest performance and score."
      },
      "note": "Any significant observation about the overall trend."
    },
    "habits": [
      {
        "name": "Habit Name",
        "description": "Brief description of the habit.",
        "performance": {
          "consistency": "Summary of how consistent the habit was over the period.",
          "completionStats": {
            "fullyCompleted": "Number of days the habit was fully completed.",
            "partiallyCompleted": "Number of days the habit was partially completed.",
            "notCompleted": "Number of days the habit was not completed."
          },
          "bestDay": "Date and performance on the best day.",
          "lowestDay": "Date and performance on the lowest day."
        },
        "observations": "Any additional insights or trends about the habit.",
        "recommendations": [
          "Actionable recommendation to improve or maintain the habit."
        ]
      }
    ],
    "summary": {
      "observations": [
        "Key takeaways about the user's overall performance and habits."
      ],
      "recommendations": [
        "Actionable suggestions for overall improvement."
      ]
    }
  }
}

}. now from here  there is data you have to analyse and provide the report in the above format consider all habits.: 
`+content;

  const res = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
    model: "llama-3.2-90b-vision-preview",
  });
  return res;
};