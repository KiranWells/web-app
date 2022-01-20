// load texme
var script = window.document.createElement('script')
script.src = "https://cdn.jsdelivr.net/npm/texme"
window.document.head.appendChild(script)

script.onload = () => {
  let runTexme = window.onload || (() => { });

// the following is a custom preprocessor and post-processor for texme,
// allowing for a few extra features
window.onload = () => {
  // set css
  currentTheme = localStorage.getItem("theme") || "Dark";
  document.body.parentElement.classList.add(currentTheme.toLowerCase());

  // custom markdown pre-processing
  let text = document.body.innerHTML;

  // support for custom details element
  text = replaceWithGlobal(text, /~~([^\n]+)\n(((?!~~).|\n)+)~~/m, match => {
    let id_simplified = match[1].replace(/ /g, "-").toLowerCase();
    return `

<details id="${id_simplified}">
  <summary>Click to show ${match[1]}</summary>

${match[2]}

</details>

`});

  // support for block quote element
  text = replaceWithGlobal(text, /(^ *&gt;[^\n]+\n)+/m, match => `

<blockquote>

${match[0].replace(/^ *&gt;(.*)$/gm, "$1")}

</blockquote>

`)

  // run TexMe and update final HTML
  try {
    // this should be sync, so this will not error inside of a promise
    document.body.innerHTML = text;
    runTexme();
  } catch {
    notify("Math rendering failed, retrying. This will only take a second...");
    setTimeout(() => {
      document.body.innerHTML = text;
      runTexme();
      afterTexMe();
    }, 100);
  } finally {
    // run this anyway to make the page look right while waiting
    afterTexMe();
  }
}

function afterTexMe() {
  // add theme button
  let themes = ["Dark", "Light", "Tropical", "Summer", "Hyperlight", "Gruvbox", "Everforest"];

  let currentTheme = "Dark";
  function changeTheme(name) {
    if (!themes.includes(name)) return -1;
    document.body.parentElement.classList.remove(currentTheme.toLowerCase());
    currentTheme = name;
    document.body.parentElement.classList.add(currentTheme.toLowerCase());
    localStorage.setItem("theme", currentTheme);
  }

  let themeToggle = document.createElement("div");
  themeToggle.classList.add("themetoggle")
  let themeOptionsDiv = document.createElement("div");
  themeOptionsDiv.classList.add("themelist");
  for (e of themes) {
    let option = document.createElement("button");
    option.innerHTML = e;
    option.onclick = () => changeTheme(option.innerHTML);
    option.classList.add("themeitem");
    themeOptionsDiv.appendChild(option);
  }
  themeToggle.innerHTML = "Theme";
  themeToggle.appendChild(themeOptionsDiv);
  document.getElementsByTagName("main")[0].appendChild(themeToggle);

  // add footer
  let footer = document.createElement("footer");
  footer.innerHTML = `
  <div class="links">
    <a href="/index.html">Home</a>
    <a href="/Math251">Math 251</a>
    <a href="/Math308">Math 308</a>
    <a href="/Math311">Math 311</a>
    <a href="/Phys206">Phys 206/7</a>
  </div>
  <div class="disclaimer">
    <p>If you see an error, please 
      <a href="https://github.com/KiranWells/web-app/issues/new?assignees=&labels=error&template=error-report.md&title=Error+on+page%3A+${document.title}" target="_blank">
        open a new issue on GitHub
      </a>
    </p>
    If you feel any content on this site is your intellectual property, 
    feel free to 
    <a href='m&#97;i&#108;to&#58;Ki%72&#97;&#37;6EW%6&#53;lls&#49;0%30&#56;&#64;gm%61i%6C&#46;c&#111;&#37;6&#68;'>email me</a>. 
    I will remove it if necessary.
  </div>
    `;
  document.body.firstChild.appendChild(footer);

  // add header ids
  let hs = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  for (let h of hs) {
    h.id = h.textContent.replace(/ /g, "-").toLowerCase();
    // copy hash link to clipboard
    h.onclick = () => {
      let text;
      try {
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + "#" + h.id);
        text = "Copied link to clipboard!";
      } catch {
        text = "Failed to copy link :(";
      }
      notify(text);
    }
  }

  document.body.classList.add("loaded");
}

}

/**
 * Creates a notification div and displays it,
 * then destroys it after 2 sec.
 * @param {String} text - the message to display
 */
 function notify(text) {
  const note = document.createElement('div');
  note.classList.add("notify");
  note.textContent = text;
  document.body.appendChild(note);
  setTimeout(() => { 
    note.style.opacity = 0; 
    setTimeout(() => document.body.removeChild(note), 1000);
  }, 1000);
}

/**
 * Replaces all matches (up to 10,000) of the regular expression
 * in `text` with the result of calling `withFunc` on the match.
 * @param {String} text - the text to replace in
 * @param {RegEx} regex - the regular expression to replace
 * @param {Function(Match) => String} withFunc - the function to use to modify the matched text
 */
function replaceWithGlobal(text, regex, withFunc) {
  // limit to 10,000 matches
  for (let i = 0; i < 10000; i++) {
    let match = text.match(regex);
    if (match === null) { break; }
    let inner = withFunc(match);
    text = text.replace(regex, inner);
  }
  return text;
}
