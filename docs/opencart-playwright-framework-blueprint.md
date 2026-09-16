# OpenCart Playwright Framework Blueprint

Use this document as a reference or prompt for another AI to recreate a framework similar to this repository.

## Framework Summary

Build a TypeScript Playwright automation framework for the OpenCart web application. The framework should support UI tests using the Page Object Model, fixture-based dependency injection, data-driven tests from CSV/Excel/JSON, API tests through Playwright request fixtures, environment-based configuration, and HTML/Allure reporting.

## Tech Stack

- Language: TypeScript
- Test runner: Playwright Test
- Browser automation: Playwright
- API testing: Playwright `APIRequestContext`
- Environment config: `dotenv`
- Data readers: `csv-parse`, `xlsx`, native JSON parsing
- Reports: Playwright HTML reporter and Allure reporter
- CI: GitHub Actions

## Target Folder Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── config/
│   ├── .env.dev
│   ├── .env.qa
│   └── .env.stage
├── src/
│   ├── api/
│   │   └── ApiHelper.ts
│   ├── data/
│   │   ├── loginData.csv
│   │   ├── logindata.json
│   │   ├── OpenCartTestData.xlsx
│   │   └── product.csv
│   ├── fixtures/
│   │   ├── apifixtures.ts
│   │   └── pagefixtures.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductInfoPage.ts
│   │   └── SearchResultsPage.ts
│   └── utils/
│       ├── CsvHelper.ts
│       ├── ExcelHelper.ts
│       └── JsonHelper.ts
├── tests/
│   ├── api/
│   │   ├── users.api.indi.spec.ts
│   │   ├── users.api.sep.spec.ts
│   │   └── users.api.spec.ts
│   ├── homepage.spec.ts
│   ├── homepagefix.spec.ts
│   ├── loginpage.spec.ts
│   ├── loginpagefix.spec.ts
│   ├── productpage.spec.ts
│   └── search.spec.ts
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Design Pattern

Use the Page Object Model.

- `BasePage` stores shared locators and actions available across OpenCart pages, such as logo, search box, search button, currency selector, cart button, footer links, page title, and screenshot helper.
- Each feature page extends `BasePage`.
- Page classes expose business actions rather than raw locators.
- Test files should call methods like `loginPage.doLogin()`, `homePage.doSearch()`, and `productInfoPage.getProductInfo()`.

## Page Classes

Create these page objects:

- `BasePage.ts`: common locators and generic actions.
- `LoginPage.ts`: login page navigation, login action, forgotten password check, invalid login error check.
- `HomePage.ts`: logged-in account page checks, logout link validation, account page headers, product search.
- `SearchResultsPage.ts`: product result count and product selection by name.
- `ProductInfoPage.ts`: product header, image count, metadata, pricing, and combined product info map.

The constructors should accept Playwright `Page` and initialize locators there.

Example style:

```ts
export class LoginPage extends BasePage {
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async doLogin(username: string, password: string): Promise<void> {
    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}
```

## Fixtures

Create a page fixture file that extends Playwright base test and injects page objects into tests.

Required fixtures:

- `basePage`
- `loginPage`
- `homePage`
- `searchResultsPage`
- `productInfoPage`
- `testData`

The `testData` fixture should read CSV login data from `src/data/loginData.csv`.

Create an API fixture file that injects:

- `apiHelper`

The API helper should be constructed with Playwright `request` and `process.env.API_BASE_URL`.

## API Layer

Create `src/api/ApiHelper.ts` as a thin wrapper around Playwright API methods.

Required methods:

- `get(endpoint, headers?)`
- `post(endpoint, data, headers?)`
- `put(endpoint, data, headers?)`
- `delete(endpoint, headers?)`

Each method should call the matching Playwright request method and return a normalized object:

```ts
{
  status: response.status(),
  body: await response.json()
}
```

For delete, returning only `status` is acceptable.

## Data Utilities

Create reusable static helper classes:

- `CsvHelper.readCsv(filePath)` returns `Record<string, string>[]`.
- `ExcelHelper.readExcel(filePath, sheetName?)` returns rows from the selected sheet or first sheet.
- `JsonHelper.readJson(filePath)` returns parsed JSON rows.

Use these helpers for data-driven tests instead of hardcoding test data inside test cases.

## Environment Configuration

Use `dotenv` in `playwright.config.ts`.

The framework should load env files dynamically:

```ts
const ENV = process.env.ENV || 'qa';
dotenv.config({ path: `config/.env.${ENV}` });
```

Expected env keys:

```text
BASE_URL=
USERNAME=
PASSWORD=
API_BASE_URL=
API_Token=
```

Tests should run like this:

```bash
ENV=qa npx playwright test
```

## Playwright Config

Configure:

- `testDir: './tests'`
- `fullyParallel: true`
- `forbidOnly` on CI
- retries only on CI
- one worker on CI
- `baseURL: process.env.BASE_URL`
- screenshot only on failure
- trace on first retry
- video retained on failure
- Chromium project enabled

Reporters:

- list
- HTML report to `reports/html-report`
- Allure report to `allure-results`

## Test Design

Use fixture-based tests as the preferred style.

UI tests should cover:

- Login page title
- Forgotten password link
- Valid login
- Invalid login from CSV/Excel/JSON
- Home page title
- Logout link visibility
- Account page headers
- Product search count
- Search result product navigation
- Product image count
- Product metadata and pricing
- Common header/footer checks through `BasePage`

API tests should cover:

- Get users
- Create user
- Update user
- Delete user
- Create fresh test data during the test, then verify with GET where possible

## NPM Scripts

Add scripts:

```json
{
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:chrome": "npx playwright test --project=chromium",
  "allure:generate": "npx allure generate allure-results --clean -o allure-report",
  "allure:open": "npx allure open allure-report",
  "allure:report": "npm run allure:generate && npm run allure:open",
  "allure:clean": "rm -rf allure-results allure-report"
}
```

## CI Workflow

Create `.github/workflows/playwright.yml`.

The workflow should:

- Run on push and pull request to `main` or `master`
- Use Ubuntu latest
- Install Node LTS
- Run `npm ci`
- Install Playwright browsers with dependencies
- Run `npx playwright test`
- Upload the Playwright report as an artifact

## AI Build Prompt

Give this prompt to another AI:

```text
Create a TypeScript Playwright automation framework for OpenCart.

Use the Page Object Model with a shared BasePage and feature page classes for LoginPage, HomePage, SearchResultsPage, and ProductInfoPage. Store common OpenCart header/footer locators in BasePage. Each page object must accept Playwright Page in its constructor and expose business methods instead of exposing locators.

Add fixture-based dependency injection by extending Playwright test. Create pagefixtures.ts to provide basePage, loginPage, homePage, searchResultsPage, productInfoPage, and CSV testData. Create apifixtures.ts to provide apiHelper.

Add ApiHelper.ts as a wrapper around Playwright APIRequestContext with get, post, put, and delete methods. Build endpoints from process.env.API_BASE_URL and return normalized status/body results.

Add utility readers for CSV, Excel, and JSON data under src/utils. Store test data under src/data.

Configure playwright.config.ts to load config/.env.<ENV> using dotenv, defaulting ENV to qa. Use process.env.BASE_URL as baseURL. Enable Chromium, HTML reports, Allure reports, screenshots on failure, traces on first retry, and videos on failure.

Create tests for login, home page, search, product info, and API CRUD. Prefer fixture-based tests. Use environment variables USERNAME, PASSWORD, BASE_URL, API_BASE_URL, and API_Token. Add npm scripts for Playwright test execution and Allure report generation. Add GitHub Actions workflow for CI.
```

