import { html, component } from "tiden"

import css from "./home/css.js"
import marked from "marked"
import o from "https://cdn.jsdelivr.net/npm/outdent@0.8.0/lib-module/index.js"

component(`x-home`, { css }, function home({ language }) {
  return html([
    marked(o`
      ## Tiden

      Build dynamic web applications using streams, nano-frontends, and modern native web technology.
      The library will provide tools and tutorials for building progressive web apps (PWA) using native web technology, such as Web Components and ES modules.

      ## Objectives

      #### Modular architecture

      Each thing should be able to function as designed on its own. This makes it easier to split work across teams and reduces the work-test-work cycle of development. It also helps to focus at the problem at hand.

      #### Portable
      
      Tiden is built with microservice architecture in mind. A Tiden App may be split in several parts, co-located or stored in separate repositories. Each part may even be hosted independently and have its own release lifecycle. We call these "nano-frontends".
      Insight before compromise
      As developers, we often compromise quality because sophisticated solutions can be hard to understand. We think that makes for a poorer user experience. Instead, Tiden strives to provide logging and visualisations to aid the understanding of what's going on.

      ## Browser Support

      Tiden has official support for all major browsers released in the past year. While this might seem short to some, please remember that all these browsers are automatically updated by default. Only reason they'd be outdated is when the device was offline or turned off for a whole year, or user turned off automatic updates.

      Tiden is also likely to work in much older browsers than these. However, it is not considered a bug if it does not.

      Major browsers: Edge, Firefox, Chrome, Safari, Opera
  `),
  ])
})
