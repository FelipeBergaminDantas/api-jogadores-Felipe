# ⚽ API REST de Jogadores de Futebol - Spring Boot + Next.js

## 📋 Descrição do Projeto

Esta é uma aplicação full-stack completa para gerenciar um catálogo de jogadores de futebol. O projeto consiste em uma API REST desenvolvida em Spring Boot (backend) e uma interface web moderna desenvolvida em Next.js (frontend), permitindo operações CRUD (Create, Read, Update, Delete) completas com carregamento inicial de dados de um arquivo JSON.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 4.0.0-RC1**
- **Spring Web**
- **Jackson** (para manipulação de JSON)
- **Maven** (gerenciamento de dependências)

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios** (requisições HTTP)

## 🏗️ Arquitetura do Projeto

```
project-spring/
├── src/main/java/br/com/fecaf/
│   ├── App.java                    # Classe principal Spring Boot
│   ├── model/
│   │   └── Jogador.java           # Entidade Jogador
│   └── controller/
│       └── JogadorController.java # Controller REST
├── src/main/resources/
│   └── jogadores.json             # Dados iniciais
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Layout principal
│   │   │   ├── page.tsx           # Página principal
│   │   │   └── globals.css        # Estilos globais
│   │   ├── components/
│   │   │   ├── JogadorCard.tsx    # Card de jogador
│   │   │   └── JogadorForm.tsx    # Formulário de jogador
│   │   ├── services/
│   │   │   └── api.ts             # Serviço de API
│   │   └── types/
│   │       └── jogador.ts         # Tipos TypeScript
│   ├── package.json
│   └── tsconfig.json
└── pom.xml
```

## 📡 Endpoints da API

### Backend (Spring Boot)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/jogadores/Felipe` | Lista todos os jogadores |
| GET | `/api/jogadores/Felipe/{id}` | Busca jogador por ID |
| POST | `/api/jogadores/Felipe` | Adiciona novo jogador |
| PUT | `/api/jogadores/Felipe/{id}` | Atualiza jogador existente |
| DELETE | `/api/jogadores/Felipe/{id}` | Remove jogador |

### Exemplos de Requisições

#### Listar todos os jogadores
```bash
curl -X GET http://localhost:8080/api/jogadores/Felipe
```

#### Buscar jogador por ID
```bash
curl -X GET http://localhost:8080/api/jogadores/Felipe/1
```

#### Adicionar novo jogador
```bash
curl -X POST http://localhost:8080/api/jogadores/Felipe \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Neymar Jr",
    "posicao": "Atacante",
    "idade": 31,
    "altura": 1.75,
    "peso": 68.0,
    "nacionalidade": "Brasil",
    "clube": "Al Hilal",
    "salario": 100000000.0,
    "numeroCamisa": 10,
    "golsMarcados": 400,
    "status": "Ativo"
  }'
```

#### Atualizar jogador
```bash
curl -X PUT http://localhost:8080/api/jogadores/Felipe/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Lionel Messi",
    "posicao": "Atacante",
    "idade": 37,
    "altura": 1.70,
    "peso": 72.0,
    "nacionalidade": "Argentina",
    "clube": "Inter Miami",
    "salario": 55000000.0,
    "numeroCamisa": 10,
    "golsMarcados": 820,
    "status": "Ativo"
  }'
```

#### Deletar jogador
```bash
curl -X DELETE http://localhost:8080/api/jogadores/Felipe/1
```

## 🏃‍♂️ Como Executar

### Pré-requisitos

- **Java 21** ou superior
- **Maven** 3.6+
- **Node.js** 18+ (para o frontend)
- **npm** ou **yarn**

### Executando o Backend

1. Clone o repositório
2. Navegue até a pasta raiz do projeto
3. Execute o comando:

```bash
mvn spring-boot:run
```

Ou execute a classe `App.java` na sua IDE (IntelliJ IDEA, Eclipse, VS Code)

4. A API estará disponível em: `http://localhost:8080`

### Executando o Frontend

1. Navegue até a pasta `frontend`:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação em: `http://localhost:3000`


## 🎨 Funcionalidades do Frontend

- ✅ **Listagem de Jogadores**: Visualize todos os jogadores em cards modernos e responsivos
- ✅ **Adicionar Jogador**: Formulário completo para cadastrar novos jogadores
- ✅ **Editar Jogador**: Atualize informações de jogadores existentes
- ✅ **Deletar Jogador**: Remova jogadores com confirmação
- ✅ **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Feedback Visual**: Mensagens de sucesso e erro para todas as operações
- ✅ **Loading States**: Indicadores de carregamento durante requisições

## 🧪 Testando a API

### Usando o Frontend
Acesse `http://localhost:3000` e utilize a interface gráfica para testar todas as operações.

### Usando Postman ou Insomnia
Importe a coleção de endpoints e teste cada operação CRUD.


## 📝 Observações Importantes

- ⚠️ A API utiliza **armazenamento em memória** (dados são perdidos ao reiniciar o servidor)
- ✅ **CORS está habilitado** para permitir requisições do frontend
- ✅ Os dados iniciais são **carregados automaticamente** do arquivo JSON
- ✅ Implementa **todas as operações CRUD** (Create, Read, Update, Delete)
- ✅ Frontend e backend são **completamente independentes** e se comunicam via API REST


## 👨‍💻 Autor

**Felipe Bergamin Dantas**  

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**⚽ Desenvolvido com Spring Boot + Next.js | 2024**
