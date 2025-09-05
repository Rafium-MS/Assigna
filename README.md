<div align="center">
  <h1 align="center">📍 Assigna</h1>
  <p align="center">
    A desktop application built with Electron and Node.js to efficiently manage territory assignments and field service records.
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg" alt="Node.js version">
  <img src="https://img.shields.io/badge/electron-27.0.0-cyan.svg" alt="Electron version">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Project status">
</div>

<p align="center">
  <a href="#about-the-project">About</a> •
  <a href="#✨-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

> [🇧🇷 Leia em Português](./README.pt-br.md)

---

## About the Project

![App Screenshot](./assets/screenshots/inicio.png)

**Territory Manager** is a desktop app to manage territory assignments for field work, track return dates, generate suggestions, and monitor activities with full audit logs and analytics dashboards.

Built with Electron, Node.js, and SQLite, the app is fully offline and uses a local database.

## ✨ Features

- ✅ **Territory Management**: Register, update and delete territories.
- ✅ **Field Groups (Saídas)**: Manage teams and the days they go out.
- ✅ **Assignments (Designações)**: Assign territories to groups with start and end dates.
- ✅ **Suggestions System**: Learns from historical usage to suggest optimal assignments.
- ✅ **User Accounts & Roles**: Admin and operator accounts with permission-based actions.
- ✅ **Reports & Printing**: Generate printable reports and export to PDF.
- ✅ **CSV Import/Export**: For all entities (territories, groups, assignments).
- ✅ **Dashboard with Charts**: Dynamic charts using Chart.js.
- ✅ **Settings Panel**: Multiple themes (light, dark and the new Liquid Glass Blue, Liquid Glass Amber and Translucent Black), font size, language and backups.
- ✅ **Toasts & Sounds**: Instant feedback on user actions.
- ✅ **Multi-language Support**: Switch between English and Portuguese.
- ✅ **Audit & Error Logs**: Export system and error logs to PDF/CSV.
- ✅ **Assignment History**: See which group handled each territory in the last 12 months. & Error Logs**: Export system and error logs to PDF/CSV.
- ✅ **Data Collection**: Trigger the territory scraper from the app and store the results.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js >= 18 and npm installed.

```bash
node -v
npm -v
```

### Installation

```bash
git clone https://github.com/Rafium-MS/designacoes_territorios.git
cd designacoes_territorios
npm install
npm run rebuild
```

Optional: set admin password

```bash
export ADMIN_PASSWORD=yourStrongPassword
```

### Running Tests

```bash
npm install
npm test
```

### Running the App

```bash
npm start
```

When you run the app for the first time it will create a local `db.sqlite`
database in the project directory. All application logs are stored under the
`logs/` folder and any CSV or database backups are saved inside `Backup/`.

### Scraping Territories

```bash
node scripts/scrapeTerritorios.js
```

Set `TERRITORIOS_URL` to change the source URL or `SAVE_TO_DB=true` to insert
the results directly into the local database.
You can also run the scraper inside the application on the **Coleta** screen, which always saves the data.

## 📚 Usage

- **Index**: Welcome page with tips and app overview.
- **Territories**: Add or edit territory records.
- **Field Groups**: Manage group names and days of activity.
- **Assignments**: Assign and track territory usage over time.
- **Suggestions**: Generate learning-based suggestions for new assignments.
- **Reports**: View, filter and print assignment reports.
- **Dashboard**: Visual stats and charts (monthly activity, active/inactive territories, etc).
- **System Logs**: Access and export logs from application or errors.
- **Settings**: Interface customization and backup options.
- **Help**: Step-by-step guide and FAQ.
- **About**: App version, developer and credits.

## 🤝 Contributing

Feel free to fork and improve. Pull requests are welcome!

## ⚖️ License

MIT — see `LICENSE.md`.

## 📬 Contact

Developed by **Macete Systems** — [macetesystems@gmail.com](mailto:macetesystems@gmail.com)