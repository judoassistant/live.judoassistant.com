export function mapId(combinedId) {
  return String(combinedId.categoryId) + "_" + String(combinedId.matchId);
}

function isNumeric(c) {
  return '0' <= c && c <= '9';

}

function splitString(str) {
  var res = [];
  var cur = "";
  var isNumber;

  for (const c of str) {
    if (cur.length > 0) {
      if (isNumeric(c) != isNumber) {
        res.push({ 'isNumber' : isNumber, 'str': cur });
        cur = "";
      }
    }

    isNumber = isNumeric(c);
    cur += c;
  }

  if (cur.length > 0)
    res.push({ 'isNumber' : isNumber, 'str': cur });

  return res;
}

/*
 * Compares object using localeCompare on strings
 */
export function localeComparator(a, b) {
  const areBothStrings = (typeof a == "string") && (typeof b == "string");
  if (areBothStrings) {
    return a.localeCompare(b, "da");
  }

  if (a > b)
    return 1;
  if (a < b)
    return -1;
  return 0;
}

/*
 * This comparator compares two strings by splitting each string into words.
 * Pairs of words are then compared as strings or numbers.
 */
export function lexicographicalComparator(a, b) {
  const splitA = splitString(a);
  const splitB = splitString(b);

  for (var i = 0; i < splitA.length && i < splitB.length; i++) {
    const aPart = splitA[i];
    const bPart = splitB[i];

    if (aPart.str == bPart.str)
      continue;

    if (aPart.isNumber && bPart.isNumber) {
      const aNumber = Number(aPart.str);
      const bNumber = Number(bPart.str);

      return aNumber - bNumber;
    }

    // Not numbers
    return localeComparator(aPart, bPart);
  }

  return splitA.length - splitB.length;
}

/*
 * Compares two match lexicographically by categoryId, position
 */
export function playerMatchesComparator(a, b) {
  if (a.combinedId.categoryId != b.combinedId.categoryId)
    return a.combinedId.categoryId - b.combinedId.categoryId;

  return a.position - b.position;
}

/*
 * Compare numbers but order null values at the end
 */
export function resultsComparator(a, b) {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;

  return a - b;
}

