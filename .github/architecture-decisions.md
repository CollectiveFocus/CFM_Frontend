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
