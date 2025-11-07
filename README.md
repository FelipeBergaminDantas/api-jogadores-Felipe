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

## 🚀 Step-by-Step para Construir a API

### Passo 1: Configuração do Projeto Maven

1. Crie um novo projeto Maven
2. Configure o `pom.xml` com as dependências do Spring Boot:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>Project-Spring</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>4.0.0-RC1</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>4.0.0-RC1</version>
        </dependency>
    </dependencies>
</project>
```

### Passo 2: Criar a Classe Principal (App.java)

```java
package br.com.fecaf;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    CommandLineRunner initialization () {
        return args -> {
            System.out.println("Server no Ar !!");
        };
    }
}
```

### Passo 3: Criar o Model (Jogador.java)

```java
package br.com.fecaf.model;

public class Jogador {
    private int id;
    private int idade;
    private int numeroCamisa;
    private int golsMarcados;
    private String nome;
    private String posicao;
    private String nacionalidade;
    private String clube;
    private String status;
    private double altura;
    private double peso;
    private double salario;

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public int getIdade() { return idade; }
    public void setIdade(int idade) { this.idade = idade; }
    
    public int getNumeroCamisa() { return numeroCamisa; }
    public void setNumeroCamisa(int numeroCamisa) { this.numeroCamisa = numeroCamisa; }
    
    public int getGolsMarcados() { return golsMarcados; }
    public void setGolsMarcados(int golsMarcados) { this.golsMarcados = golsMarcados; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getPosicao() { return posicao; }
    public void setPosicao(String posicao) { this.posicao = posicao; }
    
    public String getNacionalidade() { return nacionalidade; }
    public void setNacionalidade(String nacionalidade) { this.nacionalidade = nacionalidade; }
    
    public String getClube() { return clube; }
    public void setClube(String clube) { this.clube = clube; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public double getAltura() { return altura; }
    public void setAltura(double altura) { this.altura = altura; }
    
    public double getPeso() { return peso; }
    public void setPeso(double peso) { this.peso = peso; }
    
    public double getSalario() { return salario; }
    public void setSalario(double salario) { this.salario = salario; }

    @Override
    public String toString() {
        return "Jogador{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", posicao='" + posicao + '\'' +
                ", idade=" + idade +
                ", altura=" + altura +
                ", peso=" + peso +
                ", nacionalidade='" + nacionalidade + '\'' +
                ", clube='" + clube + '\'' +
                ", salario=" + salario +
                ", numeroCamisa=" + numeroCamisa +
                ", golsMarcados=" + golsMarcados +
                ", status='" + status + '\'' +
                '}';
    }
}
```

### Passo 4: Criar o Controller (JogadorController.java)

```java
package br.com.fecaf.controller;

import br.com.fecaf.model.Jogador;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jogadores/Felipe")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JogadorController {

    private List<Jogador> jogadores = new ArrayList<>();

    // 🔹 Carrega o JSON automaticamente ao iniciar a aplicação
    @PostConstruct
    public void carregarJson() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/jogadores.json");

            jogadores = objectMapper.readValue(inputStream, new TypeReference<List<Jogador>>() {});
            System.out.println("✅ JSON de jogadores carregado com sucesso: " + jogadores.size() + " jogadores.");
        } catch (Exception e) {
            System.err.println("❌ Erro ao carregar o JSON de jogadores: " + e.getMessage());
        }
    }

    // ✅ GET - lista todos os jogadores
    @GetMapping
    public List<Jogador> listarJogadores() {
        return jogadores;
    }

    // ✅ GET - busca um jogador pelo ID
    @GetMapping("/{id}")
    public Jogador buscarPorId(@PathVariable int id) {
        Optional<Jogador> jogador = jogadores.stream()
                .filter(j -> j.getId() == id)
                .findFirst();
        return jogador.orElse(null);
    }

    // ✅ POST - adiciona um novo jogador
    @PostMapping
    public String adicionarJogador(@RequestBody Jogador novoJogador) {
        novoJogador.setId(jogadores.size() + 1);
        jogadores.add(novoJogador);
        return "✅ Jogador adicionado com sucesso!";
    }

    // ✅ PUT - atualiza um jogador existente
    @PutMapping("/{id}")
    public String atualizarJogador(@PathVariable int id, @RequestBody Jogador jogadorAtualizado) {
        for (int i = 0; i < jogadores.size(); i++) {
            if (jogadores.get(i).getId() == id) {
                jogadorAtualizado.setId(id);
                jogadores.set(i, jogadorAtualizado);
                return "♻️ Jogador atualizado com sucesso!";
            }
        }
        return "❌ Jogador com ID " + id + " não encontrado.";
    }

    // ✅ DELETE - remove um jogador pelo ID
    @DeleteMapping("/{id}")
    public String deletarJogador(@PathVariable int id) {
        boolean removido = jogadores.removeIf(j -> j.getId() == id);
        if (removido) {
            return "🗑️ Jogador removido com sucesso!";
        }
        return "❌ Jogador com ID " + id + " não encontrado.";
    }
}
```

### Passo 5: Criar o Arquivo de Dados JSON

Crie o arquivo `src/main/resources/jogadores.json` com pelo menos 10 jogadores:

```json
[
  {
    "id": 1,
    "nome": "Lionel Messi",
    "posicao": "Atacante",
    "idade": 36,
    "altura": 1.70,
    "peso": 72.0,
    "nacionalidade": "Argentina",
    "clube": "Inter Miami",
    "salario": 50000000.0,
    "numeroCamisa": 10,
    "golsMarcados": 800,
    "status": "Ativo"
  },
  {
    "id": 2,
    "nome": "Cristiano Ronaldo",
    "posicao": "Atacante",
    "idade": 39,
    "altura": 1.87,
    "peso": 84.0,
    "nacionalidade": "Portugal",
    "clube": "Al Nassr",
    "salario": 200000000.0,
    "numeroCamisa": 7,
    "golsMarcados": 850,
    "status": "Ativo"
  }
]
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

