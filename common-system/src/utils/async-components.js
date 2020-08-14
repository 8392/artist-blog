import Axios from 'axios'

const asyncComponent = {}
function getComponent(url) {
    if (!asyncComponent[url]) {
        asyncComponent[url] = Axios.get(url)
    }
    return asyncComponent[url]
        .then((res) => res)
        .catch((err) => {
            asyncComponent[url] = null
            throw err
        })
}

export default getComponent
