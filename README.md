# Ejecutar en Dev

1. Clonar el repositorio
2. Instalar dependencias `yarn install`
3. Clonar `env.template` y renombrar a `.env` y completar las variables de entorno en .env
4. Levantar la base de datos `docker compose up -d`
5. Generar el Prisma client `yarn prisma generate`
6. Ejecutar proyecto `yarn run start:dev`