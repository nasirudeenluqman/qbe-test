
type DateString = string;

export const validateDateOfBirth = (dateString: string) => {
    const todayDate = new Date();
    const dateOfBirth = new Date(dateString);
    if (dateOfBirth.toString() === "Invalid Date") {
        return 'Please enter a valid date';
    }
    if (dateOfBirth > todayDate) {
        return 'Date cannot be future date';
    }
    return '';
}

export const calculateAge = (dateOfBirth: DateString) => {
    const birthDate = new Date(dateOfBirth);
    const todayDate = new Date();

    let years = todayDate.getFullYear() - birthDate.getFullYear();
    let monthDifference = todayDate.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && todayDate.getDate() < birthDate.getDate())) {
        years--;
        monthDifference += 12;
    }
    let months = monthDifference
    let days = todayDate.getDate() - birthDate.getDate();


    if (todayDate.getDate() < birthDate.getDate() && months > 1) {
        months--;
    }
    if (days < 0) {
        var prevMonthDate = new Date(todayDate.getFullYear(), todayDate.getMonth() - 1, birthDate.getDate());
        days = Math.floor((todayDate.getTime() - prevMonthDate.getTime()) / (1000 * 60 * 60 * 24));
        months--;
    }


    return {
        years,
        months,
        days
    }
}