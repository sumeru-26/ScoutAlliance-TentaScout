function setToStorage(key, data) {
    if (import.meta.client) {
        localStorage.setItem(key, data)
        return true
    } else {
        return false
    }
}

function getFromStorage(key) {
    
    if (import.meta.client) {
        return localStorage.getItem(key)
    } else {
        return undefined
    }
}

function removeFromStorage(key) {
    if (import.meta.client) {
        localStorage.removeItem(key)
        return true
    } else {
        return false
    }
}

export { setToStorage, getFromStorage, removeFromStorage }