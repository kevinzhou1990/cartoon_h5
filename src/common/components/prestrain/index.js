/**
 * @info: 预加载
 * @author: PengGeng
 * @date: 8/26/20-2:18 下午
 */
import prestrained from './lottieload'
const Prestranining = flag => {
  if (flag) {
	  prestrained.show()
  } else {
	  prestrained.hide()
  }
}
export default Prestranining
