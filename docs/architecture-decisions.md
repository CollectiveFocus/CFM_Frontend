# Architecture Decisions

## 2022-05-26 -- CSS Engine

[MUI recommends the use of emotion for CSS styling](https://mui.com/material-ui/guides/styled-engine/).

> Warning: Using styled-components as an engine at this moment is not working when used in a SSR projects. The reason is that the babel-plugin-styled-components is not picking up correctly the usages of the styled() utility inside the @mui packages. For more details, take a look at this issue. We strongly recommend using emotion for SSR projects.

## 2022-07-17 -- Deprecate the use of styled()

The following functions have been deprecated because they are slow to render, cause issues with css caching, and cannot be rendered server side. Use the MUI/System `sx` prop instead.

```js
import { styled } from '@mui/material/styles';
import { styled } from '@emotion';
```

## 2022-07-17 -- API field sizes

Tag : 140 characters. The size of a twitter hash tag.

Location.street : 55 characters. The longest street name in the U.S. is 38 characters long: "Jean Baptiste Point du Sable Lake Shore Drive" located in Chicago, Illinois. eg: 1001 Jean Baptiste Point du Sable Lake Shore Drive #33

Location.city : 35 characters. The longest city name in the U.S. is "Village of Grosse Pointe Shores" in Michigan.

Maintainer.name : 70 characters. https://stackoverflow.com/questions/30485/what-is-a-reasonable-length-limit-on-person-name-fields

## 2022-07-23 -- Standardize to bash shell

Standardizing all script commands for bash has proven more complicated than it is worth. The node runtime and `yarn dev` execute commands via the system shell. Overriding this to use bash has proven difficult because the configuration steps differ between the various node versions and yarn versions. In addition the bash directory path is not POSIX compliant in Windows and MacOS. `/usr/bin/bash` wont work in either.

## 2023-02-10 -- Internationalization Library

Here are the concerns we have in view of adding internationalization library.

1.  What is the problem we are trying to solve: Add translation library so the app can be translated to most spoken languages in New York (English, Spanish and Chinese but Chinese will be for later)

2.  Scope of the problem: The scope of the translation problem is to provide support for multiple languages in the application. This includes translating all dialog text, error messages, user-submitted status messages, and regionalizing date, time, and number formats.

3.  Limitations: One potential limitation of the translation feature is the availability and quality of translations for less common languages. Additionally, the UI design of the application may need to be adjusted to accommodate longer translations or different writing systems (e.g. right-to-left scripts).

4.  Translation library: “next-i18next” because it’s works well with next JS, It offers features like server-side rendering, support for language detection, and dynamic loading of translations. It’s also compatible with most popular translation management tools.

5.  Where is the data going to come from?: UI translations will come from translation files or a translation management system. But since the status(Unknown text) of the fridges will be translated we can use a tool like Google Translate API or Deepl Translator API to automatically translate data from users and added to the database so that it’s loaded when that language is the selected language in the frontend
    Please give me your impressions. I haven't started with the demo yet

List of possible translation libraries:

1.  react-i18next (i18next):

    - PROS

      - weekly downloads: 2.1 million - Widely used and popular library - Provides features like advanced pluralization, language detection, and fallback. - API is intuitive and simple

    - CONS:
      - bundle size: approx 22.2KB
      - Too many features and may be overwhelming
      - Steeper learning curve compared to other libraries

2.  react-intl (FormatJS):

    - PROS
      - weekly downloads: 1.1 million
      - provides excellent support for complex plurals, date formatting, and number formatting
      - bundle size: 17.8KB
      - frequently updated

    * CONS: - doesn’t provide solutions for language detection or translation file loading - Documentation is a bit tricky to navigate

3.  LinguiJS:

    - PROS:

      - Simple and intuitive API
      - provides built-in support for handling pluralization and gender in different languages
      - bundle size: 2.5KB
      - Source code based: LinguiJS uses the source code of your application to extract translatable strings, making it easier to maintain consistency and accuracy of translations.

    - CONS:
      - learning curve for developers
      - documentation is serviceable if a bit hard to navigate
