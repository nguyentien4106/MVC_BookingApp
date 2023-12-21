using Microsoft.AspNetCore.Mvc;

namespace BookingApp.Models.Result
{
    public class Result : JsonResult
    {
        public Result(string message, bool isSuccessfully, object? data = null) : base(data)
        {
            Message = message;

            IsSuccessfully = isSuccessfully;

        }

        public Result() : base(null)
        {
            
        }

        public static Result Success(object? data = null) => new Result("Successfully", true, data);

        public static Result Fail(string message) => new Result(message, false);

        public string Message { get; set; }

        public bool IsSuccessfully { get; set; }

    }
}
