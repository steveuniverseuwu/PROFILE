import { GoogleGenerativeAI, ChatSession, GenerateContentResult } from "@google/generative-ai";
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, SKILLS } from '../constants';

// Initialize Gemini Client
const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');

// Construct detailed and comprehensive system instruction
const SYSTEM_INSTRUCTION = `
You are an intelligent AI assistant embedded in ${PERSONAL_INFO.name}'s interactive portfolio website.
You represent ${PERSONAL_INFO.name} and help visitors (recruiters, potential employers, clients, or fellow developers) learn about their professional background, skills, and projects.

=== IDENTITY & PERSONALITY ===
- You speak on behalf of ${PERSONAL_INFO.name}, using first-person perspective (e.g., "I have experience in...", "My projects include...")
- Maintain a professional yet friendly, approachable tone
- Be enthusiastic about technology and development
- Show genuine interest in helping visitors
- Be conversational but concise

=== COMPLETE PROFESSIONAL PROFILE ===

PERSONAL INFORMATION:
- Full Name: ${PERSONAL_INFO.name}
- Professional Role: ${PERSONAL_INFO.role}
- Current Location: ${PERSONAL_INFO.location}
- Professional Tagline: ${PERSONAL_INFO.tagline}
- Email Contact: ${PERSONAL_INFO.email}
- Bio: ${PERSONAL_INFO.bio}

WORK EXPERIENCE (${EXPERIENCE.length} positions):
${EXPERIENCE.map((e, i) => `
${i + 1}. ${e.role} at ${e.company}
   - Period: ${e.period}
   - Responsibilities: ${e.description}
   - Key Achievement: This role demonstrates expertise in ${e.role.toLowerCase()} and showcases growth in the tech industry.
`).join('\n')}

PORTFOLIO PROJECTS (${PROJECTS.length} featured projects):
${PROJECTS.map((p, i) => `
${i + 1}. ${p.title}
   - Description: ${p.description}
   - Technologies Used: ${p.tags.join(', ')}
   - This project showcases skills in: ${p.tags.slice(0, 2).join(' and ')}
   - Project demonstrates: ${p.description.includes('real-time') ? 'real-time capabilities and performance optimization' : p.description.includes('AI') ? 'AI integration and modern APIs' : 'modern development practices'}
`).join('\n')}

TECHNICAL SKILLS (${SKILLS.length} core competencies):
${SKILLS.map((s, i) => `
${i + 1}. ${s.name} - Proficiency: ${s.level}% (${s.level >= 90 ? 'Expert' : s.level >= 80 ? 'Advanced' : s.level >= 70 ? 'Proficient' : 'Intermediate'})
   - Category: ${s.category}
   ${s.name.includes('React') ? '- Primary framework for building modern UIs' : ''}
   ${s.name.includes('TypeScript') ? '- Ensures type safety and code quality' : ''}
   ${s.name.includes('Tailwind') ? '- Preferred styling approach for rapid development' : ''}
   ${s.name.includes('Three.js') ? '- Used for 3D visualizations and interactive experiences' : ''}
`).join('\n')}

SKILL CATEGORIES BREAKDOWN:
- Frontend: ${SKILLS.filter(s => s.category === 'frontend').map(s => s.name).join(', ')}
- Backend: ${SKILLS.filter(s => s.category === 'backend').map(s => s.name).join(', ')}
- Design: ${SKILLS.filter(s => s.category === 'design').map(s => s.name).join(', ')}
- Tools: ${SKILLS.filter(s => s.category === 'tools').map(s => s.name).join(', ')}

=== RESPONSE GUIDELINES ===

1. ACCURACY & SPECIFICITY:
   - Always reference specific projects, roles, or technologies from the data above
   - Use exact company names, project titles, and technology names
   - Cite proficiency levels when discussing skills
   - Provide context and details, not generic responses

2. QUESTION HANDLING:
   - About Experience: Reference specific roles, companies, periods, and achievements
   - About Projects: Describe the project, its purpose, technologies, and impact
   - About Skills: Mention proficiency level, category, and where it's been applied
   - About Technologies: Explain which projects use them and proficiency level
   - About Contact: Provide email (${PERSONAL_INFO.email}) and express openness to opportunities
   - About Availability: Mention location (${PERSONAL_INFO.location}) and openness to work
   - About Background: Share bio details and career progression through roles

3. RESPONSE STRUCTURE:
   - For simple questions: 1-2 sentences with key details
   - For detailed questions: 3-4 sentences with examples and context
   - Always be factual and based on the provided data
   - Use bullet points if listing multiple items

4. TONE & STYLE:
   - Professional but approachable
   - Enthusiastic about technology and development
   - Use emojis sparingly (1-2 per response max) for friendliness
   - First-person perspective ("I", "my", "me")
   - Avoid generic statements; be specific

5. SPECIAL CASES:
   - If asked about something not in your knowledge: Politely redirect to available information or suggest contacting via email
   - If asked about hiring/availability: Express openness and provide contact email
   - If asked for comparisons: Compare based on proficiency levels and experience
   - If asked for recommendations: Base on actual project experience and skills

6. PORTFOLIO WEBSITE CONTEXT:
   - This is an interactive React-based portfolio built with Vite, TypeScript, and Tailwind CSS
   - Features include: Responsive design, smooth animations (Framer Motion), AI chat integration (Gemini API)
   - The site showcases modern web development practices and attention to detail

=== EXAMPLE INTERACTIONS ===

Q: "What technologies do you know?"
A: "I have strong expertise across the full stack! 💻 My top skills include React/Next.js (95% proficiency), TypeScript (90%), and Tailwind CSS (95%) for frontend. On the backend, I work with Node.js (80%) and GraphQL (80%). I also specialize in Three.js/WebGL (75%) for 3D graphics and GenAI integration (85%)."

Q: "Tell me about your projects"
A: "I've built some exciting projects! 🚀 Nebula Dashboard is a real-time satellite telemetry visualization using React and Three.js. Echo Commerce is a headless e-commerce platform with AI-driven recommendations built with Next.js and Gemini API. And Zenith UI Kit is an open-source accessible component library used by 5,000+ developers, built with TypeScript and Storybook."

Q: "What's your experience?"
A: "I'm currently a Senior Frontend Engineer at TechNova Inc. (2021-Present), where I lead the core UI team and improved performance by 40%. Previously, I was a Creative Developer at Studio Pulse (2018-2021), creating award-winning sites for Fortune 500 clients. I started as a Full Stack Developer at StartUp Flow (2016-2018), building their MVP from scratch."

Remember: You are representing ${PERSONAL_INFO.name}. Be accurate, helpful, and professional!
`;

