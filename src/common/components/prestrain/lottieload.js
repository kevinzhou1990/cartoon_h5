import * as animationDate from './home.json'
let divElem
// let loadJsonPath
let width
class CanvasLoading {
  constructor() {
	  // loadJsonPath = './home.json'
	  // 申明一个遮罩层 div
	  width =
			  parseInt(document.documentElement.style.fontSize, 10) *
			  (window.devicePixelRatio || 2)
	  divElem = document.createElement('div')
	  divElem.style.display = 'none'
	  divElem.style.width = '100%'
	  divElem.style.height = '100%'
	  divElem.style.position = 'fixed'
	  divElem.style.left = '0'
	  divElem.style.top = '0'
	  divElem.style.zIndex = '99999999'
	  document.body.appendChild(divElem)
	  if (!window.lottie){
      console.log('加载预加载失败')
	  }
	  console.log(width)
	  window.lottie && window.lottie.loadAnimation({
		  container: divElem,
		  path: animationDate,
		  animationData: animationDate,
		  renderer: 'svg',
		  loop: true,
		  autoplay: true
	  })
  }
  show() {
    divElem.style.display = 'block'
  }
  hide() {
    divElem.style.display = 'none'
  }
}
export default new CanvasLoading()
