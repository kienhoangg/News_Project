using System;
using AutoMapper;
using Infrastructure.Mappings;
using Models.Dtos;
using Models.Entities;
using Models.Entities.News;

namespace News.API
{
    public class MappingFile : Profile
    {
        public MappingFile()
        {
            CreateMap<Document, DocumentDto>().IgnoreAllNonExisting();
            CreateMap<CategoryNews, CategoryNewsDto>().IgnoreAllNonExisting();
            CreateMap<CategoryNewsDto, CategoryNews>().IgnoreAllNonExisting();
            CreateMap<FieldNews, FieldNewsDto>().IgnoreAllNonExisting();
            CreateMap<FieldNewsDto, FieldNews>().IgnoreAllNonExisting();
            CreateMap<SourceNews, SourceNewsDto>().IgnoreAllNonExisting();
            CreateMap<SourceNewsDto, SourceNews>().IgnoreAllNonExisting();
            CreateMap<NewsPost, NewsPostDto>().IgnoreAllNonExisting();
            CreateMap<NewsPostDto, NewsPost>().IgnoreAllNonExisting();
            CreateMap<Collaborator, CollaboratorDto>().IgnoreAllNonExisting();
            CreateMap<CollaboratorDto, Collaborator>().IgnoreAllNonExisting();
            CreateMap<Comment, CommentDto>().IgnoreAllNonExisting();
            CreateMap<CommentDto, Comment>().IgnoreAllNonExisting();
        }
    }
}