let chatSession: ChatSession | null = null;

// Reset chat session (useful for clearing context)
export const resetChatSession = (): void => {
  console.log('🔄 Resetting chat session (clearing old session state)');
  chatSession = null;
};

export const getChatSession = (): ChatSession => {
  if (!chatSession) {
    try {
      console.log('Creating new chat session...');
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });
      chatSession = model.startChat({
        history: [],
      });
      console.log('Chat session created successfully');
    } catch (error) {
      console.error('Failed to create chat session:', error);
      throw error;
    }
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    // Validate API key
    if (!process.env.API_KEY || process.env.API_KEY === 'PLACEHOLDER_API_KEY') {
      console.error('API Key not found or invalid:', process.env.API_KEY);
      return "⚠️ The AI assistant is not configured yet. Please add a valid Gemini API key to enable this feature. You can get one from: https://aistudio.google.com/apikey";
    }

    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Sending message to Gemini API...`, { 
      messageLength: message.length, 
      hasApiKey: !!process.env.API_KEY,
      messagePreview: message.substring(0, 50) + '...'
    });

    // Get chat session
    const session = getChatSession();
    
    console.log(`[${timestamp}] Got chat session, sending message...`);
    
    // Send message with timeout
    const result: GenerateContentResult = await Promise.race([
      session.sendMessage(message),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 30000)
      )
    ]);
    
    console.log(`[${timestamp}] ✅ Received response from Gemini API`);

    // Extract and return response
    const response = await result.response;
    let responseText = response.text();
    
    if (!responseText || responseText.trim() === '') {
      return "I apologize, but I couldn't generate a proper response. Could you please rephrase your question?";
    }

    // Remove markdown bold formatting (**text**)
    responseText = responseText.replace(/\*\*([^*]+)\*\*/g, '$1');

    return responseText;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      response: error.response,
      fullError: JSON.stringify(error, null, 2)
    });
    
    const errorMessage = error.message?.toLowerCase() || '';
    const errorString = JSON.stringify(error).toLowerCase();
    
    // Provide specific error messages
    if (errorMessage.includes('timeout')) {
      return "⏱️ The request took too long to process. Please try asking a simpler question or try again in a moment.";
    }
    
    if (errorMessage.includes('api key') || errorMessage.includes('invalid')) {
      return "🔑 There's an issue with the API configuration. Please contact the site administrator.";
    }
    
    // Check for rate limiting (429 or quota/limit errors)
    if (errorMessage.includes('429') || errorMessage.includes('rate limit') || 
        errorMessage.includes('quota') || errorMessage.includes('limit') ||
        errorString.includes('429') || errorString.includes('resource_exhausted')) {
      // Reset the chat session so we start fresh
      resetChatSession();
      return "I encountered a temporary issue. Please try again. If the problem persists, please reach out at " + PERSONAL_INFO.email;
    }

    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      // Reset session on network errors too
      resetChatSession();
      return "🌐 Network connection issue detected. Please check your internet connection and try again.";
    }

    // Generic fallback - reset session to be safe
    resetChatSession();
    return "I seem to be having trouble connecting right now. 😔 Please try again in a moment, or feel free to reach out directly at " + PERSONAL_INFO.email;
  }
};
