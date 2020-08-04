# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.0.0] - 2020-08-04

### Added
- Added a `group-focus-visible` variant

### Removed
- Removed the `checked` variant since it is built into Tailwind as of v1.5

## [4.0.0] - 2020-05-09

### Removed
- Removed the `group-focus` variant since it is now built into Tailwind

## [3.1.1] - 2020-03-17

### Fixed
- Fixed the `can-hover` and `no-hover` variants with Tailwind’s `important` option set to a selector (e.g. `#app`)

## [3.1.0] - 2020-02-13

### Added
- Added `can-hover` and `no-hover` variants

## [3.0.0] - 2020-02-05

### Added
- Added a `checked` variant

### Changed
- Changed to use Tailwind 1.2’s new plugin definition syntax

## [2.4.0] - 2019-12-20

### Added
- Added `group-visited` and `group-disabled` variants

### Fixed
- Tailwind’s `prefix` option is now properly applied to the `.group` part of the selector for group variants

## [2.3.0] - 2019-11-29

### Added
- Added a `group-focus-within` variant

## [2.2.0] - 2019-09-02

### Removed
- Removed the `visited` variant since it is now built into Tailwind

## [2.1.0] - 2019-07-11

### Added
- Added support for utilities that include pseudo-elements (based on Tailwind’s method introduced in v1.0.5)

## [2.0.0] - 2019-05-13

No change since 2.0.0-beta.1

## [2.0.0-beta.1] - 2019-04-07

### Added
- Tailwind 1.0.0 compatibility

## [1.0.0] - 2019-02-14

Initial release

[Unreleased]: https://github.com/benface/tailwindcss-interaction-variants/compare/v5.0.0...HEAD
[5.0.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v3.1.1...v4.0.0
[3.1.1]: https://github.com/benface/tailwindcss-interaction-variants/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v2.4.0...v3.0.0
[2.4.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/benface/tailwindcss-interaction-variants/compare/v2.0.0-beta.1...v2.0.0
[2.0.0-beta.1]: https://github.com/benface/tailwindcss-interaction-variants/compare/v1.0.0...v2.0.0-beta.1
[1.0.0]: https://github.com/benface/tailwindcss-interaction-variants/releases/tag/v1.0.0
