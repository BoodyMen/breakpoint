# BREAKPOINT

BREAKPOINT helps everyone find their next surf spot. Step 1 currently includes the upload transformation boundary: supported images are validated, EXIF is removed by re-encoding, resized to a maximum 1568px edge, hashed, and stored through an adapter.

## Local setup

Requires Node.js 20+ and npm. Install dependencies with `npm install`, then run `npm run dev`.

Uploaded files are written to the ignored local `storage/` directory. Supabase migrations are in `supabase/migrations/`; the production storage adapter will be added before deployment.

Step 2 adds a Pass A Anthropic vision adapter. Step 3 adds OpenAI and Google adapters, parallel failure-isolated fan-out, and the first model-agreement consensus summary. Set provider keys in a local `.env.local` to run it; the landing page displays the raw runs and consensus JSON.

The two-pass endpoint accepts only validated place evidence for Pass B. The geophysical package currently includes local sun-position evidence; network-backed marine and map lookups remain feature-flagged for later stages.

The intake schema is strict and place-focused. Unknown fields are rejected, so handles, profile names, comments, and other person evidence have no accepted request shape.
