# Review: Fridge Finder

1. UI Design

   - code implements all the elements from the linked Figma node
   - uses rounded MUI icons

1. Code Quality

   - there are no linting warnings in the shell terminal
   - there are no errors in the browser console
   - [no superfluous React import](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports)
   - must not import `styled` from '@mui/material/styles' or '@emotion/styled'

1. Test

   - ui component has a snapshot test
   - ui behaviour is tested

1. File Structure

   - ui component is in the correct directory `/atoms, /molecules, /organisms`
   - ui component file name communicates its purpose
   - library function is in a `/lib` module
   - library function is documented

1. Commit

   - atomic commit
