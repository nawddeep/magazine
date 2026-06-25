# Theme System - Quick Start Guide

## 🚀 How to Use

### For Users

**Switch Theme:**
1. Look for Sun/Moon icon in top navigation bar
2. Click the icon to toggle between light and dark
3. Your preference is saved automatically

**Default Theme:** Light mode

**Shortcut:** Click the Sun/Moon icon in the navbar

### For Developers

**Get Current Theme:**
```tsx
import { useTheme } from './context/ThemeContext';

const { theme, toggleTheme } = useTheme();
console.log(theme); // 'light' or 'dark'
```

**Toggle Theme:**
```tsx
<button onClick={toggleTheme}>
  Switch Theme
</button>
```

**Use Theme Colors in Components:**
```tsx
// Method 1: Inline styles with CSS variables
<div style={{ backgroundColor: 'var(--color-background)' }}>
  Content
</div>

// Method 2: Tailwind utility classes
<div className="bg-theme text-theme">
  Content
</div>

// Method 3: Direct CSS
.my-component {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}
```

## 📚 Available CSS Variables

### Most Common
```css
var(--color-background)      /* Main background */
var(--color-text-primary)    /* Main text */
var(--color-border-primary)  /* Borders */
var(--color-accent)          /* Accent color (#c3f400) */
var(--color-surface)         /* Cards/elevated surfaces */
```

### Complete List
See `THEME_SYSTEM.md` for full variable reference.

## 🎨 Color Guidelines

### Do's ✅
- Use CSS variables for all colors
- Use `var(--color-accent)` for CTAs
- Use `var(--color-text-primary)` for body text
- Use `var(--color-surface)` for cards

### Don'ts ❌
- Don't hardcode hex colors
- Don't use `#ffffff` or `#000000` directly
- Don't assume background is always dark
- Don't use fixed opacity on backgrounds

## 🔧 Adding New Components

When creating new components, use theme-aware colors:

```tsx
// ❌ Bad
<div className="bg-white text-black">

// ✅ Good
<div className="bg-theme text-theme">

// ✅ Also Good
<div style={{ 
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text-primary)'
}}>
```

## 🐛 Common Issues

### Issue: Colors not updating
**Fix:** Use CSS variables instead of hardcoded colors

### Issue: Flash of wrong theme
**Fix:** Theme is loaded from localStorage on mount

### Issue: Custom colors not working
**Fix:** Check if using `!important` is needed to override Tailwind

## 📱 Testing

### Quick Test
1. Start app: `npm run dev`
2. Click Sun/Moon icon in navbar
3. Verify colors change smoothly
4. Reload page - theme should persist
5. Open in incognito - should default to light

### Visual Checklist
- [ ] Text readable in both themes
- [ ] Borders visible in both themes
- [ ] Cards have good contrast
- [ ] Buttons remain clickable
- [ ] Forms remain usable
- [ ] Magazine covers look good
- [ ] Smooth transitions

## 📊 Theme Comparison

### Light Theme
- Clean, professional appearance
- High contrast text
- White backgrounds
- Dark text on light
- Modern, minimalist

### Dark Theme  
- Easy on eyes in low light
- Reduced eye strain
- Dark backgrounds
- Light text on dark
- Premium, sophisticated

## 🎯 Best Practices

1. **Always use CSS variables** for colors
2. **Test both themes** during development
3. **Maintain contrast** for accessibility
4. **Smooth transitions** for theme switch
5. **Preserve accent color** (#c3f400) across themes

## 🔗 Related Files

- `src/context/ThemeContext.tsx` - Theme provider
- `src/index.css` - CSS variables & overrides
- `src/components/TopNavBar.tsx` - Toggle button
- `tailwind.config.js` - Tailwind theme config

## 💡 Pro Tips

- Theme toggle is in `TopNavBar` component
- Theme state is global via React Context
- CSS variables update automatically
- Transitions are smooth (300ms)
- localStorage key: `vanguard_theme`

## 📖 Full Documentation

See `THEME_SYSTEM.md` for complete technical documentation.

---

**Quick Links:**
- Toggle Location: Top navigation bar (Sun/Moon icon)
- Default: Light theme
- Persistence: Yes (localStorage)
- All Pages: Fully supported
- Transitions: Smooth (300ms)
