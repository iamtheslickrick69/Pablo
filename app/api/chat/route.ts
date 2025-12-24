import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Load PABLO.md knowledge base
let pabloKnowledge = ""
try {
  const knowledgePath = path.join(process.cwd(), "PABLO.md")
  pabloKnowledge = fs.readFileSync(knowledgePath, "utf-8")
} catch (error) {
  console.error("Failed to load PABLO.md:", error)
  pabloKnowledge = "I'm Pablo, the Bunker Excavation assistant. I'm having trouble accessing my knowledge base right now. Please contact Paul directly at (801) 706-3783 or paulbunker@gmail.com for assistance."
}

// System prompt that combines the knowledge base with behavior instructions
const SYSTEM_PROMPT = `${pabloKnowledge}

---

## CRITICAL HYPERLINK FORMATTING INSTRUCTIONS

When you reference sections of the website, you MUST format hyperlinks using standard markdown:
- Use [link text](#section-id) format
- Available section IDs: #about, #services, #why-us, #process, #contact
- Example: "Learn more about our [excavation services](#services)"
- Example: "Check out our [complete process](#process)"
- Example: "Ready to [schedule a consultation](#contact)?"

DO NOT use plain text like "Services section" - always use proper markdown hyperlinks.

---

CRITICAL RESPONSE GUIDELINES:

1. **BE BRIEF** - Keep responses SHORT (1-2 paragraphs max, 3-4 sentences total)
2. **NO OVER-EXPLAINING** - Answer the question asked, don't add extra info
3. **NO UNNECESSARY BULLETS** - Only use lists when absolutely needed
4. **CONVERSATIONAL** - Write like you're texting a friend, not writing an essay
5. **INCLUDE HYPERLINKS** - Link to relevant sections (#services, #contact, #process)
6. **CLEAR CTA** - Always end with a simple next step

TONE: Friendly, helpful, casual - like a knowledgeable friend, not a sales brochure.

BAD: "Great question! Let me provide you with detailed information about our services. [4 paragraphs + bullet lists]"
GOOD: "Absolutely! We've done 500+ foundations in St. George. Typical project runs $1,500-$5,000 depending on size. Want a [free estimate](#contact)?"

Remember: Less is more. Answer quickly, stay helpful, keep it moving.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      )
    }

    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("Missing ANTHROPIC_API_KEY environment variable")
      return NextResponse.json(
        {
          error: "Configuration error",
          message: "The chatbot is currently unavailable. Please contact Paul directly at (801) 706-3783.",
        },
        { status: 500 }
      )
    }

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022", // Fast & affordable
      max_tokens: 150, // Force concise responses (1-2 paragraphs)
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      })),
    })

    // Extract the response text
    const assistantMessage = response.content[0]
    const responseText = assistantMessage.type === "text" ? assistantMessage.text : ""

    return NextResponse.json({
      message: responseText,
      usage: response.usage, // Include usage stats for monitoring
    })

  } catch (error: unknown) {
    console.error("Anthropic API error:", error)

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        {
          error: "AI service error",
          message: "I'm having trouble processing that right now. Please try again or contact Paul directly at (801) 706-3783.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Something went wrong. Please contact Paul at (801) 706-3783 for immediate assistance.",
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    knowledgeBase: pabloKnowledge ? "loaded" : "missing",
    apiKey: process.env.ANTHROPIC_API_KEY ? "configured" : "missing",
  })
}
