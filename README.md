# Community Fridge Map -- Frontend

## System Requirements

1. [Node](https://nodejs.org/en/)

## System Setup

1. Verify your system meets the requirements

   ```bash
   node --version
   #> v17.8.0
   ```

1. Install global dependencies

   ```bash
   npm install --global only-allow yarn prettier csslint
   corepack enable
   ```

1. Setup the frontend environment

   ```bash
   git clone https://github.com/CollectiveFocus/CFM_Frontend frontend
   cd frontend
   git checkout dev
   yarn install
   yarn dev
   ```

   in a different terminal window

   ```bash
   start "Google Chrome" http://localhost:4000/   # Windows
   open -a "Google Chrome" http://localhost:4000/ # MacOS
   ```

## Resources

Project Documentation

- [Brainstorming](https://docs.google.com/document/d/1FYClUD16KUY42_p93rZFHN-iyp94RU0Rtw517vj2jXs/edit)
- [Architecture](https://docs.google.com/document/d/1yZVGAxVn4CEZyyce_Zuha3oYOOU8ey7ArBvLbm7l4bw/edit)
- [Development Workflow](https://docs.google.com/document/d/1m9Xqo4QUVEBjMD7sMjxSHa3CxxjvrHppwc0nrdWCAAc/edit)

Developer Communication

- [figma](https://www.figma.com/file/OL6J4By9EByk47n2JBx16D/NYC-FRIDGE?node-id=80%3A948)
- [trello](https://trello.com/b/UhEoUpnD/community-fridge-map-dev)
- [discord](https://discord.com/channels/955884900655972463/955884900655972468)
