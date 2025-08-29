require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const handDbError = (res, error) => {
console.error('Error de acceso a la base de datos:', error);
res.status(500).json({ error: 'Error Interno del Servidor' });
}


app.get('/vehiculos', async (req, res) => {
  try{
    const [rows] =  await pool.query('SELECT * FROM vehiculos');
    res.status(200).json(rows);
  }catch(error){
    handDbError(res, error);
  }
});

app.post('/vehiculos', async (req, res) => {

    const {marca, modelo, color, precio, placa}  = req.body;

    if(!marca || !modelo || !color || !precio || !placa) {
        return res.status(400).json({error: 'Faltan ingresar datos'});
    }

  try {
    const [result] = await pool.query(
      'INSERT INTO vehiculos (marca, modelo, color, precio, placa) VALUES (?,?,?,?,?)',
      [marca, modelo, color, precio, placa] 
    );
    //Obtener el PK generado
    const id = result.insertId
    res.status(200).json({ 'id': id });
  } catch (error) {
  if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'La placa ya está en uso' });
    }
    handDbError(res, error);
  }
});

app.put("/vehiculos/:id", async (req, res) => {
    const { id } = req.params;
    const {marca, modelo, color, precio, placa}  = req.body;

    if(!marca || !modelo || !color || !precio || !placa) {
        return res.status(400).json({error: "todos los campos son obligatorios"});
    }

    try {
    const [result] = await pool.query(
      "UPDATE vehiculos SET marca = ?, modelo = ?, color = ?, precio = ?, placa = ? WHERE id = ?",
      [marca, modelo, color, precio, placa, id]
    );

      if (result.affectedRows === 0){
      return res.status(404).json({success: false, message: 'Vehículo no existe' });
      }

      res.status(200).json({success: true, message: "Vehículo actualizado con éxito" });

    //Obtener el PK generado
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'La placa ya existe' });
      }
    handDbError(res, error);
  }
});

app.delete('/vehiculos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM vehiculos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Vehículo no existe imposible eliminar" });
    }

    res.status(200).json({ success: true, message: "Vehículo eliminado con éxito" });
  } catch (error) {
    handDbError(res, error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});