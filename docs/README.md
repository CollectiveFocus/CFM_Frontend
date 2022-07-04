# Frontend: Community Fridge Map

A community fridge is a decentralized resource where businesses and individuals can [donate perishable food](https://www.thrillist.com/lifestyle/new-york/nyc-community-fridges-how-to-support). There are dozens of fridges hosted by volunteers across the country.

Our goal is to make it easy for people to find fridge locations and get involved with food donation programs in their community. We are building a responsive, mobile first, multi-lingual web application, with administrative controls for fridge maintainers. Please read our [contributing guidelines](./CONTRIBUTING.md) and [code of conduct](./CODE_OF_CONDUCT.md) if you would like to join our project. Our application will be deployed to https://www.fridgemap.com/

## System Requirements

1. [Node](https://nodejs.org/en/)

## System Setup

1. Verify your system meets the requirements

   ```bash
   node --version  # must be greater than 12.22.0
   # v17.8.0
   ```

1. Install global dependencies

   ```bash
   npm install --global only-allow yarn
   corepack enable # for yarn
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
