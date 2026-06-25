# PDF Viewer Integration with Subscription System

## ✅ Real PDF Data Integration Complete

The subscription system now works with **REAL PDF FILES** stored in `src/data/`.

---

## PDF Files Available

1. **RTC Magazine** (October 2005)
   - Path: `/src/data/RTC_Magazine_October_2005.pdf`
   - 84 pages

2. **Sadhana Magazine**
   - Path: `/src/data/Sadhana_magazine.pdf`
   - 48 pages

3. **Ellenna Magazine**
   - Path: `/src/data/ellenna_magazine.pdf`
   - 62 pages

---

## How It Works

### Two Viewing Modes

The app now supports **two modes** for viewing magazines:

1. **PDF Mode** (Default) - Real PDF viewer
   - Renders actual PDF files from `src/data/`
   - Uses react-pdf library
   - Subscription restrictions apply to real pages
   - Zoom in/out functionality
   - Page directory with lock icons

2. **Editorial Mode** - Stylized magazine viewer
   - Beautiful editorial layouts
   - Curated content presentation
   - Mock zine pages with images
   - Original MagazineSlider component

### Default Behavior

When you click on a magazine, it now opens in **PDF Mode** by default, displaying the real PDF file with subscription restrictions:

- **Guest users**: Can read pages 1-5
- **Page 6**: Shows premium paywall
- **Pages 6+**: Locked until subscription
- **Premium users**: Full access to all pages

---

## Technical Implementation

### New Component: PDFReader

**File**: `src/components/PDFReader.tsx`

**Features**:
- Real PDF rendering using react-pdf
- Page-by-page navigation
- Subscription-based access control
- Premium gate on page 6 for guests
- Zoom controls
- Page directory with locks
- Integration with SubscriptionContext

**Key Functions**:
```typescript
// Check if user can access a page
if (!canAccessPage(nextPage)) {
  openPremiumModal(); // Show subscription prompt
}

// Render PDF or premium gate
{!canAccessPage(currentPage) ? (
  <PremiumGate />
) : (
  <PDFPage pageNumber={currentPage} />
)}
```

### Libraries Added

```json
{
  "react-pdf": "^9.2.1",
  "pdfjs-dist": "^4.9.155"
}
```

---

## Usage

### Open Magazine in PDF Mode

```typescript
// In App.tsx
{view === 'slider' && viewMode === 'pdf' && activeIssue.pdfUrl && (
  <PDFReader 
    issue={activeIssue} 
    onViewChange={setView}
  />
)}
```

### Switch Between Modes

The `viewMode` state in App.tsx controls which viewer is used:

```typescript
const [viewMode, setViewMode] = useState<'editorial' | 'pdf'>('pdf');
```

**To change default mode:**
- `'pdf'` → Opens real PDF files
- `'editorial'` → Opens stylized magazine slider

---

## PDF Viewer Features

### 1. **Subscription Integration**
- ✅ First 5 pages free
- ✅ Premium gate on page 6
- ✅ Lock icons on restricted pages
- ✅ Premium badge for subscribers
- ✅ Automatic modal trigger

### 2. **Navigation**
- ✅ Previous/Next buttons
- ✅ Page directory (sidebar)
- ✅ Click page numbers to jump
- ✅ Keyboard support (optional)

### 3. **Viewing Controls**
- ✅ Zoom in/out buttons
- ✅ Responsive sizing
- ✅ Loading states
- ✅ Error handling

### 4. **Premium Gate Display**
- ✅ Large lock icon
- ✅ Unlock message
- ✅ "Unlock Premium Access" button
- ✅ Page count indicator

---

## Access Control Logic

### Guest User Flow
```
1. Opens magazine → PDFReader loads
2. Views pages 1-5 → Full access
3. Clicks page 6 → Premium gate displays
4. Tries next button → Premium modal opens
5. Can't navigate beyond page 5
```

### Subscribed User Flow
```
1. Opens magazine → PDFReader loads
2. Sees "PREMIUM" badge
3. Views all pages → No restrictions
4. No lock icons in directory
5. Full navigation freedom
```

---

## File Structure

