# Architecture Reference

- [Architecture decisions](./architecture-decisions.md)
- [REST API Contract](../src/model/data/fridge/REST.yaml)

## Development environments

- Production (deployed from main branch): https://fridgefinder.app/
- Staging (deployed from dev branch): https://dev.fridgefinder.app/

## UI Design

- [Aspect Ratio Guide](https://www.cronyxdigital.com/blog/the-ultimate-website-image-guide)

**image aspect ratio (width:height)**

hero image
: aspect ratio is 16:9, preferred size 1366x768

paragraph image
: aspect ratio for mobile is 3:2, preferred size 414x276

fridge photo
: aspect ratio is 1:1.15, exact size 300x345

## Tools

### HTML Color

- [Color Hex to RGBA converter](https://bl.ocks.org/njvack/02ad8efcb0d552b0230d)

### Image Editor

- [XnView](https://www.xnview.com/en/)

**XnView:**

1. type in the width of 410
2. then select the aspect ratio of 3:2
3. the height should read 276
4. move the target around and crop

### REST API

- [API Editor](https://editor-next.swagger.io/)

### URL Encode

- [Encode SVG as URL](https://yoksel.github.io/url-encoder/)
- [URL encoder/decoder](https://meyerweb.com/eric/tools/dencoder/)

### Web Analytics

- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

## Frontend Libraries

- Application Framework: [Next.js](https://nextjs.org/docs/)
  - [Next.js tutorial](https://nextjs.org/learn)
  - [Next.js repository](https://github.com/vercel/next.js/)

- Type Checking: [prop-types](https://github.com/facebook/prop-types)
  - [prop-types tutorial](https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/)

- UI Components: [MUI](https://mui.com/material-ui/)

- UI Dialogs: [Formik](https://formik.org/docs/overview)
  - [Formik tutorial](https://formik.org/docs/tutorial)

- UI Dialog Validation: [Yup](https://github.com/jquense/yup)

- Geographical Maps: [Leaflet](https://leafletjs.com/), [React Leaflet](https://react-leaflet.js.org/)
  - [Leaflet quick start tutorial](https://leafletjs.com/examples/quick-start/)
  - [Leaflet mobile tutorial](https://leafletjs.com/examples/mobile/)
  - [Leaflet custom markers tutorial](https://leafletjs.com/examples/)

- REST API: [OpenAPI 3.0](https://swagger.io/docs/specification/about/)
  - [API Primer](https://restfulapi.net/)
  - [API Design Best Practices](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

- REST Mock Server: [json-server](https://github.com/typicode/json-server)

- Testing: [Jest](https://jestjs.io/docs/api), [React Testing Library](https://testing-library.com/docs/)

- State Management: [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

- Fuzzy Search: [fuze.js](https://www.fusejs.io/)

## Design philosophy

- [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/)
