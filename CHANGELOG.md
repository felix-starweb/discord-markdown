# [1.1.3] (2023-11-30)
- Fixed
  - Vue plugin options wasnt marked as optional

# [1.1.2] (2023-11-19)
- Fixed
  - Package.json exports updated to include style, type and require files.
  - Issue with Install code example in README

# [1.1.1] (2023-11-03)
- Added
  - Npm package install to documentation.

# [1.1.0] (2023-11-03)

- Added
  - Demo page.
  - Typescript support.
  - GetHTML & GetNestedHTML to exports.
  - Improved documentation.
  - Default inline for simplemarkdown is now false.
  - Inline code handling.
  - Autolink parsing
  - List item default class
  - Text formatting is now default html elements instead of span.
  - Vite is now the bundler.
  - Build improvements:
    - .cjs file is now added to build.
    - Styling added to build.
  - package.json improvements:
    - Style key,
    - Exports key,
- Removed
  - HighlightJS instance export (Still able to be injected into Vue globalProperties).
  - Simple-markdown instance export (Still able to be injected into Vue globalProperties).
- Fixed
  - Lines wont break with a new line.
  - Headers should now include extra hashtags.
  - Code blocks can now include more characters in programming language name.
  - Br tags should appear more often now.
  - Empty lines at end of input are removed.

 # [1.0.2] (2023-10-10)

- Added
  - Missing export to index.d.ts

# [1.0.1] (2023-10-09)

- Added
  - Changelog to package.json
- Removed
  - Removed module.exports

# [1.0.0] (2023-10-09)
- Added
  - Vue support
  - Markdown parsing according to Discord spec
  - basic README
  - tests
  - Rollup config
  - Eslint rules
  - tsconfig