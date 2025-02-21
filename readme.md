# NotesPad 📝

![NotesPad](https://via.placeholder.com/800x400?text=NotesPad+Banner)

## 📌 Sobre o projeto

O **NotesPad** é um aplicativo web de bloco de notas completo, desenvolvido com **React, Node.js, TypeScript, PostgreSQL, Docker e Prisma**. Ele permite que os usuários criem, editem, organizem e excluam notas de forma simples e intuitiva.

## 🚀 Funcionalidades

- Criar, editar e excluir notas
- Organização por categorias
- Pesquisa e filtro de notas
- Interface intuitiva e responsiva
- Sincronização de dados com o banco de dados PostgreSQL

## 🛠 Tecnologias Utilizadas

- **Backend:** Node.js, Express, Prisma, TypeScript
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker
- **Auth de Usuarios:** JWT, Bcrypt

## 📥 Como Usar

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/FigueiredoTiago/API-NotesPad.git
```

### 2️⃣ Configuração do Backend

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o Prisma:
   ```bash
   npx prisma init
   ```
   Isso criará o diretório `prisma/` e o arquivo `.env`.
3. Configure o banco de dados PostgreSQL no arquivo **.env** criado pelo Prisma.
4. Crie as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```
6. Inicie o servidor:
   ```bash
   npm run dev
   ```

### 3️⃣ Acesse a aplicação

Abra o navegador e acesse:

```
http://localhost:3000
```

## 🐳 Executando com Docker

1. **Construa a imagem do Docker:**  
   No diretório raiz do projeto, execute:

   ```bash
   docker build -t notespad .
   ```

2. **Execute o container:**

   ```bash
   docker run -d -p 3000:3000 --env-file .env --name notespad notespad
   ```

   - `-d`: Executa o container em segundo plano.
   - `-p 3000:3000`: Mapeia a porta do container para a máquina local.
   - `--env-file .env`: Carrega as variáveis de ambiente do arquivo `.env`.
   - `--name notespad`: Define o nome do container.

3. **Verifique se o container está rodando:**

   ```bash
   docker ps
   ```

4. **Parar o container:**

   ```bash
   docker stop notespad
   ```

5. **Remover o container (caso necessário):**
   ```bash
   docker rm notespad
   ```

Agora, sua aplicação estará rodando dentro de um container Docker! 🚀🐳

```

## 📷 Screenshot

Adicione aqui uma captura de tela do aplicativo quando estiver pronto.

## 🏗️ Contribuição

Sinta-se à vontade para contribuir com melhorias! Basta abrir uma _issue_ ou um _pull request_.

## 📜 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo conforme necessário.

---

Made with ❤️ by Tiago Figueiredo
```
