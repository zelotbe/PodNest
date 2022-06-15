export default function getLastModifiedString(modifiedDate) {
  const currentDate = new Date();
  const modifiedMS = currentDate - modifiedDate;
  const modifiedDays = Math.round(modifiedMS / (1000 * 60 * 24 * 60));

  let modifiedString;
  if (modifiedDays >= 31) {
    modifiedString = "More than a month";
  } else if (modifiedDays < 31 && modifiedDays !== 1 && modifiedDays > 1) {
    modifiedString = `${modifiedDays} days ago`;
  } else if (modifiedDays === 1) {
    modifiedString = "Yesterday";
  } else {
    modifiedString = "Today";
  }
  return modifiedString;
}
