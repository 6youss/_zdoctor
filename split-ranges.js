/**
 *
 * @param {{from:number,to:number}} refRange
 * @param {{from:number,to:number}} range
 * returns IN IN_RIGHT IN_LEFT OUT REF_IN
 */
function rangeToRangeStatus(refRange, range) {
  if (range.from <= refRange.from && range.to >= refRange.from && range.to <= refRange.to) {
    return "IN_LEFT";
  }
  if (range.from >= refRange.from && range.to >= refRange.to && range.from <= refRange.to) {
    return "IN_RIGHT";
  }
  if (range.from >= refRange.to || range.to <= refRange.from) {
    return "OUT";
  }
  if (range.from >= refRange.from && range.to <= refRange.to) {
    return "IN";
  }
  if (range.from <= refRange.from && range.to >= refRange.to) {
    return "REF_IN";
  }
}

function split(ranges, cutRange) {
  let splitresult = [];

  for (let i = 0; i < ranges.length; i++) {
    let currentRange = ranges[i];

    switch (rangeToRangeStatus(cutRange, currentRange)) {
      case "IN_LEFT":
        splitresult.push({
          from: currentRange.from,
          to: cutRange.from,
        });
        break;
      case "IN_RIGHT":
        splitresult.push({
          from: cutRange.to,
          to: currentRange.to,
        });
        break;
      case "OUT":
        splitresult.push({
          ...currentRange,
        });
        break;
      case "IN":
        continue;
      case "REF_IN":
        splitresult.push({
          from: currentRange.from,
          to: cutRange.from,
        });

        splitresult.push({
          from: cutRange.to,
          to: currentRange.to,
        });
        break;
      default:
        break;
    }
  }
  return splitresult;
}
const ranges = [{ from: 1, to: 13 }];
const splitResult = split(ranges, { from: 2, to: 7 });

console.log({ ranges, splitResult });
