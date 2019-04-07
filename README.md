# Interaction Variants Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-interaction-variants
```

## Usage

```js
// tailwind.config.js
{
  backgroundColors: {
    'black': 'black',
  },
  modules: {
    backgroundColors: ['hocus', 'group-hocus', 'group-focus', 'group-active', 'visited'],
  },
  plugins: [
    require('tailwindcss-interaction-variants')(),
  ],
}
```

The above configuration would generate the following classes:

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

.visited\:bg-black:visited {
  background-color: black;
}
```
