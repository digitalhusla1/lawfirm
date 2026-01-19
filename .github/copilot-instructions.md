# Copilot Instructions for Law Firm Website

## Project Overview
A professional, responsive law firm website built with vanilla HTML5, CSS3, and JavaScript. No build system or frameworks - pure static site designed for simple deployment and customization.

**Key URLs:**
- **Homepage:** `index.html` (291 lines) - Hero slider, services overview, testimonials
- **Shared Components:** `header.html`, `footer.html` - Included on all pages
- **Styling:** `css/style.css` (2324 lines) - Comprehensive, well-commented stylesheet
- **Interactivity:** `js/script.js` (576 lines) - Form validation, slider, mobile nav, accessibility

## Architecture & Data Flows

### Component Structure
- **Static Pages:** All pages in `pages/` follow identical structure (link to services, attorneys, team)
- **Dynamic Components:** Header/Footer loaded via JavaScript placeholders (`#header-placeholder`, `#footer-placeholder`)
- **Service Pages:** Each practice area (corporate-law.html, family-law.html, etc.) mirrors the same layout pattern

### Navigation Flow
Header contains 5 main sections:
1. Home (index.html) - Landing page with hero slider
2. About Us (pages/about.html) - Firm history, values, leadership
3. Services (pages/services.html) - Hub page linking to 9 practice areas
4. Attorneys (pages/attorneys.html) - Team profiles with toggleable bios
5. Contact (pages/contact.html) - Form and firm details

**Path Handling:** Root-level links use `index.html` and relative paths. Pages in `/pages/` use `../` for assets (e.g., `../css/style.css`).

## Critical Patterns

### CSS Organization
The stylesheet uses **section comments** to organize code into logical blocks:
```css
/* =============================================
   SECTION NAME
   ============================================= */
```
Color scheme is fixed:
- Primary Blue: `#0056b3` (nav, headers)
- Secondary Blue: `#003d7a` (hover, accents, body background)
- Accent Gold: `#ffd700` (headings, buttons)
- Text: `#333` for body, `#ffffff` for headers on dark backgrounds

**Layout System:** CSS Grid and Flexbox (no Bootstrap or utility frameworks).

### JavaScript Patterns
- **Namespacing:** Global functions (e.g., `toggleNav()`, `nextSlide()`, `validateForm()`), not object-based
- **State Management:** Simple global variables (e.g., `currentSlideIndex`, `slideInterval`)
- **DOM Queries:** Uses `document.querySelector()` and `document.querySelectorAll()`
- **Event Listeners:** Attached via `addEventListener()` in initialization
- **Comments:** Each function has JSDoc-style comments explaining purpose and parameters

### HTML Structure
All HTML pages:
1. Include DOCTYPE, meta tags (charset, viewport, SEO meta)
2. Link CSS before scripts
3. Load `script.js` with `defer` attribute
4. Include schema markup (JSON-LD) for SEO (especially `LegalService`)
5. Have `id="header-placeholder"` and `id="footer-placeholder"` for dynamic component injection

## Content Customization Points

All files have **MANUAL EDITING NOTES** comments indicating customizable sections:
- `index.html`: Update hero slides, practice areas, testimonials
- `pages/attorneys.html`: Edit attorney cards, bios, contact info
- `css/style.css`: Modify color variables at top (primary blue, gold accents)
- `footer.html`: Phone, email, address, quick links
- `pages/contact.html`: Form fields, address, Google Map placeholder

Example pattern from index.html:
```html
<!-- MANUAL EDITING NOTES:
     - Hero slider: Edit slides in <div class="slide">, change images and text
     - Practice areas: Modify service-card content
     - Attorney profiles: Edit attorney-item details and links
-->
```

## Production Setup Requirements

From README.md - items NOT yet implemented:
1. **Form Processing:** Contact form needs server-side backend (currently frontend-only)
2. **CAPTCHA:** Placeholder for reCAPTCHA implementation
3. **HTTPS:** Requires real SSL certificate
4. **Analytics:** Google Analytics/Admin tracking not configured
5. **Google Map:** Embedded placeholder in contact.html
6. **CMS Integration:** Optional WordPress integration for content management

Deployment options: Apache, Nginx, or `python -m http.server` for local testing.

## JavaScript Functionality Reference

### Core Features
- **Mobile Navigation:** `toggleNav()` - Hamburger menu toggle
- **Hero Slider:** `showSlide()`, `nextSlide()`, `prevSlide()`, `currentSlide()` - Auto-play with manual controls
- **Form Validation:** `validateForm()` - Contact form validation with error messages
- **Bio Toggles:** `toggleBio()` - Expandable attorney profiles on attorneys.html
- **Accessibility:** Keyboard navigation support, ARIA labels in semantic HTML

### Accessibility Notes
- Images have alt text
- High contrast colors (WCAG 2.1 compliant)
- Keyboard navigation in place
- Form labels associated with inputs

## Useful Commands & Testing

- **Local Testing:** `python -m http.server` (serves on `http://localhost:8000`)
- **No Build Step:** Changes to HTML/CSS/JS are live immediately
- **Image Replacement:** Place new images in `/images/` folder with descriptive names
- **Placeholder Replacements:** Search for `[City]`, `[Phone]`, `[Email]` to find template text

## Common Editing Workflow

1. **Update Service Info:** Edit `pages/services.html`, then create matching page in `pages/service-name.html`
2. **Add Attorney:** Edit `pages/attorneys.html`, update schema markup in `index.html` with new profiles
3. **Change Colors:** Modify CSS variables in `style.css` lines 14-17 (Primary/Secondary/Accent)
4. **Adjust Layout:** Use CSS Grid/Flexbox classes (`.grid-3`, `.flex-center`, etc.) already defined
5. **Add JavaScript:** Use vanilla functions in `script.js`, attach via `addEventListener()` in init

## Migration Considerations

**No technical debt** - This is a clean, minimal stack. Future enhancements mentioned in README:
- React/Vue conversion would require bundler (Vite/Webpack) and component restructuring
- CRM integration (HubSpot/Clio) would need backend API layer
- Multi-language support would need i18n library
- Live chat would require third-party widget integration
