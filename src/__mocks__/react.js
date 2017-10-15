const react = require('react');
// Resolution for requestAnimationFrame not supported in jest error :
// https://github.com/facebook/react/issues/9102#issuecomment-283873039
global.window = global;
window.addEventListener = () => {};
window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};
const root = document.createElement('div');
root.setAttribute('id','root');
document.body.appendChild(root);
root.style.width = '604px';

module.exports = react;
