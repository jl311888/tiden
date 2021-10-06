import fs from "fs/promises"

import fileExists from "../lib/fileExists.js"
import mkdirp from "../lib/mkdirp.js"
import { resolve } from "path"
import o from "outdent"
import camelToSnake from "../lib/camelToSnake.js"
import importsBuilder from "./importsBuilder.js"

export default async function createComponent({
  namespace,
  name,
  body,
  imports,
  args,
  css,
}) {
  const realPath = namespace ? `app/${namespace}` : `app`
  namespace = namespace || ``

  const file = `${realPath}/components/${name}.js`
  const demo = `${realPath}/components/${name}/demo.js`
  const cssFile = `${realPath}/components/${name}/css.js`
  const exists = await fileExists(file)

  if (exists) {
    throw new Error(`A component '${name}' already exists`)
  }

  await mkdirp(realPath + `/components/${name}`)
  await createComponentFile(namespace, name, file, body, imports, args)
  await createCss(namespace, name, cssFile, css)
  await createComponentDemo(namespace, name, demo)
}

async function createComponentFile(
  namespace,
  name,
  file,
  body,
  imports,
  args = []
) {
  const nss = namespace ? namespace.split(`/`) : []
  const allImports = importsBuilder({
    tiden: {
      html: [`html`],
      component: [`component`],
    },
    [`./${namespace ? `${namespace}/` : ``}${name}/css.js`]: {
      default: [`css`],
    },
  })
  if (imports) {
    allImports.add(imports)
  }

  if (nss.length === 0) {
    nss.push(`x`)
  }

  const tagName = `${nss.join(`-`)}-${camelToSnake(name)}`

  await fs.writeFile(
    file,
    o`
      ${allImports}

      component(\`${tagName}\`, { css }, function ${name}({ ${[
      `language`,
      ...args,
    ].join(`, `)} }) {
        ${getBody()}
      })
    `
  )

  function getBody() {
    if (!body) {
      body = o`
        return html\`
          Hello! I'm ${tagName}
        \`
      `
    }

    return body.replace(/\n/g, `\n  `)
  }
}

async function createComponentDemo(namespace, name, file) {
  await fs.writeFile(
    file,
    o`
      export const path = new URL(import.meta.url + \`/../../${name}.js\`)

      export const examples = {

        "not ready": function (el) {
          el.isReady = undefined
        },
        
        default: function (el, {metric}) {
          el.isReady = true
          el.language = \`en\`
        }
      }
    `
  )
}

async function createCss(namespace, name, file, css) {
  css = css || `* { font-size: 24px }`

  await fs.writeFile(
    file,
    o`
      import { css } from "tiden"

      export default css\`
        ${css.split(`\n`).join(`\n  `)}
      \`
    `
  )
}
