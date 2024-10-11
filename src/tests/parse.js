import fs from 'node:fs'
import { JSDOM } from 'jsdom'

const text = fs.readFileSync('out2.html', 'utf8')
const dom = new JSDOM(text)
const doc = dom.window.document
// console.log(dom)

// const o = doc.getElementById('page_n_form')
// console.log(o.textContent)
const p = doc.querySelectorAll('#page_n_form table tr td font:nth-child(2) b')
console.log(p.length)
console.log(p[0].innerHTML)

// const rows = doc.querySelectorAll(
//   'body > table:nth-child(3) > tr > td > table > tr:nth-child(2) > td:nth-child(2) > table > tr:nth-child(2) > td > div > table > tr:nth-child(2) > td > div > table > tr:nth-child(2) > td > table:nth-child(2) > tr:nth-child(2) > td > table > tr'
// )
// console.log(rows)

// const totalPage = doc.querySelectorAll(
//   '#page_n_form'
//   // '#page_n_form > table > tr > td > font:nth-child(2) > b'
// )
// console.log(totalPage)
