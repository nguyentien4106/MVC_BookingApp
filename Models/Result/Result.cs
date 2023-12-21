namespace BookingApp.Models.Result
{
    public class Result
    {
        public Result(string message, bool isSuccessfully)
        {
            Message = message;

            IsSuccessfully = isSuccessfully;

        }

        public static Result Success() => new Result("Successfully", true);

        public static Result Fail(string message) => new Result(message, false);

        public string Message { get; set; }

        public bool IsSuccessfully { get; set; }
    }
}
