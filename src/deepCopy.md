```
// 1. JOSN.stringify()/JSON.parse()
let obj = {a: 1, b: {x: 3}}
JSON.parse(JSON.stringify(obj))

// 2. 递归拷贝
function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {}
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return copy
}
 
 2. 
 const deepCopy = o => typeof o !== 'object' ? o : Object.keys(o).reduce((obj, key) => (obj[key] = deepCopy(o[key])) && obj, Array.isArray(o) ? [] : {});
```