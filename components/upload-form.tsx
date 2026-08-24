'use client';

import { useRef, useState } from 'react';

export function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<string | null>(null);
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
      setResult(JSON.stringify(payload, null, 2));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  }

  function acceptFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Choose a JPEG, PNG, WebP, or TIFF image.');
      return;
    }
    const transfer = new DataTransfer();
    transfer.items.add(file);
    if (inputRef.current) inputRef.current.files = transfer.files;
    setError(null);
  }

  return (
    <div className="upload-wrap">
      <form onSubmit={submit}>
        <div
          className={`upload-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => { event.preventDefault(); setIsDragging(false); acceptFiles(event.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
        >
          <span className="upload-kicker">01 / Upload</span>
          <strong>{isDragging ? 'Release to inspect' : 'Drop your image here'}</strong>
          <span>or click to browse</span>
          <small>JPEG / PNG / WebP / TIFF · MAX 10MB</small>
          <input ref={inputRef} id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/tiff" required onChange={(event) => acceptFiles(event.target.files)} />
        </div>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Running analysis...' : 'Find the spot'}
          <span aria-hidden="true">↗</span>
        </button>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
      {result !== null && <pre className="result-json">{result}</pre>}
    </div>
  );
}
