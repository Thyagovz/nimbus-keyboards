# Nimbus Keyboards

Uma experiência interativa de alta performance desenvolvida para a visualização e customização de teclados mecânicos entusiastas. Este projeto foca em fidelidade visual, animações fluidas e uma arquitetura moderna baseada em tecnologias de ponta no ecossistema WebGL.

### Visão Geral

O projeto é uma vitrine digital que utiliza renderização 3D em tempo real para apresentar produtos com alto nível de detalhamento. A aplicação foi construída visando uma experiência de usuário imersiva, combinando design minimalista com interações complexas baseadas em scroll e simulações físicas de componentes.

---

### Stack Tecnológica

A seleção de tecnologias foi guiada pela necessidade de alta performance de renderização e manutenibilidade em um ambiente de desenvolvimento criativo.

*   **Next.js 16.2.6 (App Router & Turbopack)**: Framework base utilizado para garantir roteamento eficiente e tempos de compilação extremamente reduzidos durante o desenvolvimento com Turbopack.
*   **React Three Fiber & Three.js**: Core de renderização 3D. Permite uma integração declarativa do Three.js no ecossistema React, facilitando a gestão de cenas complexas.
*   **GSAP (GreenSock Animation Platform)**: Motor principal de animação. Utilizado para orquestrar sequências complexas de scroll (ScrollTrigger) e manipulação de propriedades 3D com alta precisão.
*   **Prismic CMS**: Sistema de gerenciamento de conteúdo headless, permitindo a edição dinâmica de seções (slices) e dados do produto sem necessidade de novos deploys.
*   **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva das camadas de interface (UI) sobrepostas à cena 3D.
*   **TypeScript**: Garantia de tipagem estática em toda a aplicação, fundamental para lidar com as complexas estruturas de nós de modelos 3D e estados de animação.

---

### Engenharia de Assets: Resolução de Problemas

Um dos desafios técnicos críticos enfrentados foi o **Asset Serving de binários 3D** sob o novo pipeline do Next.js 16 com Turbopack.

#### O Problema
Originalmente, o projeto utilizava o formato `.gltf` com arquivos `.bin` externos. Devido à forma como o Turbopack gerencia o roteamento de arquivos estáticos na pasta `public`, ocorriam falhas de resolução de caminhos relativos e interrupções na cadeia de carregamento de buffers binários, resultando no erro `THREE.GLTFLoader: Failed to load buffer`.

#### A Solução
A arquitetura de assets foi migrada para o formato **GLB (Binary GLTF)** autossuficiente. Esta decisão eliminou a dependência de requests múltiplos para buffers externos e garantiu a integridade dos dados. Complementarmente, foi implementada a **Compressão Draco** via CDN da Google para reduzir o payload de geometria pesada, otimizando o First Contentful Paint (FCP) da cena 3D.

---

### Funcionalidades Principais

*   **Interações em Tempo Real**: Simulação física de pressionamento de teclas com feedback visual e sonoro sincronizado.
*   **Animações Baseadas em Scroll**: Orquestração de câmera e decomposição (explode view) do teclado conforme a navegação do usuário.
*   **Vídeo como Textura**: Implementação de shaders personalizados para renderizar conteúdo de vídeo dinâmico nas telas integradas aos modelos 3D.
*   **Gerenciamento de Estado**: Controle centralizado de customização (troca de texturas de keycaps e cores de switches) com reatividade imediata.
*   **Performance Otimizada**: Uso intensivo de `instancedMesh` para switches e preloading de assets críticos para evitar estados de "pop-in".

---

### Instalação e Execução

Certifique-se de ter o Node.js instalado em seu ambiente, e verifique o .env.example para o stripe.

```bash
# Instalar dependências
npm install

# Iniciar ambiente de desenvolvimento (Turbopack)
npm run dev

# Gerar build de produção
npm run build
```

---

### Observações

Este projeto representa uma exploração técnica de *Creative Development* moderno, unindo engenharia de software rigorosa com design de experiência imersiva.

