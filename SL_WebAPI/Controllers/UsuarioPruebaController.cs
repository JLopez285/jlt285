using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SL_WebAPI.Controllers
{
    //capa de servicio realiza la comunicación entre programas
    public class UsuarioController : ApiController
    {
        // GET: api/Usuario
        [HttpGet]
        [Route("usuario/GetAll")]
        public IHttpActionResult GetAll()
        {
            ML.Result result = BL.UsuarioPrueba.GetAll();
            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpPost]
        [Route("usuario/Add")]
        public IHttpActionResult Add([FromBody] ML.UsuarioPrueba usuario)
        {
            ML.UsuarioPrueba resultUser = new ML.UsuarioPrueba();
            resultUser.Usuarios = new List<object>();
            ML.Result result = new ML.Result();
            result = BL.UsuarioPrueba.Add(usuario);
            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpGet]
        [Route("usuario/Delete/{id}")]
        public IHttpActionResult Delete(int id)
        {
            ML.Result result = BL.UsuarioPrueba.Delete(id);
            if (result.Correct)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

    }
}
