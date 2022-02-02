<!-- CSSObject.js - Logo -->
<img width="80%" src="https://user-images.githubusercontent.com/22013212/132960807-2afde61b-d873-413d-834b-778918b04caf.png">

<!-- Badges -->
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KugiHaito/CSSObject.js?style=flat-square)
![GitHub](https://img.shields.io/github/license/KugiHaito/CSSObject.js?style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/KugiHaito/CSSObject.js?style=flat-square)
![npm](https://img.shields.io/npm/v/cssobjectjs?color=red&style=flat-square)

<!-- Title and description -->
# CSSObject.js
A Parser CSS in Javascript Vanilla

## Summary
- [Overview](#overview)
    - [Usage](#usage)
    - [Supports](#supports)
- [Structure](#structure)
    - [Project Structure](#project-structure)
    - [CSSObject Structure](#cssobject-structure)
- [Be a Contributor!](#be-a-contributor)

<!-- Overview -->
## Overview

This project was started from the idea of reading CSS files, to implement an alternative functionality, which I call Pseudo-Event for dynamic styling of elements from CSS. Initially, it was just a gists, but as the code developed, the project expanded.

### Usage

<!-- Simple Usage -->
#### Simple Usage

The fast way is using UNPKG link:

```html
<script src="https://unpkg.com/cssobjectjs@latest/cssobject.js"></script>
```

sample code:
```javascript
// normal
const cssobj = new CSSObject()

// get local stylesheets
cssobj.local(style => {
    // parsed local style!
    console.log(style)
})

// get external stylesheets
cssobj.external(style => {
    // parsed external style!
    console.log(style)
})

// static stylesheet
cssobj.static(".blob { background-color: #d7d7d7; }", style => {
  // parsed static style
  console.log(style)
})
```

or use alias `CSSObj` to **CSSObject** instance:
```javascript
// using alias
CSSObj.options({load_min: false})
  .local(style => console.log(style))
  .external(style => console.log(style))
  .static(".blob { background-color: #d7d7d7; }", style => console.log(style))
```

<!-- Usage with full code -->
#### Full Usage Mode
In your html, use `type="module"` in `<script>` tag:

```html
<script src="./main.js" type="module"></script>
```

In `main.js` you can use CSSObject to get local stylesheets, styles inside `<style>` tag in your HTML, or external stylesheets _(link)_, 
see:

```javascript
import CSSObject from "CSSObject/CSSObject.js"


// instace CSSObject
let cssobj = new CSSObject()

// get local stylesheets
cssobj.local(style => {
  // parsed local style!
  console.log(style)
})

// get external stylesheets
cssobj.external(style => {
  // parsed external style!
  console.log(style)
})
```
_the external method use a callback in promise, so it has a short call delay..._

You can use the method `.options()`, to filter external stylesheets
```javascript
cssobj.options({
  load_min: false, // '.min.css' (default is `true`)
  ignore_files: [], // ignored if `only_files` not empty
  only_files: []
}).external(style => {
  console.log(style)
})
```
the `options` object can also be passed in **CSSObject** constructor, and haven't effect for local stylesheets

<!-- code supports -->
### Supports
See on table, what statments and others things this parser supports:

#### CSS At-Rules
| Statment      | Example                                                 | Supports |
|---------------|---------------------------------------------------------|----------|
| Charset       | `@charset <type>`                                       |    ✅   |
| Namespace     | `@namespace <prefix?> <URL>`                            |    ❌   |
| Import        | `@import <URL> <where?>`                                |    ✅   |
| Font Face     | `@font-face { <rules> }`                                |    ✅   |
| Keyframes     | `@keyframes <name> { <blocks> }`                        |    ✅   |
| Media Query   | `@media <query> { <blocks> }`                           |    ✅   |
| Support       | `@supports <where> { <blocks> }`                        |    ❌   |
| Font Feature  | `@font-feature-values <family-name> { <blocks> }`       |    ❌   |
| Counter Style | `@counter-style <name> { <rules> }`                     |    ❌   |
| Page          | `@page <where> { <rules> }`                             |    ❌   |

see about this statments and others [at-rules here](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule)

#### Others
| Data URI | `data:[<media-type>];[base64],<data>` | ✅ |
| --- | --- | --- |
| Comment | `/*<text>*/` | ✅ |

<!-- Structure Project and Folders -->
## Structure
Now, understand how the CSSObject, object class, and file and folder segments are structured

### Project Structure
First, I need to show the organization of the project

```yml
CSSObject:
  enums: # auxiliary files as interfaces
    ICombiner.js
    ICSS.js
    ICSSStatments.js
    IMedia.js
    ISelector.js
    IPseudo.js
    IUnit.js
  parser: # files responsible for data processing
    BlocksParser.js
    CommentBlock.js
    ParserBlock.js
    StatmentsParser.js
    Stylesheet.js
  queries: # classes thats work of queries part
    Selector.js
    Pseudo.js
  rules: # classes thats work of rules statments
    BlockRule.js
    CharsetRule.js
    FontfaceRule.js
    FunctionRule.js
    ImportRule.js
    KeyframeRule.js
    MediaRule.js
    QuerieRule.js
    Rule.js
    VariableRule.js
  CSSObject.js
  CSSParser.js
example.css # example css code
index.html
main.js # usage of `CSSObject.js`
```

### CSSObject Structure
See below, the objects and their properties that are returned

- [CSSObject](#cssobject)
- [Stylesheet](#stylesheet)
  - [BlockRule](#block-rule)
  - [CommentBlock](#comment-block)
- [Rule](#rule)
  - [VariableRule](#variable-rule)
  - [FunctionRule](#function-rule)
  - [CharsetRule](#charset-rule)
  - [ImportRule](#import-rule)
  - [FontFaceRule](#font-face-rule)
  - [KeyframeRule](#keyframe-rule)
  - [MediaRule](#media-query-rule)
  - [QuerieRule](#querie-rule)
- [Selector](#selector)
    - [Pseudo](#pseudo)


#### CSSObject
```yml
CSSObject:
  options(options: object)
  static(text: string, callback: function)
  local(callback: function, all: boolean?)
  external(callback: function) # callback in promise

```
callbacks functions return [**Stylesheet**](#stylesheet) object

#### Stylesheet
```yml
Stylesheet:
  cssText: string # contains break-lines and spaces
  css: string # clean string (without break-lines and spaces)
  comments: CommentBlock[]
  blocks: BlockRule[]
  variables: VariableRule[]
  filename: string | null
  statments: {
    charsets: CharsetRule[],
    imports: ImportRule[],
    fontfaces: FontfaceRule[],
    keyframes: KeyframeRule[],
    medias: MediaRule[],
  }
```

##### Block Rule
```yml
BlockRule:
  query: string
  selectors: Selector[]
  rules: Rule[]
```

##### Comment Block
```yml
CommentBlock:
  text: string
  comment: string # like `text` property (without break-lines and spaces)
  line: number | number[]
```

#### Rule
```yml
Rule:
  property: string
  value: string | string[] | FunctionRule
  values: object[] # ex.: "10px" => [{value: 10, unit: "PIXELS"}]
  prop: string # alias to `property`
  isImportant: boolean
```

##### Variable Rule
```yml
VariableRule:
  name: string
  value: string | string[] | FunctionRule
  scope: string
  statment: string
```

##### Function Rule
```yml
FunctionRule:
  name: string
  value: string | string[] # may contains FunctionRule object
```

##### Charset Rule
```yml
CharsetRule:
  type: string
```

##### Import Rule
```yml
ImportRule:
  url: string
  where: string[] # may contains Rule object
```

##### Font Face Rule
```yml
FontFaceRule:
  name: string # `font-family` value
  rules: Rule[]
```

##### Keyframe Rule
```yml
KeyframeRule:
  name: string
  blocks: BlockRule[]
```

##### Media Query Rule
```yml
MediaRule:
  query: string
  queries: QuerieRule[]
  blocks: BlockRule[]
```

##### Querie Rule
```yml
QuerieRule:
  rules: Rule[]
  types: string[]
  only: boolean
  not: boolean
```

#### Selector
```yml
Selector:
  name: string
  type: 'UniversalSelector' | 'IDSelector' | 'ClassSelector' | 'AttrSelector' | 'PseudoSelector' | 'HTMLSelector'
  hasCombiner: boolean
  pseudo?: Pseudo # has if `hasCombiner` is `false`
  selectors?: Selector[] # has if `hasCombiner` is `true`
```

##### Pseudo
```yml
Selector:
  name: string
  type: 'PseudoClass' | 'PseudoElement' | 'PseudoEvent'
  value?: string # has if pseudo contains parameters
```
_the type **PseudoEvent** is a custom support of CSSObject not has on CSS language_


## Be a Contributor

- This project was plan, writted and develop by [Kugi Haito](https://github.com/KugiHaito) 🍪
- Did you like my project? give _star_ or _fork_ to help, thanks 😁
- would you like to be a contributor? make me a _Pull Request_!
