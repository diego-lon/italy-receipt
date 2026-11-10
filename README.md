# ItalyReceipt

Generatore di ricevute per prestazioni occasionali, realizzato con Next.js e
pubblicato come sito statico su GitHub Pages.

## Sviluppo

Usare Node.js 24 (vedi `.nvmrc`) e la versione di pnpm indicata in `package.json`.
Eseguire i comandi dalla radice del repository:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm test
pnpm build
```

La build genera il sito completo in `out/`.

## Pubblicazione su GitHub Pages

1. In **Settings → Pages → Build and deployment → Source**, selezionare
   **GitHub Actions**, non **Deploy from a branch**. Il build automatico con
   Jekyll non compila Next.js.
2. Nella stessa pagina impostare **Custom domain** su `italyreceipt.com` e
   abilitare **Enforce HTTPS** quando disponibile.
3. Pubblicare le modifiche su `main`. Il workflow
   [Deploy Next.js to GitHub Pages](.github/workflows/deploy.yml) esegue
   `pnpm build` e pubblica **solo `out/`**. Si può anche avviarlo manualmente
   dalla scheda **Actions**.
4. Verificare che il workflow termini correttamente e che
   <https://italyreceipt.com/> risponda senza errori.

Il file [public/CNAME](public/CNAME) viene copiato in `out/CNAME` dalla build.
Il [CNAME nella radice](CNAME) conserva l'associazione del dominio per il deploy
legacy da branch durante la migrazione: mantenere identici i due file.
Non pubblicare direttamente la radice del repository come nuovo sito Next.js.
