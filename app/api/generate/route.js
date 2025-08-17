import { GoogleGenAI } from "@google/genai";


export async function POST(request) {
    const { inputt, tone, intensity } = await request.json();
    if (!inputt || typeof inputt !== "string") {
        return Response.json({ error: "Invalid input text" }, { status: 400 });
    }
    const intensityMap = {
        0: "extremely subtle",
        1: "very subtle",
        2: "subtle",
        3: "slightly noticeable",
        4: "moderate",
        5: "balanced",
        6: "pronounced",
        7: "strong",
        8: "very strong",
        9: "extreme",
        10: "maximum possible"
    };

    // Social media platform configuration
    const platformConfig = {
        "Twitter": {
            description: "concise, punchy, hashtag-friendly",
            charLimit: 280,
            hashtags: 1 - 2,
            emojis: "rare",
            rules: "Use short sentences, 1-2 relevant hashtags, avoid long paragraphs"
        },
        "WhatsApp": {
            description: "conversational, emoji-friendly",
            charLimit: 300,
            hashtags: 0,
            emojis: "1-3",
            rules: "Natural conversation style, brief messages, can use emojis"
        },
        "Instagram": {
            description: "engaging, visual language",
            charLimit: 2200,
            hashtags: 5 - 10,
            emojis: "3-5",
            rules: "Use action-oriented language (e.g., 'Swipe up'), include relevant hashtags"
        },
        "LinkedIn": {
            description: "professional, achievement-focused",
            charLimit: 3000,
            hashtags: 3 - 5,
            emojis: "none",
            rules: "Highlight skills and accomplishments, use professional tone"
        },
        "Facebook": {
            description: "friendly, community-oriented",
            charLimit: 8000,
            hashtags: 1 - 2,
            emojis: "1-2",
            rules: "Conversational but polished, community-focused language"
        },
        "Reddit": {
            description: "topic-specific, community jargon",
            charLimit: 40000,
            hashtags: 0,
            emojis: "none",
            rules: "Use subreddit-appropriate terminology and references"
        },
        "Discord": {
            description: "casual, gamer/internet culture",
            charLimit: 2000,
            hashtags: 0,
            emojis: "optional",
            rules: "Relaxed tone, emojis optional"
        },
        "Pinterest": {
            description: "descriptive, inspirational",
            charLimit: 500,
            hashtags: 8 - 12,
            emojis: "none",
            rules: "Rich descriptions, keyword-heavy, inspirational tone"
        },
        "Snapchat": {
            description: "playful, ephemeral style",
            charLimit: 80,
            hashtags: 0,
            emojis: "2-5",
            rules: "Very casual with abbreviations (OMG, LOL), emoji-heavy"
        },
        "YouTube": {
            description: "conversational, SEO-optimized",
            charLimit: 5000,
            hashtags: 3 - 5,
            emojis: "rare",
            rules: "Engaging questions, calls-to-action (Like/Subscribe), natural speech patterns"
        }
    };

    const platforms = Object.keys(platformConfig);
    const currentPlatform = platforms[intensity];

    let prompt;
    if (tone === 'Social Media') {
        const platform = platformConfig[currentPlatform];
        prompt = `Transform this text for ${currentPlatform} (${platform.description}):\n\n` +
            `Original Text: """${inputt}"""\n\n` +
            `Platform-Specific Requirements:\n` +
            `- Character Limit: ${platform.charLimit}\n` +
            `- Hashtags: ${platform.hashtags}\n` +
            `- Emoji Usage: ${platform.emojis}\n` +
            `- Style: ${platform.rules}\n\n` +
            `Additional Rules:\n` +
            `1. Preserve core meaning exactly\n` +
            `2. Adapt to platform conventions\n` +
            `3. Output ONLY the transformed text\n` +
            `4. Maintain similar length (~${inputt.length} chars)`;
    } else {
        prompt = `Rewrite this text with ${intensityMap[intensity]} ${tone} tone:\n\n` +
            `Original Text: """${inputt}"""\n\n` +
            `Requirements:\n` +
            `1. Preserve core meaning exactly\n` +
            `2. Apply ${tone} tone at ${intensityMap[intensity]} intensity\n` +
            `3. Length: ~${inputt.length} characters\n` +
            `4. For ${tone === 'Professional' ? 'formal' : 'casual'} tones: ${tone === 'Professional' ? 'use proper grammar, avoid contractions' : 'use conversational language, contractions allowed'}\n` +
            `5. Output ONLY the rewritten text - no explanations or notes`;
    }
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [{ role: "user", parts: [{ text: prompt }] }]
    });
    const text = response.text;

    return Response.json({ result: text });
}