# Robiox

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full Roblox-style web platform renamed "Robiox"
- Home page with featured/popular games grid and search bar
- Games page with searchable, filterable game catalog
- Game Detail page with game info, copy game code button, and launch button
- Studio page mirroring create.roblox.com (game creation tools overview)
- Avatar page for customizing user avatar
- Robux Shop page with real Stripe-powered purchase packages
- User authentication (login/signup)
- Robux balance display in nav
- Stripe integration for real Robux purchases (400/$4.99, 800/$9.99, 1700/$19.99, 4500/$49.99, 10000/$99.99)
- Game code copy-to-clipboard functionality
- Game launch functionality (opens game link/code)
- Sample game catalog with thumbnails, player counts, ratings

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: user accounts, Robux balance tracking, game catalog, Stripe checkout session creation, game code storage
2. Frontend: Nav with logo, search, Robux balance, login; Home page; Games page with search/filter; Game Detail page with copy code + launch; Studio page; Avatar page; Robux Shop with Stripe checkout
3. Stripe keys as environment placeholders (user adds their own keys after creating Stripe account)
