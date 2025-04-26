public int CalculateDaysBetweenDates(DateTime startDate, DateTime endDate) 
{
    TimeSpan duration = endDate - startDate;
    return duration.Days;
}