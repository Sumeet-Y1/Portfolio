# 🚀 Sumeet Yadav - Backend Developer Portfolio

A modern, fully responsive personal portfolio website showcasing my journey as a Backend Developer. Built with pure HTML, CSS, and JavaScript featuring stunning particle animations, glassmorphism design, and smooth user interactions.

## 🌐 Live Demo

**[View Portfolio →](https://sumeetdev.netlify.app)**

---

## ✨ Features

### 🎨 **Modern UI/UX Design**
- **Glassmorphism Effects** - Premium glass card designs with blur effects
- **Gradient Animations** - Dynamic color-shifting gradients (Orange → Gold → Yellow)
- **Interactive Particle System** - 3D particle background powered by Three.js that responds to mouse movement
- **Smooth Animations** - Carefully crafted CSS animations for every interaction
- **Responsive Design** - Perfectly optimized for desktop, tablet, and mobile devices

### 🎯 **Core Sections**
- **Hero Section** - Eye-catching introduction with animated statistics card
- **Skills Section** - Categorized tech stack with hover effects and tech logos
- **Projects Section** - Featured projects with live demos and GitHub links
- **Contact Section** - Multiple ways to connect with interactive hover states

### 🔥 **Technical Highlights**
- **100% Vanilla Stack** - No frameworks, pure HTML/CSS/JS
- **Three.js Integration** - Real-time 3D particle rendering
- **Custom CSS Variables** - Easy theme customization
- **Font Awesome Icons** - Professional iconography
- **Smooth Scroll Navigation** - Seamless section transitions
- **Optimized Performance** - Fast loading with CDN resources

---

## 🛠️ Tech Stack

### **Frontend**
- HTML5
- CSS3 (Grid, Flexbox, Animations, Glassmorphism)
- JavaScript (ES6+)
- Three.js (3D Graphics)

### **Design Assets**
- Font Awesome (Icons)
- Google Fonts (Sora, Space Grotesk)
- Devicons (Technology Logos)

### **Deployment**
- Netlify (Automated deployment via GitHub)
- Custom Domain Support

---

## 🎯 Projects Showcased

### 1. **AureumPicks** - E-commerce Platform
Premium shopping experience with JWT authentication, OTP verification, and complete cart management.

**Tech:** Spring Boot, Spring Security, JWT, MySQL, Brevo API

**[Live Demo](https://aureumpicks.up.railway.app)** | **[GitHub](https://github.com/Sumeet-Y1/ecommerce--fullstack)**

---

### 2. **Student Management API** - RESTful API
Comprehensive student data management system with full CRUD operations and layered architecture.

**Tech:** Spring Boot, Spring Data JPA, MySQL, Maven

**[GitHub](https://github.com/Sumeet-Y1/student-api-springboot)**

---

### 3. **Portfolio Website** - Personal Portfolio
This very website! Modern, responsive design with particle animations.

**Tech:** HTML5, CSS3, JavaScript, Three.js

**[GitHub](https://github.com/Sumeet-Y1/Portfolio)** | **[View Portfolio →](https://sumeetdev.netlify.app)**

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code, Sublime Text, etc.)
- Git installed on your system

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Sumeet-Y1/Portfolio.git
cd Portfolio
```

2. **Open the project**
```bash
# Open index.html directly in your browser
# OR use a local server (recommended)

# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html → Open with Live Server
```

3. **View in browser**
```
Navigate to: http://localhost:8000
```

---

## 📁 Project Structure

```
Portfolio/
│
├── index.html           # Main HTML file with embedded CSS & JS
│
├── README.md           # Project documentation
│
└── assets/             # (Optional: for future images/files)
```

---

## 🎨 Customization Guide

### **Change Color Scheme**
Edit CSS variables in the `:root` selector (line 13-18):

```css
:root {
    --orange: #ff6b35;    /* Primary color */
    --gold: #f7931e;      /* Secondary color */
    --yellow: #ffd93d;    /* Accent color */
    --dark: #0a0a0f;      /* Background */
    --dark-light: #1a1420; /* Card background */
}
```

### **Update Personal Information**
1. **Hero Section** (line 338-355) - Name, title, description
2. **Projects** (line 567-687) - Add/modify project cards
3. **Contact** (line 707-745) - Update email, LinkedIn, GitHub links
4. **Navigation Logo** (line 336) - Change "SY" to your initials

### **Modify Particle Effects**
Three.js configuration (line 757-780):
```javascript
const particlesCount = 2000;  // Change particle density
const size = 0.02;            // Particle size
const opacity = 0.9;          // Particle visibility
```

---

## 🌟 Key Features Breakdown

### **Interactive Particle Background**
- 2000+ animated particles in 3D space
- Mouse-tracking with velocity-based movement
- Color variants (orange, gold, yellow)
- Touch-enabled for mobile devices
- Automatic boundary respawning

### **Premium Glass Cards**
- Backdrop blur effects
- Gradient borders with shimmer animation
- Hover transformations with shadows
- Floating animation keyframes
- Responsive grid layouts

### **Smooth Navigation**
- Fixed navigation bar with blur backdrop
- Smooth scroll to sections
- Active link highlighting
- Mobile-responsive menu

---

## 📱 Responsive Design

Breakpoints:
- **Desktop:** 1400px+ (Full layout)
- **Tablet:** 768px - 968px (Adjusted grid)
- **Mobile:** < 768px (Single column, optimized)

---

## 🔧 Deployment

### **Deploy to Netlify (Recommended)**

1. **Connect GitHub Repository**
   - Login to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the Portfolio repository

2. **Configure Build Settings**
   - Build command: (leave blank)
   - Publish directory: `.` (root)
   - Deploy!

3. **Automatic Deployments**
   - Every git push to main branch auto-deploys
   - Custom domain support available
   - Free SSL certificate included

### **Deploy to GitHub Pages**

1. Go to repository Settings → Pages
2. Source: Deploy from branch → main
3. Folder: / (root)
4. Save and wait for deployment

---

## 🎓 What I Learned

Building this portfolio taught me:
- Advanced CSS animations and transitions
- 3D graphics with Three.js
- Responsive design principles
- Performance optimization techniques
- Modern UI/UX patterns (glassmorphism, gradients)
- Git workflow and continuous deployment

---

## 🤝 Connect With Me

- **Email:** [sumeety202@gmail.com](mailto:sumeety202@gmail.com)
- **LinkedIn:** [sumeet-backenddev](https://linkedin.com/in/sumeet-backenddev)
- **GitHub:** [Sumeet-Y1](https://github.com/Sumeet-Y1)
- **Location:** Mumbai, Maharashtra, India

---

## 🙏 Acknowledgments

- **Three.js** - 3D particle system
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Sora, Space Grotesk)
- **Devicons** - Technology logos
- **Netlify** - Hosting and deployment

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ and lots of ☕ by [Sumeet Yadav](https://github.com/Sumeet-Y1)**

</div>
