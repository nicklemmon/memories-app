/**
 * Converts date to value that can be consumed by input[type="date"]
 *
 * @param {Object} dateObj
 *
 */
export function dateToValue(dateObj) {
  return dateObj.iso.substr(0, 10)
}

/**
 * Converts date object to printable/renderable string
 *
 * @param {Object} dateObj
 *
 */
export function dateToString(dateObj) {
  return new Date(dateObj.iso).toLocaleDateString('en-us', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'utc',
  })
}

/**
 *  Converts string date value to date object used by API
 *
 * @param {string} dateValue - date string
 *
 */
export function valueToDate(dateValue) {
  return new Date(dateValue)
}
