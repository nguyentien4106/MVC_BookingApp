using AutoMapper;

namespace BookingApp.Profile.Converter
{
    public class StringToDateTime : IValueConverter<string, DateTime?>
    {
        public DateTime? Convert(string sourceMember, ResolutionContext context)
        {
            if(DateTime.TryParse(sourceMember, out DateTime result))
            {
                return result;
            }

            return DateTime.Now;
        }
    }
}
