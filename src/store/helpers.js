export function mapId(combinedId) {
  return String(combinedId.categoryId) + "_" + String(combinedId.matchId);
}

// export function lexicographicalCompare(a, b, isAsc) {
//   // Split the string and compare each part
//   // Compare numbers as numbers
//   if (a == b)
//     return 0;

//   const aName = a.split(" ");
//   const bName = b.split(" ");

//   for (var i = 0; i < aName.length && i < bName.length; i++) {
//     const aPart = aName[i]
//     const bPart = bName[i]

//     if (aPart == bPart)
//       continue;

//     const aNumber = Number(aPart);
//     const bNumber = Number(bPart);

//     // Compare parts as numbers
//     if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
//       if (aNumber == bNumber)
//         continue;
//       return (aNumber < bNumber && isAsc ? -1 : 1);
//     }

//     // Compare parts as strings
//     if (Number.isNaN(aNumber) && Number.isNaN(bNumber)) {
//       if (aPart == bPart)
//         continue;
//       return (aPart < bPart && isAsc ? -1 : 1);
//     }

//     // Numbers should appear first in the ordering
//     if (!Number.isNaN(aNumber))
//       return (isAsc ? -1 : 1);

//     // if (!Number.isNaN(bNumber))
//     return (isAsc ? 1 : -1);
//   }

//   // Both compare equal so far. The shortest should appear first
//   return (aName.length < bName.length && isAsc ? -1 : 1);
// }

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

export function lexicographicalCompare(a, b, isAsc) {
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

