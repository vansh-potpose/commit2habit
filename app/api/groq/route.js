import { reqGroqAI } from "../../libs/utils/groq.js";

export async function POST(req) {
  const data = await req.json();
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  try {
    const chatCompletion = await reqGroqAI(data.content);
    return Response.json({
      content: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" });
  }
}

// import { reqGroqAI } from "../../libs/utils/groq.js";

// export async function POST(req) {
//   // Check if the method is POST, otherwise return 405 Method Not Allowed
//   if (req.method !== "POST") {
//     return new Response(JSON.stringify({ message: "Only POST requests are allowed" }), { status: 405 });
//   }

//   try {
//     // Parse the incoming request body
//     const data = await req.json();

//     // Ensure that content is present in the request body
//     if (!data.content || typeof data.content !== 'string') {
//       return new Response(JSON.stringify({ message: "Invalid request body: 'content' is required and must be a string" }), { status: 400 });
//     }

//     // Call the Groq AI request function with the provided content
//     const chatCompletion = await reqGroqAI(data.content);

//     // Return the content of the AI-generated report
//     return new Response(JSON.stringify({
//       content: chatCompletion.choices[0]?.message?.content || "",
//     }), { status: 200 });
//   } catch (error) {
//     console.error("Error during chat completion:", error);

//     // Return detailed error messages to help with debugging
//     return new Response(JSON.stringify({
//       message: "Internal Server Error",
//       details: error.message,
//     }), { status: 500 });
//   }
// }
