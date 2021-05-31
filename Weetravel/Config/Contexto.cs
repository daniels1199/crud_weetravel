using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Weetravel.Models;

namespace Weetravel.Config
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Viajante> Viajante { get; set; }
        public DbSet<Empresa> Empresa { get; set; }
    }
}
