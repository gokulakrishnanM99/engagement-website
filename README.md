# Wedding Engagement Invitation

A beautiful, interactive engagement invitation for **Dr. Pooja Prasad M** & **Thirumalai M**.

## 🚀 Features
- **Interactive Countdown**: Real-time countdown to the engagement ceremony.
- **Voting Poll**: "Team Pooja" vs "Team Thiru" interactive voting system powered by Firebase.
- **Responsive Design**: Optimized for both mobile and desktop viewing.
- **Elegant Animations**: Smooth transitions and effects using Framer Motion.
- **GitHub Pages Ready**: Automated deployment via GitHub Actions.

---

## 📸 How to Customize Photos

To update the photos of the bride and groom, follow these steps:

1.  **Prepare your images**: Use two square or portrait images (PNG or JPG).
2.  **Replace assets**:
    -   Go to the `public/images/` folder.
    -   Replace `bride.png` with your bride's photo.
    -   Replace `groom.png` with your groom's photo.
    -   *Note: Keep the filenames exactly as `bride.png` and `groom.png` for them to show up automatically.*

---

## ✍️ How to Update Descriptions & Names

All text content is managed in the main application file:

1.  Open `src/App.tsx`.
2.  **Names**: Search for `DR. POOJA PRASAD` and `THIRUMALAI` to update the main headings.
3.  **Descriptions**:
    -   **Bride**: Look for the text around line 171.
    -   **Groom**: Look for the text around line 206.
4.  **Event Details**: Update the date, time, and location in the "Event Details" section (around line 95).

---

## 📂 Repository Structure

```text
├── .github/workflows/   # GitHub Actions deployment scripts
├── public/
│   └── images/          # Store bride.png and groom.png here
├── src/
│   ├── components/      # UI components (Poll, Countdown, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── App.tsx          # Main application logic and text content
│   ├── firebase.ts      # Firebase configuration and setup
│   └── index.css        # Global styles and Tailwind configuration
├── firestore.rules      # Security rules for the voting poll
└── vite.config.ts       # Build configuration
```

---

## 🛠️ Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🌐 Deployment

This repo is configured for **GitHub Pages**. Simply push your changes to the `main` branch, and the GitHub Action will automatically deploy the site for you.

*Make sure to add your repository domain to the "Authorized Domains" in your Firebase Console settings.*
