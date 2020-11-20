export function setItem(name,item) {
  sessionStorage.setItem(name,JSON.stringify(item))
}
export function getItem(name,type='obj') {
    return JSON.parse(sessionStorage.getItem(name)) 
}
export function removeItem(name) {
   sessionStorage.removeItem(name)
}
export function clearSession() {
   sessionStorage.clear()
}