## Apirest Utilizando Express + Mysql

No olvide construir la tabla
``` sql
Create database Tiendaveh;
use Tiendaveh;

create table vehiculos 
(
id      int auto_increment primary key,
marca   varchar(30) not null,
modelo  varchar(30) not null,
color   varchar(20) not null,
precio  decimal(9,2) not null,
placa   char(7)		not null,
constraint uk_placa_veh unique (placa)
)engine = InnoDB;
```
Modulos requeridos:
```
npm install express mysql2 dotenv nodemon --  node app.js
```


