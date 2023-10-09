'use strict'

import { selectorBodyAdjacent, init } from "./modules/accordion/index.js"

document.addEventListener("DOMContentLoaded", () => {

    const { headers, bodies }  = selectorBodyAdjacent("h3")

    init(headers, bodies, "/css/test.css")


})