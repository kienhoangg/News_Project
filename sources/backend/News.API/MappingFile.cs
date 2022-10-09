using System.Data.Common;
using AutoMapper;
using Infrastructure.Mappings;
using Models.Dtos;
using Models.Dtos.Documents;
using Models.Entities;

namespace News.API
{
    public class MappingFile : Profile
    {
        public MappingFile()
        {
            CreateMap<Document, DocumentDto>().IgnoreAllNonExisting();
            CreateMap<DocumentDto, Document>().IgnoreAllNonExisting();
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
            CreateMap<DocumentField, DocumentFieldDto>().IgnoreAllNonExisting();
            CreateMap<DocumentFieldDto, DocumentField>().IgnoreAllNonExisting();
            CreateMap<DocumentType, DocumentTypeDto>().IgnoreAllNonExisting();
            CreateMap<DocumentTypeDto, DocumentType>().IgnoreAllNonExisting();
            CreateMap<DocumentDepartment, DocumentDepartmentDto>().IgnoreAllNonExisting();
            CreateMap<DocumentDepartmentDto, DocumentDepartment>().IgnoreAllNonExisting();
            CreateMap<DocumentSignPerson, DocumentSignPersonDto>().IgnoreAllNonExisting();
            CreateMap<DocumentSignPersonDto, DocumentSignPerson>().IgnoreAllNonExisting();
        }
    }
}
