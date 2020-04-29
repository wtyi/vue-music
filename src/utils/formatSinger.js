export default function (ar) {
    if (ar && ar.length === 1) {
        return ar[0].alia ? ar[0].alia[0] : ar[0].name
    } else if (ar && ar.length > 1) {
        let str = ''
        const names = ar.map(a => {
            // if (a.alia && a.alia[0]) {
            //     return a.alia[0]
            // } else {
            //     return a.name
            // }
            return a.name
        })
        str = names.join('/')
        return str
    }
}
