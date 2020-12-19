/**
 * Converts date to value that can be consumed by input[type="date"]
 *
 * @param {Object} dateObj
 */
export function dateToValue(dateObj) {
  return dateObj.iso.substr(0, 10)
}

/**
 * Converts date object to printable/renderable string
 *
 * @param {Object} dateObj
 */

export function dateToString(dateObj) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York' }).format(
    new Date(dateObj.iso),
  )
}

/**
 *  Converts string date value to date object used by API
 *
 * @param {Object} dateObj
 */
export function valueToDate(dateValue) {
  return new Date(dateValue.iso)
}
