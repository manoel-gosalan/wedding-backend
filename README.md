# Wedding Financial Planner

Sistema para planejamento financeiro de casamentos desenvolvido com Java, Spring Boot, PostgreSQL e JavaScript.

O objetivo do projeto é ajudar casais a organizarem o orçamento do casamento, acompanharem despesas, fornecedores, contribuições e metas financeiras, incluindo suporte para planejamento em Real (R$) e Euro (€).

## Funcionalidades

### Planejamento Financeiro

* Definição da meta financeira do casamento
* Controle do valor já guardado
* Controle do valor poupado mensalmente
* Data prevista do casamento
* Análise automática da viabilidade da meta
* Planejamento recolhível para melhor experiência de uso

### Dashboard Financeiro

* Valor total guardado
* Total gasto
* Valor restante para atingir a meta
* Progresso financeiro
* Margem mensal necessária
* Comparação entre valor necessário e valor poupado
* Exibição simultânea em EUR e BRL

### Controle de Despesas

* Cadastro de despesas
* Edição de despesas
* Exclusão de despesas
* Busca por descrição
* Filtro por categoria
* Controle de orçamento por categoria

### Gestão de Fornecedores

* Cadastro de fornecedores
* Controle de valor contratado
* Controle de valor pago
* Cálculo automático do saldo restante
* Resumo financeiro dos fornecedores
* Validações de negócio

### Contribuições

* Registro de aportes financeiros
* Soma automática das contribuições
* Integração com o dashboard financeiro

### Conversão EUR / BRL

* Cotação em tempo real através de API externa
* Exibição de valores em Euro e Real
* Atualização automática da cotação

### Relatórios

* Exportação de relatório financeiro em PDF
* Resumo financeiro consolidado
* Inclusão de despesas e fornecedores

### Visualização

* Dashboard responsivo
* Gráficos de gastos por categoria
* Interface adaptada para desktop e dispositivos móveis

## Tecnologias Utilizadas

### Backend

* Java 21
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
* iTextPDF

## Arquitetura

O projeto segue uma arquitetura em camadas:

* Controller
* Service
* Repository
* DTO
* Entity

## Deploy

Aplicação hospedada no Render.

## Como Executar

### Backend

```bash
mvn spring-boot:run
```

Servidor:

```text
http://localhost:8080
```

### Banco de Dados

Configure um banco PostgreSQL e ajuste o arquivo:

```text
application.properties
```

com suas credenciais locais.

## Objetivo do Projeto

Este projeto nasceu para resolver um problema real: organizar financeiramente um casamento quando a renda principal está em Euro (€) e as despesas acontecem em Real (R$).

Além da aplicação prática, o projeto faz parte da minha jornada de aprendizado em desenvolvimento de software utilizando Java, Spring Boot, PostgreSQL e desenvolvimento web.

# Screenshots

(screenshots/Captura de tela de 2026-06-12 02-03-27.png)
(screenshots/Captura de tela de 2026-06-12 02-03-36.png)
(screenshots/Captura de tela de 2026-06-12 02-03-42.png)
(screenshots/imagempc.png)


(screenshots/vendors.png)



(screenshots/expenses.png)


(screenshots/mobile.png)
