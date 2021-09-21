import o from "outdent"

export default ({ name, description, isTest }) => o`
  <!DOCTYPE html>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta property="og:title" content="${name}" />
  <meta property="og:image" content="favicon.svg" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <link rel="shortcut icon" href="/favicon.png" type="image/png" />
  <link rel="manifest" href="/manifest.json" />
  <title>${name}</title>

  <script data-initial>
    // this function may be called directly by Tiden. Don't remove it.
    window.outdated = function(msg) {
      document.body.innerHTML = "Your browser is outdated. Please turn on updates, or install Chrome, Firefox, Safari, Opera, or Edge.\\n\\nMessage was: " + msg
    }

    // Set 'root' to the folder where index files are located. Can be relative:
    // - If it is hosted adjacent to this file (common when using URL fragments, "hash URL") then "./" is suitable.
    // - If server uses rewrites to host 'index.html' on all routes, you probably want to set this to "/"
    window.root = "/"

    // add your own importmaps here. For example, using config below, this will enable:
    // import {Element} from "chartjs"
    window.importmap = {
      // "chartjs": "https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.esm.js"
    }
  </script>
  <script data-initial src="${
    isTest
      ? `http://localhost:1105/init.js`
      : `https://cdn.jsdelivr.net/npm/tiden@0.5.1/init.js`
  }"></script>
  <style>
    #root {
      display: contents;
    }

    body,
    html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  <div id="root"></div>
`
