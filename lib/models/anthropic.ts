import { PASS_A_SYSTEM_PROMPT, PASS_A_USER_PROMPT, passBSystemPrompt } from '@/lib/prompts';
import { parseModelJson } from './parse';
import type { ModelResult } from './types';
import type { EvidenceItem } from '@/lib/evidence';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-sonnet-5';

type AnthropicResponse = { content?: Array<{ type: string; text?: string }> };

export async function analyzeWithAnthropic(image: Buffer, mime: string, ledger?: EvidenceItem[]): Promise<ModelResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured.');

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL,
        max_tokens: 1800,
        system: ledger?.length ? passBSystemPrompt(ledger) : PASS_A_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mime, data: image.toString('base64') } },
            { type: 'text', text: PASS_A_USER_PROMPT }
          ]
        }]
      })
    });

    if (!response.ok) throw new Error(`Anthropic request failed (${response.status}).`);
    const payload = (await response.json()) as AnthropicResponse;
    const text = payload.content?.find((item) => item.type === 'text')?.text;
    if (!text) throw new Error('Anthropic returned no text content.');

    try {
      return parseModelJson(text);
    } catch {
      if (attempt === 1) throw new Error('Anthropic returned JSON that did not match the model schema.');
    }
  }

  throw new Error('Anthropic analysis failed.');
}
