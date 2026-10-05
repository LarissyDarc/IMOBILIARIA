# Morada · Imobiliária
Landing page responsiva em React e Vite, criada para apresentação acadêmica.

## Executar
Requisito: Node.js 22.
```bash
npm install
npm run dev
```
Abra o endereço indicado no terminal. Para conferir a versão de produção:
```bash
npm run build
npm run preview
```

## Funcionalidades
- Busca por finalidade (comprar/alugar), bairro, tipo e preço máximo.
- Filtros de casas, apartamentos e favoritos.
- Detalhes de imóveis em janela modal, com fechamento por Escape.
- Botão de interesse que preenche a mensagem no formulário.
- Formulário demonstrativo com validação nativa.
- Menu para celular, links internos, foco visível e suporte a movimento reduzido.
- Layout adaptado para celular, tablet e desktop.

Os favoritos existem apenas durante a sessão da página. Não há backend; o formulário não envia nem armazena dados. A marca, os imóveis e os preços são fictícios. Fotografias ilustrativas remotas do Unsplash; fontes do Google Fonts, com fontes locais de fallback.

## Publicar no GitHub Pages
1. Crie um repositório público no GitHub.
2. Na pasta do projeto, execute (substitua USUARIO e REPOSITORIO):
```bash
git init
git add .
git commit -m "Cria landing page Morada em React"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```
3. No repositório, entre em **Settings → Pages → Build and deployment → Source** e selecione **GitHub Actions**.
4. Na aba **Actions**, execute o fluxo **Publicar no GitHub Pages**, se necessário.
5. Aguarde o sucesso do fluxo e abra o endereço exibido em Pages.

A configuração `base: './'` permite hospedar também em subpastas de repositórios. O workflow compila e publica o diretório dist.
Referência: https://vite.dev/guide/static-deploy#github-pages

## Estrutura
- src/main.jsx: componentes React, catálogo e interações.
- src/styles.css: identidade visual e media queries.
- public/favicon.svg: ícone local.
- .github/workflows/deploy.yml: publicação automatizada.
- APRESENTACAO.md: roteiro para apresentação.
