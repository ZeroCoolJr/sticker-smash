# Sticker Smash

## Overview

This repository is my own take following Expo's [introductory tutorial](https://docs.expo.dev/tutorial/introduction/) using TypeScript and the latest Expo CLI and components as of March 29, 2024.

## How to Run

- `npm install && npm start`
- Press "a" to open Android emulator.[^1]

## Few Differences

- Project creation is done thru the `npx create-expo-app -t expo-template-blank-typescript` command.
- Components have the explicit `props` parameter.
- Flipped "expressions" to be positive, e.g. `result.canceled` rather than `!result.canceled` and switched the code.
- Changed "handleXXX" methods with no "on" prefix, e.g. `addSticker` rather than `onAddSticker`.
- Installed `@types/dom-to-image` dev npm package.

[^1]: Expo asked me to set the `ANDROID_HOME` environment variable to where the `android/sdk` is installed.
