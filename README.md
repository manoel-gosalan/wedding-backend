#  Wedding Financial Planner

Sistema para planejamento financeiro de casamentos, desenvolvido com Java, Spring Boot, PostgreSQL e JavaScript.

O objetivo é ajudar casais a organizarem o orçamento do casamento, acompanharem despesas, monitorarem metas financeiras e planejarem aportes ao longo do tempo.

---

##  Funcionalidades

### Planejamento Financeiro

* Definição da meta financeira do casamento
* Controle do valor já guardado
* Controle do valor poupado mensalmente
* Data prevista do casamento
* Análise automática da viabilidade da meta

### Controle de Despesas

* Cadastro de despesas
* Edição de despesas
* Exclusão de despesas
* Filtro por categoria
* Busca por descrição

### Dashboard Financeiro

* Valor total gasto
* Valor restante para atingir a meta
* Progresso do orçamento
* Margem mensal necessária
* Comparação entre valor necessário e valor poupado

### Conversão EUR → BRL

Pensado especialmente para casais que:

* Recebem em Euro (€)
* Pagam fornecedores em Real (R$)

O sistema realiza os cálculos considerando ambas as moedas.

### Visualização

* Gráfico de gastos por categoria
* Controle de orçamento por categoria
* Dashboard responsivo

### Relatórios

* Exportação de resumo financeiro em PDF

---

##  Tecnologias Utilizadas

### Backend

* Java
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Maven

### Frontend

* HTML5
* CSS3
* JavaScript

### Bibliotecas

* Chart.js

---

##  Screenshots

Em breve serão adicionadas imagens do sistema.

---

##  Próximas Funcionalidades

* Histórico de aportes
* Cotação EUR/BRL em tempo real
* Melhorias de UX e responsividade
* Dashboard financeiro avançado
* Relatórios PDF aprimorados

---

##  Como executar

### Backend

```bash
mvn spring-boot:run
```

Servidor:

```text
http://localhost:8080
```

### Banco de Dados

Configurar PostgreSQL e ajustar:

```properties
application.properties
```

com suas credenciais locais.

---

## Objetivo do Projeto

Este projeto nasceu para resolver um problema real:

Casais que recebem em Euro (€), mas precisam organizar e pagar um casamento em Real (R$).

Além de servir como ferramenta de planejamento financeiro, o projeto também faz parte da minha jornada de aprendizado em desenvolvimento de software utilizando Java e Spring Boot.
