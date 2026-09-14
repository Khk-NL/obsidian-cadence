# Changelog

## 0.16.4

- Expanded English/zh-CN switching across navigation, page descriptions, dashboards, reports, templates, settings, placeholders, tooltips, notices and confirmation dialogs.
- Localized dynamic counts and chart labels while preserving technical identifiers and user-authored note content.
- Added a localization audit script for static UI strings.

## Unreleased

- Added CNY currency and centralized runtime UI text localization for Cadence surfaces.
- Merged upstream PR #10 as the local baseline for project task mirrors, milestones, and Project Dashboard widgets.
- Made Project → Daily Note mirrors non-destructive: Cadence updates or removes only lines it created with a source marker. Existing user tasks are never selected merely because their title matches.
- Added modular localization and timezone foundations. English remains the fallback; `zh-CN` can follow Obsidian automatically.
- Added a read-only Super Productivity provider boundary. It is intentionally not connected to UI or write operations yet.
