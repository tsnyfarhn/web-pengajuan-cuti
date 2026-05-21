public static class DateHelper
{
    public static DateOnly AddWorkingDays(DateOnly startDate, int daysToAdd)
    {
        DateOnly date = startDate;
        int addedDays = 0;

        while (addedDays < daysToAdd)
        {
            date = date.AddDays(1);

            if (date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday)
            {
                addedDays++;
            }
        }

        return date;
    }
}