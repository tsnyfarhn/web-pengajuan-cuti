export const MINIMUM_IZIN_WORKING_DAYS = 3;

export function addWorkingDays(startDate, daysToAdd) {
    const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
    );

    let addedDays = 0;

    while (addedDays < daysToAdd) {
        date.setDate(date.getDate() + 1);

        const day = date.getDay();

        if (day !== 0 && day !== 6) {
            addedDays += 1;
        }
    }

    return date;
}

export function formatDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getMinimumTanggalIzin(referenceDate = new Date()) {
    return formatDateInputValue(
        addWorkingDays(referenceDate, MINIMUM_IZIN_WORKING_DAYS)
    );
}

export function formatDisplayDate(dateValue) {
    const [year, month, day] = dateValue.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
}
