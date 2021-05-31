using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Weetravel.Models
{
    [Table("Empresa")]
    public class Empresa
    {
        [Column("Id")]
        public int Id { get; set; }
        
        [Column("Nome")]
        public string Nome { get; set; }
        
        [Column("Descricao")]
        public string Descricao { get; set; }

        [Column("Endereco")]
        public string Endereco { get; set; }

    }
}
