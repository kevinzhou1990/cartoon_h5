function setLocalStorage(val) {
  let arr = []
  if (localStorage.getItem('HISTROY_WORDS')) {
    arr.push(...JSON.parse(localStorage.getItem('HISTROY_WORDS')))
  } else {
    arr = []
  }
  // arr = 10  并且有  移到第一位
  if (arr.length >= 10 && arr.indexOf(val) <= -1){
    arr.pop()
    // arr.unshift(val)
	  arr.splice(0, 0, val)
  } else if (arr.indexOf(val) <= -1){
    arr.splice(0, 0, val)
  } else {
    // 再次点击的移到第一位
    arr.splice(0, 0, arr.splice(arr.indexOf(val), 1)[0])
  }
  localStorage.HISTROY_WORDS = JSON.stringify(arr)
}
export default setLocalStorage
