# Expo Curved Bottom Navigation Template

An Expo SDK 56 starter template featuring a curved, liquid-glass bottom navigation bar built with [`@shopify/react-native-skia`](https://shopify.github.io/react-native-skia/) and [`expo-glass-effect`](https://docs.expo.dev/versions/latest/sdk/glass-effect/). The navigation bar design is based on the open-source work from [rit3zh/expo-curved-bottom-tabs](https://github.com/rit3zh/expo-curved-bottom-tabs).

This template ships with Expo Router, TypeScript, React Native Reanimated, and a three-tab layout (Home, Explore, Profile) so you can start building features immediately without wiring up navigation from scratch.

---

## Quick Start

### Option 1 — GitHub template (recommended)

```bash
npx create-expo-app@latest MyApp --template https://github.com/USER/expo-curved-tabs-template
cd MyApp
npm install
npx expo start
```

### Option 2 — npm (if published to the npm registry)

```bash
npx create-expo-app@latest MyApp --template expo-template-curved-bottom-nav
cd MyApp
npx expo start
```

### Option 3 — Clone directly

```bash
git clone https://github.com/USER/expo-curved-tabs-template MyApp
cd MyApp
# Update the app name in package.json and app.json before continuing
npm install
npx expo start
```

---

## Prerequisites

| Requirement | Minimum Version | Notes |
|---|---|---|
| Node.js | 20 LTS | Required by Expo SDK 56 |
| npm | 10+ | Comes with Node 20 |
| Xcode | 16+ | iOS builds and Simulator |
| Android Studio | Ladybug (2024.2+) | Android Emulator and SDK |
| EAS CLI | Latest | `npm install -g eas-cli` for cloud builds |

> **New Architecture:** This template has `"newArchEnabled": true` in `app.json`. All dependencies are chosen for New Architecture compatibility.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start
```

Once the dev server is running, press:

- `i` — open in iOS Simulator
- `a` — open in Android Emulator
- `w` — open in web browser
- Scan the QR code with Expo Go on a physical device

---

## Project Structure

```
.
├── app/                              # Expo Router — file-based routing root
│   ├── _layout.tsx                   # Root layout (GestureHandlerRootView, splash)
│   ├── +not-found.tsx                # 404 screen
│   └── (tabs)/                       # Tab group
│       ├── _layout.tsx               # Tab navigator config with CurvedTabBar
│       ├── index.tsx                 # Home tab screen
│       ├── explore.tsx               # Explore tab screen
│       └── profile.tsx               # Profile tab screen
│
├── components/
│   ├── index.ts                      # Barrel — re-exports all from curved-tab-bar
│   └── curved-tab-bar/               # Curved bottom nav implementation
│       ├── index.tsx                 # Public exports: CurvedTabBar, CurvedTabs, etc.
│       ├── tab-bar.tsx               # CurvedTabBar + CurvedTabs entry components
│       ├── curved-tabs.tsx           # CurvedTabsRoot — layout + animation engine
│       ├── markers.tsx               # CurvedTabsList, Trigger, Indicator slots
│       ├── tab-bar-surface.tsx       # Skia SVG arc background surface
│       ├── tab-bar-icons.tsx         # Per-tab icon positioning along the arc
│       ├── tab-icon.tsx              # Animated idle/active icon (SymbolView + Ionicons)
│       ├── glass-beads.tsx           # Liquid glass bead segments (expo-glass-effect)
│       ├── glass-beards-(fallback).tsx # Plain View fallback for non-glass devices
│       ├── glass-rim.tsx             # SVG highlight rim overlay
│       └── glass-view.tsx            # Standalone curved glass view
│
├── constants/
│   ├── colors.ts                     # Light/dark palette tokens
│   ├── tab-bar.ts                    # Arc height, thickness, spring config
│   └── tab-bar-colors.ts             # DynamicColorIOS tab bar colors (light/dark)
│
├── hooks/
│   ├── index.ts                      # Barrel export
│   ├── useColorScheme.ts             # Re-exports from react-native
│   └── useThemeColor.ts              # Resolves color token for current scheme
│
├── interfaces/                       # TypeScript interfaces for all components
│   ├── tab-bar.interface.ts
│   ├── tab-bar-surface.interface.ts
│   ├── curved-tabs.interface.ts
│   └── ... (11 interface files total)
│
├── lib/                              # Pure utility functions
│   ├── stroke-arc-path.ts            # strokedArcPath() — Skia path builder
│   ├── compute-curved-arc.ts         # Arc geometry calculations
│   ├── compute-curved-geometry.ts    # Tab position geometry
│   └── ... (10 utility files total)
│
├── assets/
│   └── images/                       # icon.png, splash-icon.png, adaptive-icon.png
│
├── app.json                          # Expo config (name, scheme, plugins)
├── babel.config.js                   # Babel with reanimated plugin
├── metro.config.js                   # Metro with Skia WASM/web support
├── tsconfig.json                     # TypeScript (strict, @/* alias)
└── package.json
```

---

## Customizing the Tab Bar

### Tab configuration

Open `app/(tabs)/_layout.tsx`. Each tab is declared as a `<Tabs.Screen>` element. The `tabBarIcon` prop receives the current theme color and whether the tab is focused — pass these through to your icon component.

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { CurvedTabBar } from '@/components/curved-tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CurvedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'compass' : 'compass-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### Changing icons

Icons come from `@expo/vector-icons`. Swap the `name` prop on any `TabBarIcon` to any Ionicons (or other supported set) glyph. Browse available icons at [icons.expo.fyi](https://icons.expo.fyi).

### Adjusting sizing

Edit `constants/tab-bar.ts` to change the bar height, curve amplitude, or horizontal padding. All Skia path calculations read from these constants so the curve redraws automatically.

---

## Adding New Screens

### Add a new tab

1. Create the screen file inside `app/(tabs)/`:

```tsx
// app/(tabs)/settings.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

2. Register the screen in `app/(tabs)/_layout.tsx`:

```tsx
<Tabs.Screen
  name="settings"
  options={{
    title: 'Settings',
    tabBarIcon: ({ color, focused }) => (
      <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
    ),
  }}
/>
```

Expo Router picks up the file automatically — no manual route registration needed.

### Add a nested stack screen

Create a folder with a `_layout.tsx` that renders a `<Stack>`, then add screen files alongside it. Expo Router handles deep linking and typed routes automatically (enabled via `"typedRoutes": true` in `app.json`).

---

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `expo` | ~56.0.9 | Core Expo SDK, build tooling, and native modules |
| `expo-router` | ~56.2.9 | File-based routing, deep linking, typed routes |
| `@shopify/react-native-skia` | 2.6.2 | 2D canvas for drawing the curved bar path and glass blur shapes |
| `expo-glass-effect` | ~56.0.4 | Native frosted-glass / liquid-glass blur effect on iOS and Android |
| `react-native-reanimated` | 4.3.1 | Smooth tab indicator and icon spring animations |
| `react-native-gesture-handler` | ~2.31.1 | Low-latency touch handling for tab press interactions |
| `react-native-worklets` | 0.8.3 | Shared value worklets required by Reanimated 4 |

---

## Building for Production

This template is configured for [EAS Build](https://docs.expo.dev/build/introduction/).

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Log in to your Expo account
eas login

# Configure your project (first time only)
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

> Skia requires a development build — it will not run in Expo Go. Use `npx expo run:ios` or `npx expo run:android` for local device testing, or create a development build with `eas build --profile development`.

---

## Making More Templates

This template is part of a series of opinionated Expo starters. Any public GitHub repository can be used as a `create-expo-app` template without publishing to npm:

```bash
npx create-expo-app@latest MyApp --template https://github.com/YOUR_ORG/YOUR_TEMPLATE_REPO
```

`create-expo-app` clones the repo, strips the `.git` folder, and runs `npm install` automatically. The only requirement is a valid `package.json` and an `app.json` (or `app.config.ts`) in the root.

To build your own:

1. Fork or copy this repo.
2. Replace the screens, components, and constants with your own.
3. Update `package.json` `name` and `app.json` `name`/`slug`.
4. Push to a public GitHub repository.
5. Share the `--template https://github.com/YOU/your-repo` URL.

---

## License

MIT
