using AutoMapper;

namespace BookingApp.Profile.Converter
{
    public class DateTimeToString : IValueConverter<DateTime, string>
    {
        public string Convert(DateTime sourceMember, ResolutionContext context)
        {
            if(sourceMember == null)
            {
                return string.Empty;
            }
            return sourceMember.ToString();
        }
    }
}
