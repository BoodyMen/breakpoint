import { PASS_A_SYSTEM_PROMPT, PASS_A_USER_PROMPT, passBSystemPrompt } from '@/lib/prompts';
import { parseModelJson } from './parse';
import type { ModelResult } from './types';
import type { EvidenceItem } from '@/lib/evidence';

const DEFAULT_MODEL = 'gemini-3.1-pro-preview';

type GoogleResponse = { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };

export async function analyzeWithGoogle(image: Buffer, mime: string, ledger?: EvidenceItem[]): Promise<ModelResult> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_API_KEY is not configured.');
  const model = process.env.GOOGLE_MODEL ?? DEFAULT_MODEL;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: ledger?.length ? passBSystemPrompt(ledger) : PASS_A_SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [
        { inlineData: { mimeType: mime, data: image.toString('base64') } },
        { text: PASS_A_USER_PROMPT }
      ] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });
  if (!response.ok) throw new Error(`Google request failed (${response.status}).`);
  const payload = (await response.json()) as GoogleResponse;
  const text = payload.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text;
  if (!text) throw new Error('Google returned no text content.');
  return parseModelJson(text);
}
