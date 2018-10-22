let fs = require('fs')
const levenshtein = require('js-levenshtein');
// console.log(levenshtein(sourceData[0], sourceData[1]))
const cNum = 3 //Change number of clusters here
const maxIteration = 500
let prototype = []

const fetchData = new Promise((resolve) => {
    let res = []
    for (let i = 1; i <= 22; i++) {
        let input = fs.readFileSync(`chrom/dif${i}da`, 'utf8').trim().split('\r\n').map(x => x.split('\t'))
        res = res.concat(input)
    }
    resolve(res)
})

const main = async () => {
    let cluster = []
    let e = 0
    let sourceData = await fetchData.then((values) => {
        return values.map((value) => value[1])
    })

    console.log(sourceData, sourceData.length)
    for (let i = 0; i < cNum; i++) {
        // let rand = sourceData.splice(Math.floor(Math.random() * sourceData.length), 1)
        let rand = Math.floor(Math.random() * sourceData.length)
        prototype.push(rand)
        cluster.push([])
    } 

    console.log(prototype)
    console.log(cluster[0])
    console.log(cluster[1])
    console.log(cluster[2])

    let Dc1 = levenshtein(sourceData[0], sourceData[prototype[0]])
    let Dc2 = levenshtein(sourceData[0], sourceData[prototype[1]])
    let Dc3 = levenshtein(sourceData[0], sourceData[prototype[2]])
    console.log(Dc1)
    console.log(Dc2)
    console.log(Dc3)
}

main()