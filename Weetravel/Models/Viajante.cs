using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Weetravel.Models
{
    [Table("Viajante")]
    public class Viajante
    {
        [Column("Id")]
        public int Id { get; set; }
       
        [Column("Nome")]
        public string Nome { get; set; }
       
        [Column("DataNasc")]
        public DateTime DataNasc { get; set; }

        [Column("Ativo")]
        public string Ativo { get; set; }

        [Column("Empresa")]
        public string Empresa { get; set; }
    }
}
