<p align="center">
  <a href="https://www.fridgemap.com/">
    <img src="https://raw.githubusercontent.com/CollectiveFocus/CFM_Frontend/dev/public/feedback/happyFridge.svg" height="128">
  </a>
  <h1 align="center">Fridge Finder</h1>
</p>

<p align="center">
  <a aria-label="Collective Focus logo" href="https://collectivefocus.site/">
    <img src="https://img.shields.io/badge/sponsor-Collective%20Focus-yellow?style=flat-square&labelColor=F6F6F6">
  </a>
  <a aria-label="License" href="https://github.com/CollectiveFocus/CFM_Frontend/blob/dev/docs/LICENSE">
    <img alt="" src="https://img.shields.io/github/license/CollectiveFocus/CFM_Frontend?style=flat-square&labelColor=F6F6F6">
  </a>
  <a aria-label="GitHub Repo stars" href="https://github.com/CollectiveFocus/CFM_Frontend/">
    <img alt="" src="https://img.shields.io/github/stars/CollectiveFocus/CFM_Frontend?style=flat-square&labelColor=F6F6F6">
  </a>
  <img aria-label="GitHub contributors" alt="GitHub contributors" src="https://img.shields.io/github/contributors/CollectiveFocus/CFM_Frontend?style=flat-square&labelColor=F6F6F6">
  <img aria-label="GitHub commit activity (dev)" alt="GitHub commit activity (dev)" src="https://img.shields.io/github/commit-activity/m/CollectiveFocus/CFM_Frontend/dev?style=flat-square&labelColor=F6F6F6">
  <a aria-label="Join the community on Discord" href="https://discord.com/channels/955884900655972463/955886184159125534">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20community-yellow.svg?style=flat-square&logo=Discord&labelColor=F6F6F6">
  </a>
</p>

A community fridge is a decentralized resource where businesses and individuals can [donate perishable food](https://www.thrillist.com/lifestyle/new-york/nyc-community-fridges-how-to-support). There are dozens of fridges hosted by volunteers across the country. The Fridge Finder website is available at [fridgefinder.app](https://fridgefinder.app/)

Fridge Finder is a project sponsored by [Collective Focus](https://collectivefocus.site/), a community organization in Brooklyn, New York. Our goal is to make it easy for people to find fridge locations and get involved with food donation programs in their community. We are building a responsive, mobile first, multi-lingual web application with administrative controls for fridge maintainers. To join the project read our [contributing guidelines](./CONTRIBUTING.md) and [code of conduct](./CODE_OF_CONDUCT.md).

<h2>Made possible by contributions from these lovely people &hellip;</h2>
<p align="center">
  <a href = "https://github.com/CollectiveFocus/CFM_Frontend/graphs/contributors">
    <img src = "https://contrib.rocks/image?repo=CollectiveFocus/CFM_Frontend"/>
  </a>
</p>
<h3 align="right">❤ Thank you for all your hard work</h3>

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
   npm install --global only-allow yarn prettier svgo lint-staged concurrently json-server
   corepack enable # for yarn
   ```

1. Setup the frontend environment

   ```bash
   git clone https://github.com/CollectiveFocus/CFM_Frontend frontend
   cd frontend
   git checkout dev
   yarn install
   ```

1. Run the application locally

   ```bash
   # to run both development database and Next.js web server
   yarn dev

   # to run only the web server
   yarn web

   # to run only the development database
   yarn data
   ```

   in a different terminal window

   ```bash
   start   "Google Chrome" http://localhost:3000/ # Windows
   open -a "Google Chrome" http://localhost:3000/ # MacOS
   ```
