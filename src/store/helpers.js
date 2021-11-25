export function mapId(combinedId) {
  return String(combinedId.categoryId) + "_" + String(combinedId.matchId);
}

function isNumeric(c) {
  return '0' <= c && c <= '9';
}

function splitIntoCharacters(str) {
  var res = [];

  for (var i = 0; i < str.length; i++) {
    var cur = str[i];

    if (isNumeric(str[i])) {
      while (i + 1 < str.length && isNumeric(str[i+1])) {
        cur += str[i+1];
        i++
      }
    }

    res.push({ 'isNumber' : isNumeric(str[i]), 'str': cur });
  }

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
 * This comparator compares two strings by splitting each string into
 * characters and comparing the strings character by characters. However,
 * consecutive digits are considered one character.
 */
export function lexicographicalComparator(a, b) {
  const splitA = splitIntoCharacters(a);
  const splitB = splitIntoCharacters(b);

  for (var i = 0; i < splitA.length && i < splitB.length; i++) {
    const aPart = splitA[i];
    const bPart = splitB[i];

    if (aPart.isNumber != bPart.isNumber) {
      return bPart.isNumber - aPart.isNumber;
    }

    if (aPart.isNumber && bPart.isNumber) {
      const aNumber = Number(aPart.str);
      const bNumber = Number(bPart.str);

      if (aNumber == bNumber)
        continue;
      return aNumber - bNumber;
    }

    const compareResult = localeComparator(aPart.str, bPart.str);
    if (compareResult == 0)
      continue;
    return compareResult;
  }

  return splitA.length > splitB.length;
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

