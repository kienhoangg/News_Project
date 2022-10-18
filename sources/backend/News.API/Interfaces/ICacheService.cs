using Microsoft.Extensions.Caching.Distributed;

namespace News.API.Interfaces
{
    public interface ICacheService
    {
        Task SetCacheAsync(string keys, string value, DistributedCacheEntryOptions options);

        Task<int> GetCountKeys();
    }
}