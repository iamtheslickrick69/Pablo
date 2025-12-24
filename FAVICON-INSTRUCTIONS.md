# Favicon Setup Instructions

## Quick Setup (Recommended)

Use this free online tool to generate all favicon files from your logo:
**https://realfavicongenerator.net/**

### Steps:
1. Go to https://realfavicongenerator.net/
2. Upload `/public/whitelogo.png`
3. Configure:
   - iOS: Use white background or transparent
   - Android: Use black background (#000000)
   - Windows: Use black background
4. Download the generated ZIP
5. Extract and copy these files to `/public/`:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

## Create OG Image for Social Sharing

For the social media preview (iMessage, Facebook, Twitter):

### Option 1: Use Figma/Canva
1. Create 1200x630px image
2. Add your white logo centered
3. Add text: "Bunker Excavation | St. George, Utah"
4. Use black background (#000000)
5. Export as `og-image.png` to `/public/`

### Option 2: Use this online tool
- https://www.opengraph.xyz/
- Upload logo, add text, export

## Files You Need in `/public/`:

```
/public/
  ├── favicon.ico           (16x16 + 32x32 multi-size)
  ├── favicon-16x16.png     (16x16)
  ├── favicon-32x32.png     (32x32)
  ├── apple-touch-icon.png  (180x180)
  ├── android-chrome-192x192.png (192x192)
  ├── android-chrome-512x512.png (512x512)
  ├── og-image.png          (1200x630 for social sharing)
  └── site.webmanifest      (✅ Already created)
```

## Verification

After adding the files:
1. **Favicon:** Visit http://localhost:3000 and check browser tab
2. **iOS:** Add to home screen on iPhone/iPad
3. **Android:** Install as PWA
4. **iMessage:** Text the URL to yourself and see rich preview

## iMessage Rich Preview

When someone shares your URL in iMessage, they'll see:
- Your logo (from og-image.png)
- Site title: "Bunker Excavation | St. George, Utah"
- Description: "Professional excavation services..."
- Clickable preview card

All meta tags are already configured in `app/layout.tsx`! ✅
