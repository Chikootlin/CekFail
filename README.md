# CekFail

CekFail started from a simple curiosity while playing CTF challenges and exploring file forensics. During competitions and practice sessions, I often needed to inspect hashes, extract strings, check suspicious indicators, or quickly view hexadecimal data from files. The problem was that most of these tasks required switching between multiple different tools and websites.

At some point, I started thinking:

“What if I just build a single website that makes this easier for my friends and other learners?”

I know there are already many forensic and analysis tools available online, but constantly searching for different websites can interrupt workflow and slow down learning. So instead of relying on separate platforms, I decided to combine the most useful features into one.

That idea became CekFail(Check File) a web based forensic file analyzer focused on simplicity and usability. The goal is not to replace professional forensic software, but to create a lightweight platform where users can quickly inspect uploaded files, view hashes, analyze strings, detect suspicious keywords, and explore hex data in a clean interface.

This project is also part of my journey in learning cybersecurity, web development, and digital forensics through building something practical and useful for the community.
---

## Features

* File upload and analysis
* MD5, SHA1, and SHA256 hash generation
* MIME type detection
* Real file type detection
* Suspicious keyword detection
* Extracted strings viewer
* Hex viewer with ASCII preview
* Copy hash values instantly

---

## Tech Stack

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* tsParticles
* Lucide React

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/cekfail.git
```

Enter the project folder:

```bash
cd cekfail
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Project Structure

```txt
app/
 ├── api/
 │    └── scan/
 ├── components/
 │    ├── navbar.tsx
 │    └── particleBackground.tsx
 ├── result/
 │    └── page.tsx
 ├── layout.tsx
 └── page.tsx
```

---

## Current Analysis Capabilities

### Hashing

* MD5
* SHA1
* SHA256

### String Extraction

Extracts printable strings from uploaded files.

### Suspicious Indicators

Detects keywords related to:

* Execution
* Networking
* Persistence
* Credentials
* Malware
* Evasion

### Hex Viewer

Displays:

* Hexadecimal bytes
* Offsets
* ASCII preview

---

## Future Improvements

* Entropy analysis
* YARA rule support
* VirusTotal integration
* PE header analysis
* ELF analysis
* APK analysis
* Drag and drop improvements
* File history
* Scan report export

---

