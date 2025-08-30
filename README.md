## Apirest Utilizando Express + Mysql

#  Tarea – API REST con Express y MySQL  

##  Objetivo de la tarea  
El propósito de esta tarea fue **desarrollar una API REST** utilizando **Node.js, Express y MySQL**, que permita gestionar los datos de vehículos en una tienda.  
La aplicación implementa operaciones básicas de **CRUD** (Crear, Leer, Actualizar y Eliminar), además de una búsqueda personalizada por número de placa.  

---

##  Diseño de la Base de Datos  
Para almacenar la información de los vehículos se creó la base de datos **Tiendaveh**, con una tabla llamada **vehiculos** que contiene los siguientes campos:  

- **id** (clave primaria, autoincremental)  
- **marca**  
- **modelo**  
- **color**  
- **precio**  
- **placa** (única para cada vehículo)  

Script utilizado:  

```sql
CREATE DATABASE Tiendaveh;
USE Tiendaveh;

CREATE TABLE vehiculos (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  marca   VARCHAR(30) NOT NULL,
  modelo  VARCHAR(30) NOT NULL,
  color   VARCHAR(20) NOT NULL,
  precio  DECIMAL(9,2) NOT NULL,
  placa   CHAR(7) NOT NULL,
  CONSTRAINT uk_placa_veh UNIQUE (placa)
) ENGINE=InnoDB;
```

---

##  Configuración del Proyecto  

1. **Instalación de dependencias**  
   ```bash
   npm install express mysql2 dotenv nodemon
   ```

2. **Archivo `.env`** para la configuración de la conexión con la base de datos:  
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PORT=3306
   DB_PASSWORD=tu_contraseña
   DB_DATABASE=Tiendaveh
   PORT=3000
   ```

3. **Ejecución del servidor**  
   ```bash
   npx nodemon app.js
   ```
   El servidor quedará disponible en:  
    `http://localhost:3000`

---

##  Endpoints Implementados  

1. **Listar todos los vehículos**  
   ```http
   GET /vehiculos
   ```

2. **Buscar por placa (parcial o completa)**  
   ```http
   GET /vehiculos/buscar/:placa
   ```

3. **Insertar un nuevo vehículo**  
   ```http
   POST /vehiculos
   ```
   **Ejemplo de body (JSON):**  
   ```json
   {
     "marca": "Toyota",
     "modelo": "Corolla",
     "color": "Rojo",
     "precio": 25000,
     "placa": "ABC1234"
   }
   ```

4. **Actualizar vehículo existente**  
   ```http
   PUT /vehiculos/:id
   ```

5. **Eliminar vehículo**  
   ```http
   DELETE /vehiculos/:id
   ```

---

##  Pruebas realizadas  
Para validar el funcionamiento se utilizaron las herramientas **Thunder Client** y la extensión **REST Client** de VS Code.  
Se creó un archivo `vehiculos.rest` con ejemplos de cada petición:  

```http
### Obtener todos los vehículos
GET http://localhost:3000/vehiculos

### Buscar vehículo por placa
GET http://localhost:3000/vehiculos/buscar/ABC

### Insertar vehículo
POST http://localhost:3000/vehiculos
Content-Type: application/json

{
  "marca": "Ford",
  "modelo": "Fiesta",
  "color": "Azul",
  "precio": 18000.50,
  "placa": "LMN4567"
}

### Actualizar vehículo
PUT http://localhost:3000/vehiculos/1
Content-Type: application/json

{
  "marca": "Honda",
  "modelo": "Civic",
  "color": "Negro",
  "precio": 28000,
  "placa": "XYZ9876"
}

### Eliminar vehículo
DELETE http://localhost:3000/vehiculos/1
```

---

##  Conclusiones de la tarea  
- Se logró implementar una **API REST funcional** conectada a una base de datos MySQL.  
- La API cubre las operaciones básicas de un CRUD y añade una búsqueda personalizada por placa.  
- El uso de **dotenv** y **pool de conexiones MySQL** asegura buenas prácticas de programación.  
- El proyecto es **escalable y reutilizable**, pudiendo integrarse en aplicaciones web o móviles.  

En conclusión, la tarea permitió **aplicar conocimientos de backend, bases de datos y servicios REST**, obteniendo un resultado práctico y funcional.   
