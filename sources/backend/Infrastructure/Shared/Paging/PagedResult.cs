using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Shared.Paging
{
    public class PagedResult<T> : PagedResultBase
    {
        public IList<T> Results { get; set; }
        public PagedResult()
        {
            Results = new List<T>();
        }

        public PagedResult(List<T> items, int totalItems, int pageIndex, int pageSize)
        {

            this.CurrentPage = pageIndex;
            this.PageSize = pageSize;
            this.RowCount = totalItems;
            this.Results = items;
        }




        public static async Task<PagedResult<T>> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize, Expression<Func<T, bool>> expression = null)
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

