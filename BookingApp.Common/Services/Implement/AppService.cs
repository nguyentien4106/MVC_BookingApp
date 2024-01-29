using AutoMapper;
using BookingApp.Common.Data;
using BookingApp.Common.Entities;
using BookingApp.Common.Service;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BookingApp.Common.Services.Implement
{
    public class AppService<TModel, TDto> : IAppService<TModel, TDto>
                                    where TModel : class
                                    where TDto : class
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _dbContext;

        public AppService(IMapper mapper, ApplicationDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        // Rest of the methods will be implemented here

        public async Task<IEnumerable<TDto>> GetAll(
            Expression<Func<TModel, bool>>? where = null, 
            params string[] includes
            )
        {
            var query = ApplyIncludes(_dbContext.Set<TModel>(), includes);

            if (where != null)
            {
                query = query.Where(where);
            }

            var entities = await query.ToListAsync();
            return _mapper.Map<IEnumerable<TDto>>(entities);
        }

        public async Task<TDto?> GetById(Expression<Func<TModel, bool>> predicateToGetId, params string[] includes)
        {
            var query = ApplyIncludes(_dbContext.Set<TModel>(), includes);

            var entity = await query.FirstOrDefaultAsync(predicateToGetId);

            return entity == null ? null : _mapper.Map<TDto>(entity);
        }

        public async Task<TDto> Add(TDto dto, params Expression<Func<TModel, object>>[] references)
        {
            var entity = _mapper.Map<TModel>(dto);
            LoadReferences(entity, references);

            await _dbContext.Set<TModel>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return dto;
        }

        public async Task<TDto> Update(TDto dto, Expression<Func<TModel, bool>>? where = null, params Expression<Func<TModel, object>>[] references)
        {
            var entity = await _dbContext.Set<TModel>().FirstOrDefaultAsync(where ?? throw new ArgumentNullException(nameof(where)));
            _mapper.Map(dto, entity);
            LoadReferences(entity, references);

            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();

            return dto;
        }


        public async Task<TDto> Update(TDto dto, Expression<Func<TModel, object>> identity = null, Expression<Func<TModel, bool>>? where = null, params Expression<Func<TModel, object>>[] references)
        {
            var entity = await _dbContext.Set<TModel>().FirstOrDefaultAsync(where ?? throw new ArgumentNullException(nameof(where)));
            _mapper.Map(dto, entity);
            LoadReferences(entity, references);

            _dbContext.Update(entity);
            _dbContext.Entry(entity).Property(identity).IsModified = false;

            await _dbContext.SaveChangesAsync();

            return dto;
        }

        public async Task<bool> Delete(Guid id)
        {
            try
            {
                var entity = await _dbContext.Set<TModel>().FindAsync(id);
                if (entity == null) return false;

                _dbContext.Remove(entity);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        private IQueryable<TModel> ApplyIncludes(IQueryable<TModel> query, params string[] includes)
        {
            return includes.Aggregate(query, (current, include) => current.Include(include));
        }

        private void LoadReferences(TModel entity, params Expression<Func<TModel, object>>[] references)
        {
            foreach (var reference in references)
            {
                _dbContext.Entry(entity).Reference(reference).Load();
            }
        }

        public async Task<TModel> GetEntityById(Expression<Func<TModel, bool>> predicateToGetId, params string[] includes)
        {
            var query = ApplyIncludes(_dbContext.Set<TModel>(), includes);

            var entity = await query.FirstOrDefaultAsync(predicateToGetId);

            return entity;
        }

        public async Task<bool> Delete(Expression<Func<TModel, bool>>? where = null)
        {
            var query = ApplyIncludes(_dbContext.Set<TModel>());

            if (where != null)
            {
                query = query.Where(where);
            }

            var entities = await query.ToListAsync();

            try
            {
                _dbContext.RemoveRange(entities);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        internal Task Add(CollaboratorServices item)
        {
            throw new NotImplementedException();
        }
    }
}
