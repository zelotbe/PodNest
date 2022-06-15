export default function getLastModifiedString(modifiedDate) {
    const modifiedMS = new Date() - modifiedDate;
    const days = Math.round(modifiedMS / (1000 * 60 * 24 * 60));

    let message;
    
    if (days >= 31) {
        message = "More than a month";
    } else if (days < 31 && days !== 1 && days > 1) {
        message = `${days} days ago`;
    } else if (days === 1) {
        message = "Yesterday";
    } else if (days === 0) {
        message = "Today";
    } else {
        message = "No data found";
    }
    return message;
}
