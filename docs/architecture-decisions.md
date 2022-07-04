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
