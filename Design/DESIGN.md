---
name: Cognitive Bridge
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434655'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#4953bc'
  on-secondary: '#ffffff'
  secondary-container: '#8792fe'
  on-secondary-container: '#17228f'
  tertiary: '#4e565b'
  on-tertiary: '#ffffff'
  tertiary-container: '#666f74'
  on-tertiary-container: '#e9f2f8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#dbe4ea'
  tertiary-fixed-dim: '#bfc8ce'
  on-tertiary-fixed: '#141d21'
  on-tertiary-fixed-variant: '#3f484d'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-h1:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-h2:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.4'
  headline-h3:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  section-gap: 120px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is centered on the concept of "Guided Empowerment." For non-majors, coding can feel like an alien landscape; this system acts as a friendly, expert navigator. The brand personality is professional yet warm, removing the "hacker" tropes in favor of a "creative tool" aesthetic. 

The style adopts a **Modern Corporate** aesthetic with a lean toward **Minimalism**. It prioritizes extreme clarity and reduced cognitive load. By utilizing generous white space and a soft color palette, the system lowers the barrier to entry, making the prospect of learning AI-assisted coding feel attainable rather than intimidating.

## Colors

The palette is anchored by **Trustworthy Deep Blue (#2563eb)**, which provides an immediate sense of institutional reliability. **Soft Indigo (#818cf8)** serves as the secondary accent, used for interactive highlights and to soften the transition between deep blues and the background.

A tertiary **Sky Blue (#f0f9ff)** is used for large background sections to maintain a sense of openness without the starkness of pure white. The neutral palette focuses on slate tones rather than pure blacks to maintain a sophisticated, soft-contrast readability that is easy on the eyes during long reading sessions.

## Typography

This design system utilizes **Manrope** for its balance of geometric precision and humanist warmth, closely echoing the clean, modern feel of Pretendard. The typography is scaled to prioritize high legibility for educational content.

Line heights are intentionally generous (1.6x for body text) to assist non-majors in parsing technical explanations without fatigue. Letter spacing is slightly tightened for large displays to maintain visual impact and loosened for small labels to ensure clarity.

## Layout & Spacing

The layout follows a **Fixed Grid** model with a maximum width of 1200px to prevent line lengths from becoming unreadable on ultra-wide monitors. A 12-column system is used with wide 24px gutters to reinforce the feeling of "spaciousness."

Vertical rhythm is driven by a 4px baseline unit. Large "Section Gaps" of 120px are used between major landing page modules to allow the user's eyes to rest, preventing the "information overload" common in technical education sites.

## Elevation & Depth

This design system employs **Tonal Layers** combined with **Ambient Shadows**. Instead of heavy borders, depth is created by placing white "cards" onto the tertiary light blue background.

Shadows are extremely diffused—using a 15% opacity of the Primary Deep Blue rather than black—to create a "lifted" effect that feels airy and modern. Interactive elements like cards should subtly "rise" (increased shadow spread) on hover to provide encouraging tactile feedback to the user.

## Shapes

The shape language is consistently **Rounded** (0.5rem base). This choice avoids the clinical feel of sharp corners, making the interface feel approachable and "soft." 

Buttons and input fields use the base roundedness, while featured containers and "Success Story" cards use the `rounded-xl` (1.5rem) setting to create a friendly, modern frame for content. Large image containers for "AI Code Previews" should also follow the `rounded-xl` standard to maintain a cohesive look.

## Components

- **Buttons:** Primary CTAs use a solid Deep Blue fill with white text. Secondary buttons use a "ghost" style with a 1px Indigo border. Hover states should include a subtle 2px upward translation to feel responsive.
- **Cards:** Used for course modules. They feature a white background, a very soft indigo shadow, and a top-accent border in Soft Indigo to denote "learning" categories.
- **Input Fields:** Search and email signups use a light slate background with a 1px border that transforms to Primary Blue on focus. Labels should always be visible above the field (no floating labels) to aid accessibility.
- **Code Snippet Displays:** For educational purposes, these should not be dark-themed "hacker" boxes. Use a light-grey background with high-contrast, color-coded syntax that matches the brand's Indigo and Blue palette.
- **Progress Chips:** Small, pill-shaped indicators (e.g., "Beginner Friendly," "10 Min Read") using the tertiary blue fill and primary blue text to categorize content without adding visual noise.
- **Success Steppers:** Vertical indicators used to show the "Learning Path," utilizing Soft Indigo lines to guide the eye from one module to the next.