# Interaction Variants Plugin for Tailwind CSS

## Requirements

This plugin requires Tailwind CSS 1.2 or later. If your project uses an older version of Tailwind, you should install the latest 2.x version of this plugin (`npm install tailwindcss-interaction-variants@2.x`).

## Installation

```bash
npm install tailwindcss-interaction-variants
```

## Usage

```js
// tailwind.config.js
module.exports = {
  theme: {
    backgroundColor: {
      'black': 'black',
    },
  },
  variants: {
    backgroundColor: ['checked', 'group-focus', 'group-focus-within', 'group-active', 'group-visited', 'group-disabled', 'hocus', 'group-hocus'],
  },
  plugins: [
    require('tailwindcss-interaction-variants'),
  ],
};
```

The above configuration would generate the following CSS:

```css
.bg-black {
  background-color: black;
}

.checked\:bg-black:checked {
  background-color: black;
}

.group:focus .group-focus\:bg-black {
  background-color: black;
}

.group:focus-within .group-focus-within\:bg-black {
  background-color: black;
}

.group:active .group-active\:bg-black {
  background-color: black;
}

.group:visited .group-visited\:bg-black {
  background-color: black;
}

.group:disabled .group-disabled\:bg-black {
  background-color: black;
}

.hocus\:bg-black:hover, .hocus\:bg-black:focus {
  background-color: black;
}

.group:hover .group-hocus\:bg-black, .group:focus .group-hocus\:bg-black {
  background-color: black;
}
```
