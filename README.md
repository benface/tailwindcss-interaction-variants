# Interaction Variants Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-interaction-variants
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    backgroundColor: {
      'black': 'black',
    },
  },
  variants: {
    backgroundColor: ['hocus', 'group-hocus', 'group-focus', 'group-active'],
  },
  plugins: [
    require('tailwindcss-interaction-variants')(),
  ],
}
```

The above configuration would generate the following CSS:

```css
.bg-black {
  background-color: black;
}

.hocus\:bg-black:hover, .hocus\:bg-black:focus {
  background-color: black;
}

.group:hover .group-hocus\:bg-black, .group:focus .group-hocus\:bg-black {
  background-color: black;
}

.group:focus .group-focus\:bg-black {
  background-color: black;
}

.group:active .group-active\:bg-black {
  background-color: black;
}
```
