# 0.6.0

- Added `<body>` to index.html template. Seems Firefox gets cranky otherwise, even though it's not required by spec.
- Use `document.write` instead of `document.createElement` in `init.js`, fixes issue with Firefox not loading shim.
- Removed `window.importmap` variable. Instead, use a normal importmap (Tiden will patch it).
- Re-added so that `tiden init ...` will use template by default

# 0.5.1

- Fixed an issue where component() would fail in production only

# 0.5.0

- Fixed an issue where `cache` would fail if metadata did not exist
- `createNano` no longer adds template boilerplate, as this is usually not needed
- Fixed an issue where Router.generate would fail to create links with provided `id` instead of legacy `pageId`
- Fix an issue with `linkTo` which would use legacy verb `navigate` instead of `set page`
- `render` can now take properties that have deeply nested generators
- Added `history` and `pop` streams to stdlib. Basic popstate functionality.
- Added option to use URL fragments (i.e. "hash URLs"), just set `window.root` to the folder where index files are located (can be relative)
- Returned capture groups from Page `interpret` function are now automatically run by `decodeURIComponent`
- Anonymous `merge` will now start immediately. It cannot wait for a 'first request', because anonymous merges cannot be requested.

# 0.4.1

- Bump version of hotserve to 1.3.4 which includes a fix for HMR

# 0.4.0

- Added comments in generated index.html to help people add their own import maps
- Fix an issue where multiple importmaps would fail due to the shim being loaded later
- IDE will now reload automatically when changing the index.html file
- `merge` can now be anonymous (just omit second argument)
- Feat! `render` can now be used with generator functions!
- Page IDs will now include namespace by default

# 0.3.0

- Remove faulty warning message from 'connect'
- Add `window.publish` and `window.request` methods
- Using hotserve 1.3.3 include mikabytes/hotserve#2 we no longer have a dependency on Watchman. (thanks! @Seke1412)

# 0.2.2

- Fix another bug in 'connect' where returned arrays were converted to objects

# 0.2.1

- Fix a bug causing CSS not to be HMR ready

# 0.2.0

- Fixed HMR. Components now reload without having to reload whole site
- Fixed an issue where 'connect' would refuse to set an array property returned from selector.
- Added stdlib with 'Storage' functionality

# 0.1.3

- Add instructions for installing Watchman and better error handling #22

# 0.1.2

- Ensure that node version is at least 15.3.0. As we use EcmaScript modules, it will definitely break if node version is lower.

# 0.1.1

- Fixed an issue #20. Dependencies weren't installed correctly

# 0.1.0

- CLI has been added, use `tiden help` for specification

# Changes to pre-0.0.1 legacy code

## Deprecations

These have been deprecated and will be removed in a future minor version

- `HotHaunted.useAutoFocus`.
- `HotHaunted.useElementWidth`
- `HotHaunted.useCssVariable`
- `ensure` [3]
- `nested` [3]

## Removed deprecated methods

- `get` Use `request` instead.
- `getOne` Use `request` instead.
- `set` Use `request` instead.
- `create` Use `request` instead.
- `update` Use `request` instead.
- `takeEveryCreate` Use `respondTo` instead.
- `takeEveryUpdate` Use `respondTo` instead.
- `takeEveryGet` Use `respondTo` instead.
- `takeLeadingGet` This is such a corner case, and won't be covered by this library.
- `unique` Use `whenChanged` instead.
- `distinct` Use `whenChanged` instead.
- `distinct` Use `whenChanged` instead.
- `pipe` Use generator functions directly in `connect` instead.
- `takeOne` This is such a corner case, and won't be covered by this library.
- `createDispatcher` is no longer exported. Only used internally, as such low-level functionality shouldn't be offered by this library.
- `link` Use `linkTo` instead
- `announce` Use `publish` instead
- `listenFor` Use `subscribe` instead

## Renames

- `createSimpleConcept` has been renamed to `simpleStream`
- `createCache` has been renamed to `cache`
- `createMutex` has been renamed to `mutex`
- `HotHaunted` has been renamed to `component`

## Changes to API

- `mutex` return value is no longer `{*lock}` but just `*lock`.
- assigning arrays as selector to `connect` is now forbidden [1]
- `clearcache` verb has been removed from `merge`. Use `invalidate` instead.
- `merge` now refetches all streams when invalidated (early it only recalculated its value based on already cached upstream values
- Routing no longer prioritize pages that are registrered earlier before later ones. [2]
- Routing interpreters must now return key 'groups' even if a regex. It may also return a key `0` which, if exists, will be used for prioritizations. If unset, then it will be given highest priority.

[1] Assigning objects and literals is still allowed. Arrays will have a different meaning in v1.1 when connect moves towards using merges instead of selectors.

[2] pre-0.0.1 if a page was registered first with a regex of `/.*/` then it would take priority after all the following ones because it was first and matched anything. In 0.0.1 this has changed so that the page that matches the biggest portion of the URL gains priority. This makes it easier to make fallback URLs, and solves race conditions when sub-apps are dynamically loaded.

[3] These are not automatically exposed in `import ... from "tiden"` but can instead be loaded using `import ... from "tiden/lib/api/ensure.js"` until next major version, at which point they will be removed.
