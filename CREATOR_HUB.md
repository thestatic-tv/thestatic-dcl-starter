# Using TheStatic SDK in DCL Creator Hub

Step-by-step guide to add TheStatic.tv streaming to your Creator Hub project.

## Option 1: Start from This Template

1. Download this repository as a ZIP
2. Extract to your local machine
3. Open Creator Hub and click "Import Project"
4. Select the extracted folder
5. Open `src/index.ts` and replace `dcls_YOUR_API_KEY_HERE` with your key
6. Click "Preview" to test

## Option 2: Add to Existing Project

### Step 1: Install the SDK

In Creator Hub's terminal (or your local terminal in the project folder):

```bash
npm install @thestatic-tv/dcl-sdk
```

### Step 2: Create a Video Screen

In your scene's `index.ts`, create an entity for the video to display on:

```typescript
import { engine, Transform, MeshRenderer, MeshCollider } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

const videoScreen = engine.addEntity()
Transform.create(videoScreen, {
  position: Vector3.create(8, 3, 14),    // Center of scene, 3m up
  scale: Vector3.create(8, 4.5, 0.1),    // 16:9 aspect ratio
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})
MeshRenderer.setPlane(videoScreen)
MeshCollider.setPlane(videoScreen)
```

### Step 3: Initialize StaticTVClient

```typescript
import { StaticTVClient } from '@thestatic-tv/dcl-sdk'

export const staticTV = new StaticTVClient({
  apiKey: 'dcls_YOUR_API_KEY_HERE',
  videoScreen: videoScreen
})
```

### Step 4: Setup UI in main()

```typescript
export function main() {
  staticTV.setupUI()
}
```

## Getting Your API Key

1. Go to [thestatic.tv/dashboard](https://thestatic.tv/dashboard)
2. Click "DCL Scenes" tab
3. Click "Create Scene" or select an existing scene
4. Copy your API key (starts with `dcls_`)

## Troubleshooting

**Video not playing?**
- Make sure your videoScreen entity has both `MeshRenderer.setPlane()` and `MeshCollider.setPlane()`
- Check the console for errors (press ` in preview)

**UI not showing?**
- Make sure you call `staticTV.setupUI()` inside your `main()` function
- Free tier only shows a small session indicator - upgrade for full Guide/Chat UI

**"Invalid API key" error?**
- Keys must start with `dcls_`
- Get a new key from [thestatic.tv/dashboard](https://thestatic.tv/dashboard)

## Full Example

```typescript
import { StaticTVClient } from '@thestatic-tv/dcl-sdk'
import { engine, Transform, MeshRenderer, MeshCollider } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

// Create video screen
const videoScreen = engine.addEntity()
Transform.create(videoScreen, {
  position: Vector3.create(8, 3, 14),
  scale: Vector3.create(8, 4.5, 0.1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})
MeshRenderer.setPlane(videoScreen)
MeshCollider.setPlane(videoScreen)

// Initialize SDK
export const staticTV = new StaticTVClient({
  apiKey: 'dcls_YOUR_API_KEY_HERE',
  videoScreen: videoScreen
})

// Start UI
export function main() {
  staticTV.setupUI()
}
```

## Need Help?

- [SDK Documentation](https://thestatic.tv/info)
- [Support](https://thestatic.tv/support)
