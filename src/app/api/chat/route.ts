// src/app/api/chat/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt, model } = body;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://omnichat.ai", // Replace with your domain
      "X-Title": "OmniChat.AI",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 }
    );
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content ?? "No reply.";

  return NextResponse.json({ reply });
}
