# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de configuração do projeto
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Instale as dependências
RUN npm install

# Gere o Prisma Client
RUN npx prisma generate

# Copie o código fonte
COPY src ./src

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que sua API usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]