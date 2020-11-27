The purpose of the application is to fight food waste: connect businesses with food surplus and people wanting this cheaper surplus.

![#6633ff](https://via.placeholder.com/15/6633ff/000000?text=+) `#6633ff`

## Run

```text
(cd src/ya-comiste-react-native/ios && pod install)
yarn workspace @adeira/ya-comiste-react-native ios
```

TODO: Bazel

## Develop

```text
yarn workspace @adeira/ya-comiste-react-native run relay --watch
yarn workspace @adeira/ya-comiste-react-native run fbt
```

```text
yarn workspace @adeira/ya-comiste-react-native start --reset-cache
yarn workspace @adeira/ya-comiste-react-native react-native-bundle-visualizer
```

## Native modules

- React Native Navigation (https://github.com/wix/react-native-navigation)
- Mapbox maps (https://github.com/react-native-mapbox-gl/maps)

## Must Have

- 🚧 running on Android because Latam is mainly for Android (currently not available)
- 🚧 running on iOS
- 🚧 possibility to use the application without any login
- 🚧 actions (pre-order, create) possible only after account creation
- 🚧 dark mode (https://reactnative.dev/docs/usecolorscheme)
- ✅ translations via FBT

## Nice to have

- Relay Experimental with hooks (needs React Suspense release)
- mainly SDUI (Server Driven UI) via `@match` and `@module`, but not everywhere (needs finished Relay support?)
- Relay `@defer`
- Relay Rust Compiler
- Recoil

## Sources

- Icons: https://icons.getbootstrap.com/
- Figma: https://www.figma.com/file/kf82oGWoCEpNNUw34RNKRn/Untitled?node-id=0%3A1

## Upgrading RN

Follow: https://react-native-community.github.io/upgrade-helper/

Cleanup aka _nuke everything_ (when something goes wrong):

```text
(cd src/ya-comiste-react-native/ios && rm -rf Pods)
(cd src/ya-comiste-react-native/ios && pod cache clean --all)
(cd src/ya-comiste-react-native/ios && pod install)

watchman watch-del-all
yarn workspace @adeira/ya-comiste-react-native start --reset-cache
```
