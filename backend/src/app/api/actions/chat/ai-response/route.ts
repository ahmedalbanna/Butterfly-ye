import { NextRequest, NextResponse } from 'next/server';
import { withCors } from '@/middleware/cors';
import { requireAuth } from '@/middleware/auth';
import { runFlow } from 'genkit';
import { aiStylistChatFlow } from '@/ai/flows/ai-stylist-chat-flow';

async function handler(request: NextRequest, user: any) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Run AI flow
    const result = await runFlow(aiStylistChatFlow, {
      userMessage: message,
      conversationHistory: conversationHistory || [],
    });

    return NextResponse.json({ 
      success: true, 
      data: { 
        response: result.response,
        suggestions: result.suggestions || [],
      } 
    });
  } catch (error) {
    console.error('Error getting AI response:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

export const POST = withCors(requireAuth(handler));
