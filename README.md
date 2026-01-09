# TheStatic.tv DCL SDK Starter

A template for adding visitor tracking and streaming features to your Decentraland scene.

## Features by Tier

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Session tracking, visitor analytics |
| **Standard** | $10/mo | + Guide UI, Chat UI |
| **Pro** | $15/mo | + Admin Panel (video/mod controls) |

## Quick Start

1. Get your API key at [thestatic.tv/dashboard](https://thestatic.tv/dashboard)

2. Replace the placeholder in `src/index.ts`:
```typescript
staticTV = new StaticTVClient({
  apiKey: 'dcls_YOUR_API_KEY_HERE', // <-- Your key here
  debug: true
})
```

3. Run locally:
```bash
npm install
npm start
```

## How It Works

```typescript
import { StaticTVClient } from '@thestatic-tv/dcl-sdk'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

let staticTV: StaticTVClient

export function main() {
  // Initialize - tracking starts automatically
  staticTV = new StaticTVClient({
    apiKey: 'dcls_YOUR_KEY',
    debug: true
  })

  // Init UI (Standard/Pro only - safe to call on Free)
  initUI()
}

async function initUI() {
  if (staticTV.guideUI) await staticTV.guideUI.init()
  if (staticTV.chatUI) await staticTV.chatUI.init()
}

// Required for UI to render (must be outside main)
ReactEcsRenderer.setUiRenderer(() => {
  if (!staticTV) return null
  return ReactEcs.createElement(UiEntity, {
    uiTransform: { width: '100%', height: '100%', positionType: 'absolute' },
    children: [
      staticTV.guideUI?.getComponent(),
      staticTV.chatUI?.getComponent()
    ].filter(Boolean)
  })
})
```

## Project Structure

```
thestatic-dcl-starter/
├── src/
│   └── index.ts       # SDK setup (well-commented for learning)
├── scene.json         # Scene metadata
└── package.json       # Dependencies
```

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Run locally in preview mode |
| `npm run build` | Build for production |
| `npm run deploy` | Deploy to Decentraland |
| `npm run deploy:test` | Deploy to test world |

## Using in Creator Hub

See [CREATOR_HUB.md](CREATOR_HUB.md) for step-by-step instructions.

## Other Examples

| Example | Description |
|---------|-------------|
| **[Basic](https://github.com/thestatic-tv/thestatic-dcl-basic)** | Minimal metrics display (no UI features) |
| **[Popup](https://github.com/thestatic-tv/thestatic-dcl-popup)** | Full showcase with video screen, Guide, Chat |

## Resources

- [SDK Documentation](https://thestatic.tv/info)
- [Get API Key](https://thestatic.tv/dashboard)
- [Support](https://thestatic.tv/support)
