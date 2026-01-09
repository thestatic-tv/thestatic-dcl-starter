/**
 * TheStatic.tv DCL SDK Starter
 *
 * This template shows you how to add visitor tracking and streaming
 * features to your Decentraland scene.
 *
 * SETUP:
 * 1. Get your API key at thestatic.tv/dashboard
 * 2. Replace 'dcls_YOUR_API_KEY_HERE' below with your key
 * 3. Run: npm start
 *
 * TIERS:
 * - Free: Visitor tracking only (this works out of the box!)
 * - Standard ($10/mo): Adds Guide UI and Chat UI
 * - Pro ($15/mo): Adds Admin Panel for video/mod controls
 */
import { StaticTVClient } from '@thestatic-tv/dcl-sdk'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

// =============================================================================
// SDK SETUP
// =============================================================================

// Create the SDK client - this starts tracking visitors automatically
let staticTV: StaticTVClient

export function main() {
  // Initialize with your API key
  staticTV = new StaticTVClient({
    apiKey: 'dcls_YOUR_API_KEY_HERE', // <-- Replace with your key!
    debug: true // Set to false in production
  })

  // Initialize UI features (Standard/Pro tiers only)
  // Free tier users: this does nothing, but won't break anything
  initUI()

  console.log('[thestatic.tv] Starter scene loaded!')
}

// =============================================================================
// UI SETUP (Standard/Pro only)
// =============================================================================

// Initialize Guide and Chat UIs if available on your tier
async function initUI() {
  // Wait for SDK to determine your tier (takes a moment after connect)
  let attempts = 0
  while (staticTV.isLite && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 500))
    attempts++
  }

  // Initialize UI modules if available
  if (staticTV.guideUI) {
    await staticTV.guideUI.init()
    console.log('[thestatic.tv] Guide UI ready - browse channels!')
  }

  if (staticTV.chatUI) {
    await staticTV.chatUI.init()
    console.log('[thestatic.tv] Chat UI ready - talk to visitors!')
  }

  // Log which tier was detected
  if (staticTV.isLite) {
    console.log('[thestatic.tv] Free tier - visitor tracking active')
  } else {
    console.log('[thestatic.tv] Standard/Pro tier - all features enabled')
  }
}

// =============================================================================
// UI RENDERER (Required for Guide/Chat to appear)
// =============================================================================

// This MUST be outside main() - it's a DCL requirement
// Renders the Guide and Chat panels when toggled open
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
