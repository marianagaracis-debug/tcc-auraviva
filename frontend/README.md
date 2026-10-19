# React + Vite

## Conexão com a API AuraViva

Instale as dependências e crie a configuração local a partir do exemplo:

```bash
npm install
cp .env.example .env
npm run dev -- --host 0.0.0.0
```

No PowerShell, use `Copy-Item .env.example .env` no lugar do comando `cp`.

Por padrão, a aplicação chama `http://localhost:8080`. Para usar outra instalação,
defina `VITE_API_URL` no arquivo `.env` antes de iniciar ou compilar o frontend:

```env
VITE_API_URL=https://api.seudominio.com
```

O backend precisa estar ativo, conectado ao SQL Server e com a origem exata do site
(esquema e host, sem barra final) em `CORS_ORIGINS`. Reinicie o Vite depois de mudar
`VITE_API_URL`, pois os valores `VITE_*` são incluídos durante o build. As chamadas
usam cookies de sessão; para domínios diferentes em HTTPS, configure também
`SESSION_SAMESITE=None` e `SESSION_SECURE=true` no backend.

Para publicar, compile com `npm run build` e hospede o conteúdo de `dist/`. Configure
`VITE_API_URL` para a URL pública da API durante o build.

Catálogo, artigos, cadastro/login, recuperação de senha, checkout, pedidos, lista de desejos,
endereços, contato e newsletter usam os endpoints da API.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
