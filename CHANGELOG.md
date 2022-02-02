# Changelog
CSSObject.js: A parser CSS in javascript vanilla

## [1.6.0] - 2021-02-01

## Added
- Add static method
- Add support to dataset (data-name) for local stylesheets
- options to local stylesheets (ignore_files / only_files)

## [1.5.0] - 2021-01-31

## Added
- Support to multiples pseudos
- Pseudo values to parameters
- Rule unit values


## [1.4.3] - 2021-01-28

### Changed
- ES5 support to bundle file
- Selector key TagSelector to HTMLSelector

### Added
- Support to many comments in one line

### Fixed
- Rule empty properties, values and functions


## [1.4.2] - 2021-09-12

### Changed
- indentation tab to spaces

### Added
- bundle `cssobject.js` file _(no ES5)_


## [1.4.1] - 2021-09-10

### Added
- QuerieRule to MediaRule
- FunctionRule class

### Fixed
- Rule value to multiple values


## [1.3.0] - 2021-09-05

### Added
- CSSObject: `local` and `external` methods to get stylesheets
- Rule property: `isImportant`
- Support to selector combiners
- Support to comments block
- Keyframes selectors


## [1.2.0] - 2021-08-25

### Added
- CSSParser class
- Statments rule classes:
  - ImportRule
  - FontfaceRule
  - KeyframeRule
  - MediaRule

### Removed
- CSSObject parser functions


## [1.1.0] - 2021-08-23

### Changed
- Module structure project


## [0.1.1] - 2021-08-20

### Added
- Rule class
- Selector class
- Pseudo class
- Support to data URI