### Usando os Scripts (Windows)

**Para instalar o frontend:**
- Clique duas vezes em `frontend/install.bat`

**Para iniciar o frontend:**
- Clique duas vezes em `frontend/start.bat`

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

### Usando curl (linha de comando)
Utilize os exemplos de requisições fornecidos na seção "Exemplos de Requisições".

## 📝 Observações Importantes

- ⚠️ A API utiliza **armazenamento em memória** (dados são perdidos ao reiniciar o servidor)
- ✅ **CORS está habilitado** para permitir requisições do frontend
- ✅ Os dados iniciais são **carregados automaticamente** do arquivo JSON
- ✅ Implementa **todas as operações CRUD** (Create, Read, Update, Delete)
- ✅ Frontend e backend são **completamente independentes** e se comunicam via API REST

## 🎯 Estrutura de Dados - Jogador

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | int | Identificador único do jogador |
| nome | String | Nome completo do jogador |
| posicao | String | Posição em campo (Atacante, Meio-campo, Zagueiro, Goleiro) |
| idade | int | Idade do jogador |
| altura | double | Altura em metros |
| peso | double | Peso em quilogramas |
| nacionalidade | String | País de origem |
| clube | String | Clube atual |
| salario | double | Salário anual |
| numeroCamisa | int | Número da camisa |
| golsMarcados | int | Total de gols na carreira |
| status | String | Status atual (Ativo, Lesionado, Suspenso, Inativo) |

## 🚀 Melhorias Futuras

- [ ] Integração com banco de dados (PostgreSQL, MySQL)
- [ ] Autenticação e autorização (JWT)
- [ ] Paginação de resultados
- [ ] Filtros e busca avançada
- [ ] Upload de fotos dos jogadores
- [ ] Estatísticas e gráficos
- [ ] Exportação de dados (PDF, Excel)
- [ ] Testes unitários e de integração

## 👨‍💻 Autor

**Felipe**  
Projeto desenvolvido para a disciplina de Desenvolvimento de APIs  
**Professor:** Vitor Jesus  
**Instituição:** FECAF

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**⚽ Desenvolvido com Spring Boot + Next.js | 2024**
