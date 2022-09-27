using System;
using Infrastructure.Shared.Paging;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace News.API.Extensions
{
    public static class IQueryableExtension
    {
        public static async Task<PagedResult<T>> ToPagedList<T>(this IQueryable<T> source, int pageNumber, int pageSize, Expression<Func<T, bool>> expression = null) where T : class
        {
            if (expression != null)
            {
                source = source.Where(expression);
            }
            var count = await source.CountAsync();
            var items = await source
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize).ToListAsync();

            return new PagedResult<T>(items, count, pageNumber, pageSize);
        }
    }
}

