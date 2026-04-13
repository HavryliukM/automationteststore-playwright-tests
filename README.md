# Automation Test Store - Playwright Tests

## 🇸🇰 Slovak version

Tento repozitár obsahuje automatizované E2E testy pre e-commerce projekt [Automation Test Store](https://automationteststore.com/). Testy sú implementované v [Playwright](https://playwright.dev/) s využitím [Page Object Model (POM)](https://playwright.dev/docs/pom) architektúry.

---

## 🇬🇧 English version

This repository contains automated E2E tests for the [Automation Test Store](https://automationteststore.com/) e-commerce project. Tests are implemented using [Playwright](https://playwright.dev/) with the [Page Object Model (POM)](https://playwright.dev/docs/pom) architecture.

---

## ⚙️ Installation / Inštalácia

```bash
# 1. Clone the repository / Klonovanie repozitára
git clone https://github.com/YOUR_USERNAME/automationteststore-playwright-tests.git
cd automationteststore-playwright-tests

# 2. Install dependencies / Inštalácia závislostí
npm install

# 3. Install Playwright browsers (run once) / Inštalácia prehliadačov
npx playwright install --with-deps
```

---

## 🧪 Available test commands / Dostupné príkazy na spustenie testov

### Basic / Základné
```bash
npm run test              # Spustiť všetky testy (headless, paralelne)
npm run test:ui           # Interaktívny UI mód
npm run report            # Otvoriť HTML report v prehliadači
```

### Advanced / Pokročilé
```bash
npx playwright test                       # Základné spustenie
npx playwright test --ui                  # UI mód
npx playwright test --headed               # Viditeľný prehliadač (headless=false)
npx playwright test --workers=1           # 1 worker (sekvenčne, stabilné)
npx playwright test --workers=4           # 4 workers (paralelne, rýchlejšie)
npx playwright test --debug                # Debug mód s breakpointmi
npx playwright test tests/01-*.spec.ts    # Jeden konkrétny test
npx playwright test --list                # Zobraziť dostupné testy
```

### CI/CD
```bash
npx playwright test --reporter=github      # GitHub Actions formát
npx playwright test --reporter=line        # Konzolový výstup
```

### Workers configuration / Konfigurácia workerov

| Príkaz | Popis |
|--------|-------|
| `--workers=1` | Sekvenčné spustenie (stabilné, pomalšie) |
| `--workers=4` | Paralelné (rýchlejšie, môže byť flaky) |
| `--workers=undefined` | Automaticky podľa CPU jadier |

**Pre CI:** Workers=1 + retries=2 (už nakonfigurované v `playwright.config.ts`)

---

## 📊 Opening test report / Otvorenie test reportu

```bash
# Otvorí HTML report v predvolenom prehliadači
npm run report

# Alternatíva
npx playwright show-report

# Manuálne - otvor v prehliadači:
# playwright-report/index.html
```

Report sa automaticky generuje po každom spustení testov. Pri zlyhaní testov obsahuje screenshoty a trace.

---

## 🧪 Test Scenarios / Testovacie scenáre

| # | Test file | Slovak | English |
|---|-----------|--------|---------|
| 01 | `01-search-and-buy.spec.ts` | E2E nákupný flow | E2E purchase flow |
| 02 | `02-category-filter.spec.ts` | Kategórie + filtrácia | Categories + filtering |
| 03 | `03-cart-multiple-items.spec.ts` | Košík s viacerými položkami | Multi-item cart |
| 04 | `04-url-breadcrumbs.spec.ts` | Breadcrumbs + URL validácia | Breadcrumbs + URL validation |
| 05 | `05-negative-search.spec.ts` | Negatívne vyhľadávanie | Negative search test |

### 01 - Search and Buy / Vyhľadanie a nákup
**File:** `tests/01-search-and-buy.spec.ts`

Steps / Kroky:
1. Otvoriť homepage → Open homepage
2. Vyhľadať "Bronzer" → Search for "Bronzer"
3. Overiť výsledky → Verify results contain "Skinsheen Bronzer Stick"
4. Otvoriť detail produktu → Open product detail
5. Overiť názov, cenu, dostupnosť → Verify name, price, availability
6. Pridať do košíka → Add to cart
7. Overiť 1 položku v košíku → Verify 1 item in cart
8. Overiť názov a cenu v košíku → Verify name and price in cart
9. Odstrániť produkt → Remove product
10. Overiť prázdny košík → Verify empty cart

### 02 - Category Filter / Kategórie a filtrácia
**File:** `tests/02-category-filter.spec.ts`

Steps / Kroky:
1. Prejsť do kategórie "Skincare" → Navigate to "Skincare"
2. Overiť zobrazenie produktov → Verify products are displayed
3. Zoradiť podľa "Name A - Z" → Sort by "Name A - Z"
4. Overiť zoradenie → Verify alphabetical sorting
5. Otvoriť prvý produkt → Open first product

### 03 - Multi-item Cart / Košík s viacerými položkami
**File:** `tests/03-cart-multiple-items.spec.ts`

Steps / Kroky:
1. Pridať produkt zo Skincare → Add product from Skincare
2. Pridať produkt z Makeup → Add product from Makeup
3. Overiť 2 položky, názvy, ceny → Verify 2 items, names, prices
4. Zmeniť množstvo na 2 → Change quantity to 2
5. Overiť aktualizáciu ceny → Verify price update
6. Odstrániť 1 položku → Remove 1 item
7. Overiť že druhá zostala → Verify second item remains

### 04 - Breadcrumbs and URL / Breadcrumbs a URL
**File:** `tests/04-url-breadcrumbs.spec.ts`

Steps / Kroky:
1. Prejsť do "Makeup" → Navigate to "Makeup"
2. Otvoriť podkategóriu "Cheeks" → Open subcategory "Cheeks"
3. Overiť breadcrumb: Home > Makeup > Cheeks → Verify breadcrumb
4. Skontrolovať URL pattern → Check URL pattern
5. Vrátiť sa cez breadcrumb → Navigate back via breadcrumb
6. Overiť správnu kategóriu → Verify correct category

### 05 - Negative Search / Negatívne vyhľadávanie
**File:** `tests/05-negative-search.spec.ts`

Steps / Kroky:
1. Hľadať "qwertynonsensesuperproduct123" → Search for nonexistent product
2. Overiť hlášku "no product matches" → Verify "no results" message
3. Overiť prázdny zoznam → Verify empty product list
4. Overiť vizuálnu konzistentnosť → Verify visual consistency

---

## 🏗️ POM Architecture / Architektúra POM

```
BasePage.ts              # Zdieľané elementy a metódy / Shared elements and methods
├── searchInput          # Vyhľadávacie pole / Search input
├── searchButton         # Tlačidlo vyhľadávania / Search button
├── cartTopIcon          # Ikona košíka / Cart icon
├── searchFor()          # Vyhľadávanie produktu / Search for product
└── goToCart()           # Prejsť do košíka / Go to cart

HomePage.ts              # Navigácia na homepage / Homepage navigation
├── navigateToSkincare() # Kategória Skincare
└── navigateToMakeup()    # Kategória Makeup

CategoryPage.ts          # Stránka kategórie / Category page
├── productNames         # Názvy produktov / Product names
├── productGrids         # Grid produktov / Product grids
├── sortBy()             # Zoradenie produktov / Sort products
├── verifyProductsAreSorted() # Overenie zoradenia / Verify sorting
└── openProduct()        # Otvoriť produkt / Open product

SearchResultsPage.ts     # Výsledky vyhľadávania / Search results
├── productNames         # Názvy produktov / Product names
├── emptyContentMessage  # Správa "nenájdené" / "No results" message
├── verifyProductIncluded() # Overiť existenciu produktu / Verify product exists
├── openProduct()        # Otvoriť produkt / Open product
└── verifyNoResults()    # Overiť prázdne výsledky / Verify no results

ProductDetailsPage.ts    # Detail produktu / Product detail
├── productName          # Názov produktu / Product name
├── productPrice         # Cena produktu / Product price
├── addToCart()          # Pridať do košíka / Add to cart
└── verifyProductDetails() # Overiť detaily / Verify details

CartPage.ts              # Stránka košíka / Cart page
├── cartItems            # Položky v košíku / Cart items
├── productNames         # Názvy v košíku / Product names
├── removeButtons        # Tlačidlá odstrániť / Remove buttons
├── emptyCartMessage     # Správa prázdneho košíka / Empty cart message
├── verifyItemCount()    # Overiť počet položiek / Verify item count
├── verifyProductInCart() # Overiť produkt v košíku / Verify product in cart
├── removeItem()         # Odstrániť položku / Remove item
├── updateQuantity()     # Zmeniť množstvo / Update quantity
└── verifyCartIsEmpty()  # Overiť prázdny košík / Verify empty cart
```

---

## 📁 Project Structure / Štruktúra projektu

```
automationteststore-playwright-tests/
├── pages/                    # Page Object Models
│   ├── BasePage.ts           # Základná trieda / Base class
│   ├── HomePage.ts           # Homepage / Domovská stránka
│   ├── CategoryPage.ts       # Kategória / Category
│   ├── SearchResultsPage.ts  # Výsledky vyhľadávania / Search results
│   ├── ProductDetailsPage.ts # Detail produktu / Product detail
│   └── CartPage.ts           # Košík / Cart
├── tests/                    # E2E testy / E2E tests
│   ├── 01-search-and-buy.spec.ts
│   ├── 02-category-filter.spec.ts
│   ├── 03-cart-multiple-items.spec.ts
│   ├── 04-url-breadcrumbs.spec.ts
│   └── 05-negative-search.spec.ts
├── .github/workflows/         # CI/CD pipeline
│   └── playwright.yml        # GitHub Actions konfigurácia
├── playwright-report/         # Test reports (generated)
├── playwright.config.ts       # Playwright konfigurácia
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## 📊 CI/CD

GitHub Actions workflow je nakonfigurovaný v `.github/workflows/playwright.yml`. Automaticky spúšťa testy pri:
- Push do main/master vetvy
- Pull requestoch

Pre spustenie manuálne:
```bash
# V CI režime (1 worker, 2 retries pre flaky testy)
CI=true npm run test
```

---

## 📋 Requirements / Požiadavky

- Node.js v18+
- npm

## 📄 License / Licencia

ISC
