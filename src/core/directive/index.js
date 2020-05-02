import hammer from './hammer'
import Load from './load'
/**
 * 注册指令
 * @param {} app
 */
function registerDirective (app) {
    hammer(app)
    Load(app)
}

export default registerDirective
