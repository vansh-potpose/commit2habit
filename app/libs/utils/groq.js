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


// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
// });

// export const reqGroqAI = async (content) => {
//   const input = `provide me a json only (without any text above or below it for description just json and also analyse the reasons of failing the habits) report in the following format by analysing the given data:{ ... }`; // your existing input string
  
//   // Function to make the API request
//   const makeRequest = async () => {
//     try {
//       const res = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "user",
//             content: input,
//           },
//         ],
//         model: "llama-3.2-90b-vision-preview",
//       });

//       // If the rate limit is exceeded (status 429), retry after the specified time
//       if (res.status === 429) {
//         const retryAfter = res.headers.get('retry-after') || 30; // Default to 30 seconds if retry-after is missing
//         console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds...`);
        
//         // Wait for the retry duration and then retry the request
//         await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
//         return makeRequest(); // Retry the request
//       }

//       if (!res.ok) {
//         // Handle non-429 errors gracefully
//         throw new Error(`Groq API request failed with status: ${res.status}`);
//       }

//       // Extract the raw response text and clean it
//       const responseText = await res.text();
      
//       // Clean the response text to remove any extra descriptions or text like "Here is the output json"
//       const cleanedResponse = responseText.replace(/^(.*?{)/, '{').replace(/}.*$/, '}'); // Strip out unwanted prefix or suffix text

//       // Parse the cleaned response as JSON
//       const jsonResponse = JSON.parse(cleanedResponse);

//       return jsonResponse;
//     } catch (error) {
//       console.error("Error during Groq API request:", error);
//       throw new Error("Unable to retrieve data from Groq API due to an unexpected error");
//     }
//   };

//   // Call the makeRequest function
//   return await makeRequest();
// };
