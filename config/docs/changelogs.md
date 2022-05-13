# Changelogs

## Theme changer

1. click setting and select system theme, so app will inherit system theme.
2. click dark/light theme to override system preference.

## Loading

1. Spinner. On init while validating user, you will see a spinner.
2. Skeleton loader. On fetching services you will see skeleton loader on card and pagination.

## Search functionality

1. debounced search. While user search ends after 600ms UI will ping BE to get data.
2. On search pagination would be set to 0. As pagination might change when filtering data.
3. On clear search api will be called immediatly without a debounce and pagination will also be cleared.
4. On no data for search result. Warning would be shown. No data found for given search term "Practicasdasdasdasdal"
5. While fetching data, search input will be disabled.

## Pagination

1. As on pagignation total count won't change, there won't be any skeleton loading on pagination. skeleton loading will only be on cards.
2. On first page left pagination will be disabled.
3. On last page right pagination will be disabled.

## Service cards

1. version text is pluralized. EX: 0 Versions, 1 Version, 2 Versions.
2. Name text is single line and goes in ellipses.
3. Desc text goes in ellipses after 4th line.

## Technical stand point

1. Made code as resuable as possible. Instead of creating single file with all code, created components, utils as much as possible.
2. Use theme varaibles, font variables and spacing variables.
3. Created namespaced store module and lazy loaded them instead of pushing all store to base store.
4. Created useDebounce util to debounce fetch of api.

## e2e test

1. Created a simple test case.

## git hooks and git actions for commit message validation

As you were interested in commit message validation, just tagging my other git repo were I implemented git hooks

1. Git hooks to validate commit message. https://github.com/allset-inc/UI/tree/main/config/githooks
2. Auto insert jira link in PR body. https://github.com/allset-inc/UI/blob/main/.github/workflows/update-pr-desc.yml
