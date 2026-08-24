import { PASS_A_SYSTEM_PROMPT, PASS_A_USER_PROMPT, passBSystemPrompt } from '@/lib/prompts';
import { parseModelJson } from './parse';
import type { ModelResult } from './types';
import type { EvidenceItem } from '@/lib/evidence';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-5.2';

type OpenAIResponse = { choices?: Array<{ message?: { content?: string } }> };

export async function analyzeWithOpenAI(image: Buffer, mime: string, ledger?: EvidenceItem[]): Promise<ModelResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.');

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? DEFAULT_MODEL,
      max_completion_tokens: 1800,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: ledger?.length ? passBSystemPrompt(ledger) : PASS_A_SYSTEM_PROMPT }, { role: 'user', content: [
        { type: 'image_url', image_url: { url: `data:${mime};base64,${image.toString('base64')}` } },
        { type: 'text', text: PASS_A_USER_PROMPT }
      ] }]
    })
  });
  if (!response.ok) throw new Error(`OpenAI request failed (${response.status}).`);
  const payload = (await response.json()) as OpenAIResponse;
  const text = payload.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenAI returned no text content.');
  return parseModelJson(text);
}
