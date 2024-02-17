export function convertDate() {
    const currentDate = new Date();

    // Get day, month, and year components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months start from 0, so add 1
    const year = currentDate.getFullYear();

    // Create date string "day-month-year"
    const dateString = `${day}-${month}-${year}`;

    return dateString;
}

const result = convertDate();

