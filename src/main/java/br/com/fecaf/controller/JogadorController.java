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
