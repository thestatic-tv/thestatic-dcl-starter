# TheStatic.tv DCL SDK Starter

Add streaming video and social features to your Decentraland scene.

## Features by Tier

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Session tracking, visitor analytics |
| **Standard** | $10/mo | + Guide UI, Chat |
| **Pro** | $15/mo | + Admin Panel (Video/Mod controls) |

## Quick Start

1. Get your API key at [thestatic.tv/dashboard](https://thestatic.tv/dashboard)

2. Install the SDK:
```bash
npm install @thestatic-tv/dcl-sdk
```

3. Add to your scene (see `src/index.ts`):
```typescript
import { StaticTVClient } from '@thestatic-tv/dcl-sdk'

let staticTV: StaticTVClient

export function main() {
  staticTV = new StaticTVClient({
    apiKey: 'dcls_YOUR_API_KEY_HERE',
    debug: true
  })
}
```

4. Run locally:
```bash
npm start
```

## Using in Creator Hub

See [CREATOR_HUB.md](CREATOR_HUB.md) for step-by-step instructions on importing this template into DCL Creator Hub.

## Links

- [SDK Documentation](https://thestatic.tv/info)
- [Dashboard](https://thestatic.tv/dashboard)
- [Support](https://thestatic.tv/support)
