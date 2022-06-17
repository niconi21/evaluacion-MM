# **Evaluacion - Medio Melón**

## **Descripción**

Este proyecto tiene como finalidad la demostración de mis capacidades en el área del desarrollo de servicios rest hasta la fecha de hoy, jueves 16 de junio del 2022, para la evaluación e ingreso de residencia en la empresa Medio Melón.

---

---

## **Endpoints**

| Endpoint                   | Descripción                                  | Resultado                                      |
| -------------------------- | -------------------------------------------- | ---------------------------------------------- |
| POST /user                 | Registro de un usuario                       | Id del usuario                                 |
| POST /post                 | Registro de una publicación de un usuario    | Id de la publicación                           |
| POST /post/:id/comment     | Registro de un comentario de una publicación | Id del comentario                              |
| GET /posts                 | Obtener publicaciónes con una paginación     | Arreglo de publicaciónes                       |
| GET /post/:id/comments     | Obtener los comentarios de una publicación   | Arreglo de comentarios                         |
| GET /author/:id/activities | Obtener las acciónes del usuario             | Arreglo de actividades con datos de paginación |

### **POST /user**

- request
  ```json
  {
    "body": {
      "email": "string"
    }
  }
  ```
- response
  ```json
  {
    "body": {
      "id": "number" //id del usuario
    }
  }
  ```

### **POST /post**

- request
  ```json
  {
    "body": {
      "authorId": "number>", //id del autor ó usuario
      "title": "string>",
      "content": "string"
    }
  }
  ```
- response
  ```json
  {
    "body": {
      "id": "number" //id de la publicación
    }
  }
  ```

### **POST /post/:id/comment**

- request
  ```json
  {
    "params": {
      "id": "number" //id de la publicación
    },
    "body": {
      "email": "string"
    }
  }
  ```
- response
  ```json
  {
    "body": {
      "id": "number" //id del comentario
    }
  }
  ```

### **GET /posts**

- request
  ```json
  {
    "query": {
      "page": "number <default 1>", //página que deseas ver de la paginación completa
      "width": "number <default 5>", //tamaño de cada una de las páginas
      "authorId": "number <opcional>" //id del usuario o autor
      // En caso de que no se envie el authorId, se mostrará las publicaciónes de los usuarios en general
    }
  }
  ```
- response
  ```json
  {
    "body": {
      "pages": "number", //Cantidad de páginas totales que existen
      "page": "number", //Página actual
      "width": "number", //tamaño por cada página
      "items": [
        //publicaciónes
        {
          "id": "number",
          "title": "string",
          "content": "string",
          "createdAt": "string", //Se encuentra en formato iso 8601
          "author": {
            "id": "number",
            "email": "string"
          }
        }
      ]
    }
  }
  ```

### **GET /post/:id/comments**

- request
  ```json
  {
    "params": {
      "id": "number" //id de la publcación
    }
  }
  ```
- response
  ```json
  {
    "body": [
      {
        "id": " number",
        "content": " string",
        "createdAt": " string", //Se encuentra en formato iso 8601
        "author": {
          "id": "number",
          "email": "string"
        }
      }
    ]
  }
  ```

### **GET /author/:id/activities**

- request
  ```json
  {
    "params": {
      "id": "number" //id del usuario o autor
    }
  }
  ```
- response
  ```json
  {
    "body": [
      {
        "id": "number",
        "type": "post | comment", // enum con opciones "post" o "comment"
        "title": "string", // Solo para publicaciónes
        "content": "string",
        "createdAt": "string" //Se encuentra en formato iso 8601
      }
    ]
  }
  ```

---

---

## **Tecnologías**

- ### Nodejs
- ### Express
- ### sequelize
- ### Mysql
- ### Cors
- ### Digital Ocean
- ### Nginx
- ### Let's encrypt

---

---

## **Producción**

### La aplicación se encuentra alojada en este hosting para prueba y desmostración [nmoreno-evaluacion.ga](https://nmoreno-evaluacion.ga "API de demostración")

---

### Variables de entorno

| Variable de entorno | Descripción                              | Default                                     |
| ------------------- | ---------------------------------------- | ------------------------------------------- |
| PORT                | Puerto donde se desplegará la aplicación | 3000                                        |
| HOST_DB             | Host de la base de datos                 | localhost                                   |
| USERNAME_DB         | Usuario de la base de datos              | root                                        |
| PASSWORD_DB         | Contraseña de la base de datos           | nodeisjs                                    |
| DATABASE_DB         | Nombre de la base de datos               | nmorneodb                                   |
| PATH_SSL            | Ruta del certificado ssl de tu servidor  | /etc/letsencrypt/live/nmoreno-evaluacion.ga |
| ENVIROMENT          | Entorno donde se ejecuta el servicio     | dev                                   |

#### **Nota**: Para desarrollo se pueden modificar los valores por defecto de las variables en [app.enviroment.ts](./src/configs/app.enviroment.ts "Archivo de configuración de las variable de entorno")
