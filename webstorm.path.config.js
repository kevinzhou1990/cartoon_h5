// webstorm 做路径对比使用
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	resolve: {
		alias: {
			'@': resolve('src'),
			'lib': resolve('src/lib')
		}
	}
}