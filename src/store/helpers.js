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
 * This comparator compares two strings by splitting each string into words.
 * Pairs of words are then compared lexicographically or as numbers if
 * possible.
 */
export function lexicographicalComparator(a, b, isAsc) {
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

      return (isAsc ? aNumber > bNumber : bNumber > aNumber);
    }

    // Not numbers
    return (isAsc ? aPart.str > bPart.str : bPart.str > aPart.str);
  }

  return (isAsc ? splitA.length > splitB.length : splitB.length > splitA.length);
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