```
src/
├── components/
│   ├── PDFReader.tsx        ← NEW: Real PDF viewer with restrictions
│   ├── MagazineSlider.tsx   ← Existing: Editorial viewer
│   └── PremiumModal.tsx     ← Works with both viewers
├── context/
│   └── SubscriptionContext.tsx  ← Shared subscription logic
└── data/
    ├── RTC_Magazine_October_2005.pdf
    ├── Sadhana_magazine.pdf
    └── ellenna_magazine.pdf
```

---

## How Subscription System Works with PDFs

### canAccessPage() Function

Located in `SubscriptionContext.tsx`:

```typescript
const FREE_PAGE_LIMIT = 5;

const canAccessPage = (pageNumber: number): boolean => {
  if (isSubscribed) return true;  // Premium: all pages
  return pageNumber <= FREE_PAGE_LIMIT;  // Free: pages 1-5
};
```

### PDF Rendering Logic

Located in `PDFReader.tsx`:

```typescript
{!canAccessPage(currentPage) ? (
  // Show premium gate on page 6+
  <PremiumGate />
) : (
  // Render actual PDF page
  <Document file={pdfUrl}>
    <Page pageNumber={currentPage} />
  </Document>
)}
```

---

## Testing Instructions

### Test with Real PDFs

1. **Start the app**:
   ```bash
   npm run dev
   ```

2. **Open any magazine** from homepage

3. **PDF viewer opens** with real PDF content

4. **Navigate to page 5** → Works ✅

5. **Try page 6** → Premium gate appears ⚠️

6. **Click "Subscribe Now"** in modal

7. **Page 6 unlocks** → Full PDF accessible ✅

8. **Refresh browser** → Still subscribed ✅

### Verify Real PDF Data

- Check that actual PDF content displays (not mock images)
- Zoom in/out to verify PDF rendering
- Check page count matches PDF file
- Verify text is selectable (real PDF text)

---

## Comparison: PDF Mode vs Editorial Mode

| Feature | PDF Mode | Editorial Mode |
|---------|----------|----------------|
| **Data Source** | Real PDF files | Mock zine pages |
| **Content** | Actual magazine PDFs | Curated editorial layouts |
| **Pages** | 48-84 (actual count) | 8 pages (fixed) |
| **Styling** | PDF native rendering | Custom brutalist design |
| **Text** | Selectable | Images only |
| **Subscription** | ✅ First 5 pages free | ✅ First 5 pages free |
| **Use Case** | Real document viewing | Editorial presentation |

---

## Benefits of PDF Mode

1. **Real Data**: Displays actual magazine content
2. **Scalability**: Works with any PDF file
3. **No Mock Content**: Authentic reading experience
4. **Page Count**: Dynamic based on PDF
5. **Subscription**: Same access control logic
6. **Text Selection**: Users can copy text
7. **Zoom**: Better readability control

---

## Configuration

### Change Default Viewer

In `App.tsx`, line ~63:

```typescript
// Use PDF viewer (recommended)
const [viewMode, setViewMode] = useState<'editorial' | 'pdf'>('pdf');

// OR use editorial viewer
const [viewMode, setViewMode] = useState<'editorial' | 'pdf'>('editorial');
```

### Add More PDFs

1. Place PDF file in `src/data/`
2. Update magazine object in `DEFAULT_ISSUES`:

```typescript
{
  id: 'new-magazine',
  title: 'New Magazine',
  // ... other fields
  pdfUrl: '/src/data/new_magazine.pdf'  // Add this
}
```

---

## Build Status

✅ **TypeScript**: Compiled successfully  
✅ **Production Build**: Successful  
✅ **PDF Library**: Integrated (react-pdf)  
✅ **Subscription Logic**: Working with real PDFs  
✅ **No Breaking Changes**: Both modes available  

---

## Summary

The subscription system now works with **REAL PDF data**:

- ✅ PDFs stored in `src/data/`
- ✅ PDFReader component displays actual files
- ✅ Subscription restrictions apply to real pages
- ✅ Premium gate on page 6
- ✅ First 5 pages free for guests
- ✅ Full access for premium users
- ✅ Both PDF and Editorial modes available
- ✅ Default is PDF mode (real data)

**The subscription system is now integrated with real magazine PDFs, not just mock content!**

---

**Implementation Date**: June 25, 2026  
**Status**: ✅ Fully Operational with Real PDFs  
**Default Mode**: PDF Viewer
