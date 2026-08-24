'use client';

import { useState } from 'react';

export function UploadForm() {
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const response = await fetch('/api/analyze/all', { method: 'POST', body: new FormData(event.currentTarget) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? 'Analysis failed.');
      setResult(payload.result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  }

  return <>
    <form onSubmit={submit}>
      <label htmlFor="image">Upload an image to begin</label>
      <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/tiff" required />
      <button type="submit" disabled={loading}>{loading ? 'Analyzing...' : 'Run Pass A'}</button>
    </form>
    {error && <p role="alert">{error}</p>}
    {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
  </>;
}
