// let array = [
//   'a',
//   'ah',
//   'ab',
//   'bro',
//   'balou',
//   'hey',
//   'hoho',
//   'hhh',
//   'sexy',
//   'soup',
//   'zebra',
// ];

// let searchResult = searchBinary('z', array, false);
// console.log(searchResult);

export const searchBinary = function (
  needle: string,
  haystack: string[],
  case_insensitive: boolean
) {
  if (needle == '') return [];
  let haystackLength = haystack.length;
  let letterNumber = needle.length;
  case_insensitive =
    typeof case_insensitive === 'undefined' || case_insensitive ? true : false;
  needle = case_insensitive ? needle.toLowerCase() : needle;

  /* start binary search, Get middle position */
  let getElementPosition = findElement();

  /* get interval and return result array */
  if (getElementPosition == -1) return [];

  let getRangeElement = [];

  return (getRangeElement = findRangeElement());

  function findElement() {
    if (typeof haystack === 'undefined' || !haystackLength) return -1;

    let high = haystack.length - 1;
    let low = 0;

    while (low <= high) {
      let mid = parseInt((low + high) / 2);
      var element = haystack[mid].substr(0, letterNumber);
      element = case_insensitive ? element.toLowerCase() : element;

      if (element > needle) {
        high = mid - 1;
      } else if (element < needle) {
        low = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
  function findRangeElement() {
    for (let i = getElementPosition; i > 0; i--) {
      var element = case_insensitive
        ? haystack[i].substr(0, letterNumber).toLowerCase()
        : haystack[i].substr(0, letterNumber);
      if (element != needle) {
        var start = i + 1;
        break;
      } else {
        var start = 0;
      }
    }
    for (let i = getElementPosition; i < haystackLength; i++) {
      var element = case_insensitive
        ? haystack[i].substr(0, letterNumber).toLowerCase()
        : haystack[i].substr(0, letterNumber);
      if (element != needle) {
        var end = i;
        break;
      } else {
        var end = haystackLength - 1;
      }
    }
    var result = [];
    for (let i = start; i < end; i++) {
      result.push(haystack[i]);
    }

    return result;
  }
};
