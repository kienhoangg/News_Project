using System;
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
        }
    }
}

