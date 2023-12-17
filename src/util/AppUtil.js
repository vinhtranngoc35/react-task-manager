

export const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;

}
export const getTimeString = () => {
    const currentTime = new Date();

    // Format the time to HH:MM format
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;

}