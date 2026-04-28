export async function chatWithMistral(prompt: string, history: { role: string; content: string }[]) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, history }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch from proxy");
    }

    const { response: result } = await response.json();
    return result;
  } catch (err) {
    console.error("AI Service Error:", err);
    throw err;
  }
}
