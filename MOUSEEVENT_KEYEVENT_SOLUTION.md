# MouseEvent and KeyEvent References - Issue #631 Solution

## Problem Summary
The Processing website was missing reference documentation for MouseEvent and KeyEvent classes. Users could see methods like `mousePressed(event)` and `keyPressed(event)` but had no documentation about what these event objects contained or how to use them.

## Complete Solution Implemented

### 1. Created MouseEvent Class Reference
**File:** `content/references/translations/en/processing/MouseEvent.json`
**Spanish:** `content/references/translations/es/processing/MouseEvent.es.json`

**Key Features:**
- Complete class documentation explaining MouseEvent purpose
- Documentation of all methods: `getX()`, `getY()`, `getButton()`, `getCount()`, `isShiftDown()`, `isControlDown()`, `isAltDown()`, `isMetaDown()`
- Explanation of when to use MouseEvent vs global variables
- Note about windowRatio() behavior differences

### 2. Created KeyEvent Class Reference  
**File:** `content/references/translations/en/processing/KeyEvent.json`
**Spanish:** `content/references/translations/es/processing/KeyEvent.es.json`

**Key Features:**
- Complete class documentation explaining KeyEvent purpose
- Documentation of all methods: `getKey()`, `getKeyCode()`, `isShiftDown()`, `isControlDown()`, `isAltDown()`, `isMetaDown()`, `isAutoRepeat()`, `getNative()`
- Java integration notes for advanced users
- Explanation of when to use KeyEvent vs global variables

### 3. Enhanced All Mouse Function Documentation
Updated the following files to include MouseEvent parameter documentation:
- `mousePressed_.json` - Added event parameter, MouseEvent in related
- `mouseReleased_.json` - Added event parameter, MouseEvent in related  
- `mouseClicked_.json` - Added event parameter, MouseEvent in related
- `mouseMoved_.json` - Added event parameter, MouseEvent in related
- `mouseDragged_.json` - Added event parameter, MouseEvent in related
- `mouseWheel_.json` - Enhanced description, added MouseEvent in related

### 4. Enhanced All Key Function Documentation
Updated the following files to include KeyEvent parameter documentation:
- `keyPressed_.json` - Added event parameter, KeyEvent in related
- `keyReleased_.json` - Added event parameter, KeyEvent in related
- `keyTyped_.json` - Added event parameter, KeyEvent in related

### 5. Comprehensive Examples Created

**MouseEvent Examples:**
- `content/references/examples/processing/MouseEvent/MouseEvent_0.pde` - Basic usage showing coordinates, buttons, and modifier keys
- `content/references/examples/processing/MouseEvent/MouseEvent_1.pde` - Mouse wheel specific example with modifiers

**KeyEvent Examples:**
- `content/references/examples/processing/KeyEvent/KeyEvent_0.pde` - Interactive typing with modifier key detection
- `content/references/examples/processing/KeyEvent/KeyEvent_1.pde` - Comprehensive keyboard event logger

**Enhanced Function Examples:**
- `mousePressed_/mousePressed_1.pde` - Shows MouseEvent parameter usage
- `mouseWheel_/mouseWheel_1.pde` - Enhanced wheel example with event details
- `keyPressed_/keyPressed_1.pde` - Shows KeyEvent parameter usage

### 6. Internationalization Support
- Created Spanish translations for both MouseEvent and KeyEvent classes
- Updated related Spanish function files to include new class references

## Key Benefits of This Solution

### For End Users:
1. **Clear Documentation** - Users now have complete reference pages for both event classes
2. **Practical Examples** - Multiple working examples show real-world usage patterns
3. **Best Practice Guidance** - Documentation explains when to use events vs global variables
4. **Modifier Key Support** - Full examples of detecting Shift, Ctrl, Alt, Meta keys

### For Advanced Users:
1. **Java Integration** - KeyEvent documentation explains Java integration via `getNative()`
2. **Precise Control** - MouseEvent examples show unaffected-by-windowRatio coordinates
3. **Auto-repeat Detection** - KeyEvent shows how to detect auto-repeated key events
4. **Multi-language Support** - Spanish translations ensure accessibility

### For the Processing Community:
1. **Complete Coverage** - No missing event documentation
2. **Consistent Style** - Follows existing Processing documentation patterns
3. **Searchable** - Proper related links connect all mouse/keyboard functionality
4. **Maintainable** - Clear structure for future updates

## Files Modified/Created

### New Reference Files (4):
- `MouseEvent.json` (English)
- `MouseEvent.es.json` (Spanish)  
- `KeyEvent.json` (English)
- `KeyEvent.es.json` (Spanish)

### Updated Reference Files (12):
- 6 mouse function files (mousePressed_, mouseReleased_, etc.)
- 3 key function files (keyPressed_, keyReleased_, keyTyped_)
- 3 Spanish equivalents

### New Example Files (6):
- 2 MouseEvent examples
- 2 KeyEvent examples  
- 2 enhanced function examples

### Example Directories Created (2):
- `MouseEvent/` example directory
- `KeyEvent/` example directory

## Addresses Original Issue Requirements

✅ **Suggestion 1: Add reference pages for these classes** - Complete MouseEvent and KeyEvent reference pages created

✅ **Add a few examples of their use** - 6 comprehensive examples created showing various usage patterns

✅ **Special attention to mouseWheel()** - Enhanced mouseWheel documentation and examples showing getCount() usage

✅ **Practical guidance** - Documentation clearly explains when to use event objects vs global variables

The solution is comprehensive, follows Processing documentation standards, and provides everything users need to effectively use MouseEvent and KeyEvent objects in their sketches.
