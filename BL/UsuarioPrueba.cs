using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class UsuarioPrueba
    {
        public static ML.Result Add(ML.UsuarioPrueba usuario)
        {
            //Se crea una instancia de Result
            ML.Result result = new ML.Result();
            //El try nos sirve para idntificar si hay un error al momento de conectarnos
            try
            {
                //Trae la cadena de coleccion de DL.Conexion guarda una conexion de SQL en context y para eso se necesita la cadena de coneccion
                using (OleDbConnection context = new OleDbConnection(DL.Conexion.GetConnectionString()))
                {
                    // Agregamos la accion que se quiere realizar en SQL es importante mantrener el orden, para esto es necesario crear un insert en BD para poder sacarlo mas fácil.
                    string query = "INSERT INTO [UsuarioPrueba]([Nombre] ,[ApellidoPaterno]) VALUES (@Nombre,@ApellidoPaterno)";

                    using (OleDbCommand cmd = new OleDbCommand())
                    {
                        cmd.Connection = context;
                        cmd.CommandText = query;
                        OleDbParameter[] collection = new OleDbParameter[2];
                        collection[0] = new OleDbParameter("Nombre", OleDbType.VarChar);
                        collection[0].Value = usuario.Nombre;
                        collection[1] = new OleDbParameter("ApellidoPaterno", OleDbType.VarChar);
                        collection[1].Value = usuario.ApellidoPaterno;
                        

                        cmd.Parameters.AddRange(collection);
                        cmd.Connection.Open();
                        int RowsAffected = cmd.ExecuteNonQuery();
                        if (RowsAffected > 0)
                        {
                            result.Correct = true;
                        }
                        else
                        {
                            result.Correct = false;
                        }
                    }


                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Ex = ex;
                result.ErrorMessage = "No se realizo la conexion a la base de datos";
            }
            return result;
        }

        public static ML.Result Delete(int idUsuario)
        {
            ML.Result result = new ML.Result();

            try
            {
                using (OleDbConnection context = new OleDbConnection(DL.Conexion.GetConnectionString()))
                {
                    string delete = "DELETE FROM UsuarioPrueba Where IdUsuario = @IdUsuario";

                    using (OleDbCommand cmd = new OleDbCommand())
                    {
                        cmd.CommandText = delete;
                        cmd.Connection = context;
                        cmd.Connection.Open();

                        OleDbParameter[] collection = new OleDbParameter[1];

                        collection[0] = new OleDbParameter("IdUsuario", OleDbType.Integer);
                        collection[0].Value = idUsuario;

                        cmd.Parameters.AddRange(collection);

                        int RowsAffects = cmd.ExecuteNonQuery();

                        if (RowsAffects > 0)
                        {
                            result.Correct = true;

                        }
                        else
                        {
                            result.Correct = false;
                            result.ErrorMessage = "Ocurrio un error borrar el registro";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Ex = ex;
            }

            return result;

        }
        public static ML.Result GetAll()
        {
            ML.Result result = new ML.Result();

            try
            {
                using (OleDbConnection context = new OleDbConnection(DL.Conexion.GetConnectionString()))
                {
                    string getAll = "SELECT [IdUsuario],[Nombre],[ApellidoPaterno] FROM UsuarioPrueba";

                    using (OleDbCommand cmd = new OleDbCommand())
                    {
                        cmd.CommandText = getAll;
                        cmd.Connection = context;
                        cmd.Connection.Open();
                        DataTable usuarioTable = new DataTable();//instnacia de mi DataTable

                        OleDbDataAdapter da = new OleDbDataAdapter(cmd);

                        da.Fill(usuarioTable);
                        result.Objects = new List<object>();

                        if (usuarioTable.Rows.Count > 0)
                        {

                            foreach (DataRow row in usuarioTable.Rows)
                            {
                                ML.UsuarioPrueba usuario = new ML.UsuarioPrueba();

                                usuario.IdUsuario = int.Parse(row[0].ToString());

                                usuario.Nombre = row[1].ToString();
                                usuario.ApellidoPaterno = row[2].ToString();




                                result.Objects.Add(usuario);
                            }

                            result.Correct = true;
                        }

                        else
                        {
                            result.Correct = false;

                        }

                    }

                }

            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.Ex = ex;

            }

            return result;
        }

    }
}
