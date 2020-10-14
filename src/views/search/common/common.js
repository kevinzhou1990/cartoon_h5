function setLocalStorage(val) {
  let arr = []
  if (localStorage.getItem('HISTROY_WORDS')) {
    arr.push(...JSON.parse(localStorage.getItem('HISTROY_WORDS')))
  } else {
    arr = []
  }
  if (arr.length >= 10 && arr.indexOf(val) <= -1){
    arr.pop()
    arr.unshift(val)
  } else if (arr.indexOf(val) <= -1){
    arr.unshift(val)
  }
  localStorage.HISTROY_WORDS = JSON.stringify(arr)
}
export default setLocalStorage
