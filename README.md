# Class Notes

This site is deployed on Vercel [here](https://math-251-notes.vercel.app/), and is a way to share and display formatted notes for a few of my Math-based classes. If you want to add a file or suggest changes, feel free to fork the project or create an issue. 

All files are created using Markdown and LaTeX syntax, and rendered using [TeXMe](https://github.com/susam/texme). To add a file, just save the markdown file as `.html` and add:
```js
<script src="/source/texme.js"></script>
<link rel="stylesheet" href="/source/theme.css">
```
to the bottom.

Note: a custom syntax for creating a details element is also available:

```md
~~some name
Normal text or **markdown**
~~
```

Will become:

<details>
  <summary>Click to show some name</summary>

Normal text or **markdown**

</details>
