const fs = require('fs')
const path = require('path')

let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'LB TAHUNAN.json'), 'utf8'))
console.log(data.length)

data = data.filter(d => {
    d.tahun = d.masa.tahun.split(/\/|\-/)[1].trim()
    d.masa = d.no_tt.match(/ppwbidr/i) ? '0' : d.masa.tahun.split('/')[0].trim()
    d.status = d.restitusi.kompensasi
    delete d.restitusi
    return d.status === 'restitusi'
})

console.log(data.filter(d => d.sumber.match(/efiling/i)))
// console.log(data[0])