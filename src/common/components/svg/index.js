import svgIcon from './index.vue';
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@/assets/img/icon', false, /\.svg$/);
requireAll(req);
export default svgIcon;
