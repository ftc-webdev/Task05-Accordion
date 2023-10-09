'use strict'

import { cssInit, css, klass, insertCSS, insertExternalStylesheet } from '/js/modules/css.js'
cssInit("accordion")

let headers, bodies     // these will be initialised later by init()
let currentIndex = null // this is the currently "open" body

/*

    1. we need selectors to grab the data - as it is presented
    2. to make our widget as flexible as possible, assume that the data is already in a list
        of objects, or two lists - headers and bodies or something like that
    3. process the list by 
        a) make the header clickable
        b) on click, open the body associated with the header, close any open body
        c) make all bodies collapsed
        d) open the first body

*/

const selectorBodyAdjacent = (headerSelector) => {
    const headers = document.querySelectorAll(headerSelector)
    let bodies = []
    for(let header of headers) {
        let body = header.nextElementSibling
        bodies.push(body)
    }
    // we now have 2 arrays of the same length - headers & bodies
    return {
        headers,
        bodies
    }
}

const hide = (index) => {
    bodies[index].classList.add(klass("hidden"))
}
const reveal = (index) => {
    bodies[index].classList.remove(klass("hidden"))
    currentIndex = index// this is now the currently displayed body/paragraph
}

const headerClickHandler =  (ev) => {
    const header = ev.target
    const body = bodies[ header.index ]
    // console.log({ header, body })
    if(currentIndex !== null) {  // zero is considered false :-(
        hide(currentIndex)
        // bodies[currentIndex].classList.add(klass("hidden"))
    }
    reveal(header.index)
    // currentIndex = header.index    // new current 
    // bodies[currentIndex].classList.remove(klass("hidden")) // reveal
}
const init = (initialHeaders, initialBodies, optionalExternalStyleSheet) => {
    
    insertCSS(`
        ${css(".clickable")} {
            cursor: pointer;
        }
        ${css(".hidden")} {
            display: none;
        }    
    `)

    if(optionalExternalStyleSheet) insertExternalStylesheet(optionalExternalStyleSheet)

    // these are module wide variables    
    headers = initialHeaders
    bodies = initialBodies

    let index = 0
    for(let header of headers) {
        header.index = index
        let body = bodies[index]
        body.index = index
        hide(index) 
        // body.classList.add(klass("hidden")) // hide all the bodies

        header.classList.add(klass(".clickable"))
        header.addEventListener("click", headerClickHandler)
        
        index++
    }
    reveal(0)
    // bodies[0].classList.remove(klass(".hidden"))
    // currentIndex = 0

}



export {
    selectorBodyAdjacent,
    init
}










