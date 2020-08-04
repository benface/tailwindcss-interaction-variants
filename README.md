# [BLACK LIVES MATTER](https://blacklivesmatters.carrd.co)

### Be aware. Be angry. Do better. Demand change. Show your support any way you can. Click on the link above to find protests, petitions, and other ways to help. DO NOT LET IT GO SILENT.

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
    backgroundColor: ['group-focus-within', 'group-focus-visible', 'group-active', 'group-visited', 'group-disabled', 'hocus', 'group-hocus', 'can-hover', 'no-hover'],
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

.group:focus-within .group-focus-within\:bg-black {
  background-color: black;
}

.group:focus-visible .group-focus-visible\:bg-black {
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

@media (hover: hover) {
  .can-hover\:bg-black {
    background-color: black;
  }
}

@media (hover: none) {
  .no-hover\:bg-black {
    background-color: black;
  }
}
```
