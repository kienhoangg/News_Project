using System;
using AutoMapper;
using System.Reflection;
using Infrastructure.Shared.Paging;

namespace Infrastructure.Mappings
{
    public static class AutoMapperExtension
    {
        public static IMappingExpression<TSource, TDestination> IgnoreAllNonExisting<TSource, TDestination>
         (this IMappingExpression<TSource, TDestination> expression)
        {
            var flags = BindingFlags.Public | BindingFlags.Instance;
            var sourceType = typeof(TSource);
            var destinationProperties = typeof(TDestination).GetProperties(flags);

            foreach (var property in destinationProperties)
                if (sourceType.GetProperty(property.Name, flags) == null)
                    expression.ForMember(property.Name, opt => opt.Ignore());
            return expression;
        }

        public static Task<PagedResult<TDestination>> PaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, int pageIndex, int pageSize) where TDestination : class
        => PagedResult<TDestination>.ToPagedList(queryable, pageIndex, pageSize);
    }
}

