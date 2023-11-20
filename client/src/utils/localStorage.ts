export const getLocalStorageItem = (
  keyName: string,
  defaultValue: string = ''
) => {
  try {
    const value = window.localStorage.getItem(keyName) || defaultValue
    return JSON.parse(value)
  } catch (err) {
    console.log(err)
    return defaultValue
  }
}

export const setLocalStorageItem = (keyName: string, value: string) => {
  try {
    window.localStorage.setItem(keyName, JSON.stringify(value))
  } catch (err) {
    console.log(err)
  }
}

export const clearLocalStorageItem = (keyName: string) => {
  try {
    window.localStorage.removeItem(keyName)
  } catch (err) {
    console.log(err)
  }
}
