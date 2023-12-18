using System.Linq.Expressions;

namespace BookingApp.Service
{
    public interface IAppService<TModel, TDto>
    {
        Task<IEnumerable<TDto>> GetAll(Expression<Func<TModel, bool>>? where = null, params string[] includes);
        Task<TDto?> GetById(Expression<Func<TModel, bool>> predicateToGetId, params string[] includes);
        Task<TDto> Add(TDto dto, params Expression<Func<TModel, object>>[] references);
        Task<TDto> Update(TDto dto, Expression<Func<TModel, bool>>? where = null, params Expression<Func<TModel, object>>[] references);
        Task<bool> Delete(int id);
    }
}
