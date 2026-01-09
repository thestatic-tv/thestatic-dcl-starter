/**
 * TheStatic.tv DCL SDK Starter
 *
 * 3 simple steps to add streaming video to your scene:
 * 1. Create a video screen entity
 * 2. Pass it to StaticTVClient with your API key
 * 3. Call setupUI() in main()
 *
 * Get your API key at: thestatic.tv/dashboard
 */
import { StaticTVClient } from '@thestatic-tv/dcl-sdk'
import { engine, Transform, MeshRenderer, MeshCollider } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'

// STEP 1: Create your video screen
const videoScreen = engine.addEntity()
Transform.create(videoScreen, {
  position: Vector3.create(8, 3, 14),
  scale: Vector3.create(8, 4.5, 0.1),
  rotation: Quaternion.fromEulerDegrees(0, 0, 0)
})
MeshRenderer.setPlane(videoScreen)
MeshCollider.setPlane(videoScreen)

// STEP 2: Create StaticTVClient with your API key
export const staticTV = new StaticTVClient({
  apiKey: 'dcls_YOUR_API_KEY_HERE',
  videoScreen: videoScreen
})

// STEP 3: Call setupUI() in main()
export function main() {
  staticTV.setupUI()
}
