using AutoMapper;
using Infrastructure.Mappings;
using Models.Dtos;
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
            CreateMap<NewsPost, NewsPostWithoutContentDto>().IgnoreAllNonExisting();
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
            CreateMap<Question, QuestionDto>().IgnoreAllNonExisting();
            CreateMap<QuestionDto, Question>().IgnoreAllNonExisting();
            CreateMap<QuestionCategory, QuestionCategoryDto>().IgnoreAllNonExisting();
            CreateMap<QuestionCategoryDto, QuestionCategory>().IgnoreAllNonExisting();
            CreateMap<StaticCategory, StaticCategoryDto>().IgnoreAllNonExisting();
            CreateMap<StaticCategoryDto, StaticCategory>().IgnoreAllNonExisting();
            CreateMap<StaticInfo, StaticInfoDto>().IgnoreAllNonExisting();
            CreateMap<StaticInfoDto, StaticInfo>().IgnoreAllNonExisting();
            CreateMap<Menu, MenuDto>().IgnoreAllNonExisting();
            CreateMap<MenuDto, Menu>().IgnoreAllNonExisting();
            CreateMap<MenuDto, MenuAdminDto>().AfterMap((src, dest) => src.Id = dest.Key)
                .AfterMap((src, dest) => src.ParentId = dest.IsLeaf)
                .IgnoreAllNonExisting();
        }
    }
}
