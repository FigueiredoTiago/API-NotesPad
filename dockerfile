# Etapa base: usar a imagem oficial do Node.js
FROM node:latest

# Definir o diretório de trabalho no container
WORKDIR /api

# Copiar os arquivos
COPY . .

#apaga a pasta node_modules
RUN rm -rf node_modules

#instala as dependencias
RUN npm install 


# Rodar o Nodemon com ts-node para executar TypeScript diretamente
CMD ["npm", "start"]

EXPOSE 3000