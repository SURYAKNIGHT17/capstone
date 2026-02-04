# Kapow! AI 💥

**Turn complex topics into engaging comic books. Learn faster and retain more with emotion-driven AI storytelling.**

Kapow! AI is an educational platform that leverages Generative AI to transform any subject—History, Science, Literature—into a visually stunning and narrative-driven comic book. It is designed to make learning fun, memorable, and accessible for students of all ages.

![Kapow AI Hero](https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2070&auto=format&fit=crop) 
*(Note: Screenshot to be updated)*

## 🚀 Features

-   **Visual Learning**: Convert abstract concepts into concrete visual stories.
-   **Educational Focus**: Tailored for students to master topics like "The French Revolution" or "Quantum Physics".
-   **Custom Art Styles**: Choose from various styles including **Charlie Bo, Hollie Mengert, Mario Alberti, Pepe Larraz,** and more.
-   **Instant Generation**: Create a full 10-14 page comic in minutes.
-   **Interactive Gallery**: Explore and learn from comics created by the community.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite
-   **Styling**: Tailwind CSS, Framer Motion (Animations)
-   **State Management**: Zustand / Context API
-   **Icons**: Lucide React
-   **Fonts**: Outfit (Headings), Fredoka (Headings - Fun), Inter (Body), Bangers (Comic)

## 🏃‍♂️ Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/SURYAKNIGHT17/capstone.git
    cd capstone/comic-generator-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## 🎨 Project Structure

```
src/
├── components/
│   ├── creator/       # Comic generation form & progress
│   ├── home/          # Hero, Features, How-to sections
│   ├── gallery/       # Comic browsing interface
│   └── shared/        # Reusable UI components (Buttons, Header, etc.)
├── context/           # Global state (ComicContext)
├── hooks/             # Custom hooks
├── pages/             # Main page views
├── services/          # API integration
└── utils/             # Constants and helpers
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
