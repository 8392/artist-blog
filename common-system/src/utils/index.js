/**
 * 深度克隆
 * @param {Object} obj
 * @returns {Object} new obj
 */
export function cloneObj(obj) {
    if (typeof obj === 'object') {
        return JSON.parse(JSON.stringify(obj))
    }
}

/**
 * @param {function} fn
 * @param {number} time
 * @returns {function}
 */
export function debounce(fn, time) {
    time = time || 300
    let timeIndex = null
    return function () {
        if (timeIndex) {
            clearTimeout(timeIndex)
            timeIndex = null
        }
        timeIndex = setTimeout(() => {
            fn.apply(this, arguments)
        }, time)
    }
}

/**
 * @param {function} fn
 * @param {number} time
 * @returns {function}
 */
export function throttle(fn, time) {
    time = time || 300
    let canRun = true
    return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            canRun = true
        }, time)
    }
}

/**
 * 判断 vnode
 * @param {Vnode Element} node
 * @returns {boolean}
 */
export function isVNode(node) {
    return node !== null && typeof node === 'object' && node.hasOwnProperty('componentOptions')
}

export function parseSearch(str) {
    return decodeURIComponent(str)
        .slice(1)
        .split('&')
        .reduce((search, item) => {
            const [key, value] = item.split('=')
            search[key] = value
            return search
        }, {})
}

/**
 * 解析 url
 * @param {String} path
 * @returns {Object}
 */
export function pathParse(path) {
    // console.log('path', path)

    if (typeof path !== 'string') {
        console.error('pathParse function need string param')
        path = String(path)
    }

    const CHAR_FORWARD_SLASH = 47 /* / */
    const CHAR_DOT = 46 /* . */

    const ret = { root: '', dir: '', base: '', ext: '', name: '' }
    if (path.length === 0) { return ret }
    const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH
    let start
    if (isAbsolute) {
        ret.root = '/'
        start = 1
    } else {
        start = 0
    }
    let startDot = -1
    let startPart = 0
    let end = -1
    let matchedSlash = true
    let i = path.length - 1

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    let preDotState = 0

    // Get non-dir info
    for (; i >= start; --i) {
        const code = path.charCodeAt(i)
        if (code === CHAR_FORWARD_SLASH) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
                startPart = i + 1
                break
            }
            continue
        }
        if (end === -1) {
            // We saw the first non-path separator, mark this as the end of our
            // extension
            matchedSlash = false
            end = i + 1
        }
        if (code === CHAR_DOT) {
            // If this is our first dot, mark it as the start of our extension
            if (startDot === -1) { startDot = i } else if (preDotState !== 1) { preDotState = 1 }
        } else if (startDot !== -1) {
            // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1
        }
    }

    if (end !== -1) {
        const start = startPart === 0 && isAbsolute ? 1 : startPart
        if (startDot === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)) {
            ret.base = ret.name = path.slice(start, end)
        } else {
            ret.name = path.slice(start, startDot)
            ret.base = path.slice(start, end)
            ret.ext = path.slice(startDot, end)
        }
    }

    if (startPart > 0) { ret.dir = path.slice(0, startPart - 1) } else if (isAbsolute) { ret.dir = '/' }
    console.log('ret:', ret)
    return ret
}
