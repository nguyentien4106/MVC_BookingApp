using System.Text.Json;

namespace BookingApp.Common.Model.Result
{
    public class Result
    {
        public Result() { }

        public Result(string message, bool isSuccessfully, object? data = null) 
        {
            Message = message;

            IsSuccessfully = isSuccessfully;

            Data = data;
        }


        public static Result Success(object? data = null) => new Result("Successfully", true, data);

        public static Result Fail(string message) => new Result(message, false);

        public string Message { get; set; }

        public bool IsSuccessfully { get; set; }

        public object? Data { get; set; }

    }
}
