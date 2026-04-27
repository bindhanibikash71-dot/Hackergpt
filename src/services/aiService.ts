const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const MODEL = "mistralai/Mistral-7B-Instruct-v0.1";

export async function chatWithMistral(prompt: string, history: { role: string; content: string }[]) {
  if (!HUGGINGFACE_API_KEY) {
    throw new Error("Missing Hugging Face API Key. Please add VITE_HUGGINGFACE_API_KEY to your secrets.");
  }

  // Refusal logic for illegal hacking (simple local check)
  const forbiddenPatterns = [/how to hack/, /hack password/, /steal data/, /ddos attack/, /infiltrate network/i];
  if (forbiddenPatterns.some(pattern => pattern.test(prompt.toLowerCase()))) {
    return "ACCESS DENIED. HackerGPT is restricted to educational cybersecurity learning. I cannot assist with illegal or malicious activities.";
  }

  try {
    const formattedHistory = history.map(h => `[${h.role === 'user' ? 'INST' : 'AI'}] ${h.content}`).join('\n');
    const fullPrompt = `${formattedHistory}\n[INST] ${prompt} [/INST]`;

    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false,
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch from Hugging Face");
    }

    const result = await response.json();
    return result[0]?.generated_text?.trim() || "No response received.";
  } catch (err) {
    console.error("AI Service Error:", err);
    throw err;
  }
}
