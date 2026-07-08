import type { BlogPost } from "@/lib/seo";

const guides: Record<string, BlogPost> = {
  "what-is-heic": {
    slug: "what-is-heic",
    title: "O que é um arquivo HEIC? Formato e extensão .heic explicados | OpenMyHEIC",
    description: "O que é um arquivo HEIC? Entenda o formato, a extensão .heic, HEIF vs HEIC, por que suas fotos estão em HEIC e como abrir ou converter em qualquer aparelho.",
    h1: "O que é um arquivo HEIC? O guia completo do formato de imagem da Apple",
    content: `## O que é um arquivo HEIC?

HEIC é a sigla de **High Efficiency Image Container** (contêiner de imagem de alta eficiência). É um formato de arquivo baseado no padrão HEIF (High Efficiency Image Format), desenvolvido pelo Moving Picture Experts Group (MPEG). A Apple adotou o HEIC como formato padrão de fotos em iPhones e iPads a partir do iOS 11, em 2017. Se você encontrou uma foto com a **extensão .heic**, é quase certo que ela veio de um aparelho da Apple.

### Por que minhas fotos estão em formato HEIC?

Se você se perguntou "por que minhas fotos estão em formato HEIC?", a resposta é simples: seu iPhone (ou o iPhone de quem enviou as fotos) salva as imagens em HEIC por padrão desde o iOS 11. Não é erro nem vírus — é só o formato que a Apple escolheu para economizar espaço. Mais abaixo mostramos como abrir um arquivo HEIC em qualquer aparelho e até como fazer o iPhone voltar a fotografar em JPEG.

## HEIF vs HEIC: qual é a diferença?

Os dois termos costumam ser confundidos. **HEIF** é o padrão de contêiner (como uma família de formatos), enquanto **HEIC** é a variante específica que armazena imagens comprimidas com o codec HEVC (H.265) — a que a Apple usa. Na prática, um arquivo .heif e um .heic se comportam do mesmo jeito, e qualquer ferramenta que abre um geralmente abre o outro.

## Por que a Apple usa HEIC?

A Apple escolheu o HEIC por vários motivos convincentes:

### Compressão superior
Um arquivo HEIC é aproximadamente **50% menor** que um JPEG equivalente, mantendo a mesma qualidade visual. Isso significa que o seu iPhone consegue guardar praticamente o dobro de fotos no mesmo espaço de armazenamento.

### Melhor qualidade de imagem
Com o mesmo tamanho de arquivo, o HEIC entrega uma qualidade de imagem visivelmente melhor que o JPEG. Isso acontece porque o HEIC usa algoritmos de compressão mais avançados (baseados no codec de vídeo HEVC/H.265), que preservam melhor os detalhes finos e reduzem os artefatos de compressão.

### Recursos avançados
O HEIC suporta recursos que o JPEG não tem:
- **Profundidade de cor de 16 bits** (contra 8 bits do JPEG), com degradês mais suaves e cores mais precisas
- **Transparência** (suporte a canal alfa)
- **Várias imagens em um único arquivo** (Live Photos, fotos em sequência, rajadas)
- **Edição não destrutiva** — as edições podem ser guardadas junto com a imagem original
- **Mapas de profundidade** para fotos no modo Retrato

## O problema da compatibilidade

Apesar das vantagens técnicas, o HEIC tem uma grande desvantagem: **compatibilidade limitada**. Muitos aparelhos e programas não abrem HEIC nativamente:

- **Windows**: o Windows 10/11 exige instalar as Extensões de Imagem HEIF da Microsoft Store (às vezes pagas)
- **Android**: a maioria dos aparelhos Android não abre arquivos HEIC nativamente
- **Navegadores**: nenhum navegador importante exibe arquivos HEIC diretamente
- **Redes sociais**: a maioria das plataformas converte HEIC para JPEG no upload, mas algumas podem recusar o arquivo
- **E-mail**: anexos HEIC podem não aparecer corretamente para quem recebe

## Como abrir um arquivo HEIC

### No Mac
O macOS tem suporte nativo a HEIC. Basta dar um clique duplo no arquivo para abri-lo no Pré-Visualização. Você também pode usar o Fotos, o Pixelmator ou qualquer editor de imagens moderno para Mac.

### Como abrir arquivo HEIC no Windows
Você tem algumas opções:
1. Instalar as **Extensões de Imagem HEIF** (HEIF Image Extensions) da Microsoft Store
2. Usar um conversor gratuito como o **OpenMyHEIC.com** para converter para JPG
3. Usar programas de terceiros, como IrfanView ou GIMP

### Em qualquer aparelho
A solução universal mais fácil é usar um conversor online como o OpenMyHEIC.com. Ele funciona em qualquer navegador e converte seus arquivos na hora, sem enviar nada para nenhum servidor.

## HEIC vs JPEG: comparação detalhada

| Recurso | HEIC | JPEG |
|---------|------|------|
| Tamanho do arquivo | ~50% menor | Referência |
| Qualidade | Superior | Boa |
| Profundidade de cor | 16 bits | 8 bits |
| Transparência | Sim | Não |
| Animação | Sim (Live Photos) | Não |
| Compatibilidade | Limitada | Universal |
| Edição | Não destrutiva | Destrutiva |

## Vale a pena manter as fotos em HEIC?

Para armazenar no seu iPhone, o HEIC é a melhor escolha — economiza espaço sem perder qualidade. Porém, na hora de compartilhar fotos com outras pessoas ou usá-las fora do ecossistema Apple, o recomendado é converter para JPG ou PNG.

## Como fazer o iPhone parar de tirar fotos em HEIC

Se você prefere que o iPhone fotografe em JPEG:
1. Abra os **Ajustes**
2. Toque em **Câmera**
3. Toque em **Formatos**
4. Selecione **Mais compatível**

Com isso, o iPhone passa a salvar as fotos em JPEG em vez de HEIC. Só tenha em mente que elas vão ocupar aproximadamente o dobro do espaço.

## Converta seus arquivos HEIC sem complicação

Pronto para converter seus arquivos HEIC? Use nosso [conversor gratuito de HEIC para JPG](/pt) — é instantâneo, privado e funciona direto no seu navegador. Sem upload e sem criar conta.`,
  },
  "how-to-convert-heic-to-jpg-windows": {
    slug: "how-to-convert-heic-to-jpg-windows",
    title: "Como converter HEIC para JPG no Windows 10/11 (3 métodos) | OpenMyHEIC",
    description: "Como converter HEIC para JPG no Windows 10 e 11, passo a passo: conversor online grátis (sem instalar nada), extensões HEIF e programas gratuitos.",
    h1: "Como converter HEIC para JPG no Windows 10/11 — passo a passo",
    content: `## Como converter HEIC para JPG no Windows

Recebeu fotos HEIC de um iPhone e não consegue abri-las no seu PC com Windows? Você não está sozinho. O HEIC é o formato de foto padrão da Apple, e o Windows não tem suporte completo a ele de fábrica. Veja três jeitos fáceis de transformar HEIC em JPG no Windows 10 e no Windows 11.

## Método 1: usar o OpenMyHEIC.com (o mais rápido e privado)

O jeito mais rápido de converter HEIC para JPG no Windows é usar nosso conversor online gratuito. Sem instalar nenhum programa.

### Passo a passo:
1. **Abra o navegador** e acesse o [OpenMyHEIC.com](/pt)
2. **Arraste e solte** seu arquivo HEIC no conversor, ou clique em "Selecionar arquivos" para procurá-lo
3. **Ajuste a qualidade** no controle deslizante (recomendamos 92%)
4. **Clique em "Converter"** e aguarde alguns segundos
5. **Clique em "Baixar"** para salvar o arquivo JPG

**Por que esse método é o melhor:**
- Nada de instalar programas
- Seus arquivos nunca saem do seu computador (a conversão acontece no navegador)
- Funciona em qualquer versão do Windows
- Totalmente grátis e sem limites

## Método 2: instalar as extensões HEIF no Windows

O Windows 10 e o 11 conseguem abrir arquivos HEIC nativamente com as extensões certas instaladas.

### Passo a passo:
1. Abra a **Microsoft Store** no seu PC
2. Pesquise por **"HEIF Image Extensions"** (Extensões de Imagem HEIF)
3. Clique em **Instalar** (pode ser gratuito ou custar US$ 0,99)
4. Talvez você também precise das **"HEVC Video Extensions"** (US$ 0,99) para suporte completo
5. Depois de instalar, você consegue abrir arquivos HEIC no app **Fotos**
6. Para salvar como JPG: abra o arquivo HEIC no Fotos → clique no menu de três pontos → **Salvar como** → escolha **JPG**

**Atenção:** esse método pode exigir uma compra na Microsoft Store e só funciona no Windows 10/11.

## Método 3: usar programas gratuitos no PC

Vários programas gratuitos conseguem converter HEIC para JPG no Windows:

### IrfanView (grátis)
1. Baixe e instale o [IrfanView](https://www.irfanview.com/)
2. Instale o pacote de **Plugins** (inclui o suporte a HEIC)
3. Abra seu arquivo HEIC no IrfanView
4. Vá em **File → Save As** → selecione o formato **JPG**
5. Clique em **Salvar**

### GIMP (grátis)
1. Baixe e instale o [GIMP](https://www.gimp.org/)
2. Abra seu arquivo HEIC (o GIMP 2.10+ suporta HEIC)
3. Vá em **File → Export As**
4. Troque a extensão para **.jpg**
5. Clique em **Exportar**

## Qual método escolher?

| Método | Velocidade | Privacidade | Custo | Conversão em lote |
|--------|-------|---------|------|---------------|
| OpenMyHEIC.com | ⚡ Instantâneo | 🔒 Máxima | Grátis | ✅ Sim |
| Extensões HEIF | Rápido | Boa | US$ 0-0,99 | ❌ Um por vez |
| IrfanView | Rápido | Boa | Grátis | ✅ Sim |
| GIMP | Lento | Boa | Grátis | ❌ Não |

Para a maioria das pessoas, o **OpenMyHEIC.com** é a opção mais rápida e prática. Não precisa instalar nada, funciona na hora e mantém suas fotos totalmente privadas.

## Como abrir arquivo HEIC no Windows 11 (sem converter)

Se você só quer **abrir um arquivo HEIC no Windows 11** ou no Windows 10 sem convertê-lo, instale as Extensões de Imagem HEIF gratuitas da Microsoft Store (Método 2 acima). Depois disso, as fotos HEIC passam a abrir no app Fotos e a mostrar miniaturas no Explorador de Arquivos. Se você precisa que a foto funcione em outros programas — ou quer evitar a Store de vez — converter para JPG continua sendo a opção mais confiável.

## Conversão em lote no Windows

Precisa converter muitos arquivos HEIC de uma vez? Use nosso [conversor em lote](/pt/batch-convert) para converter vários arquivos ao mesmo tempo e baixar tudo em um arquivo ZIP.`,
    schemaSteps: [
      { name: "Abra o conversor", text: "Abra o navegador e acesse OpenMyHEIC.com" },
      { name: "Envie seu arquivo HEIC", text: "Arraste e solte o arquivo HEIC na área do conversor, ou clique em 'Selecionar arquivos' para procurá-lo no computador" },
      { name: "Ajuste a qualidade", text: "Use o controle deslizante para definir o nível de qualidade desejado. 92% é o recomendado para a maioria dos casos." },
      { name: "Converta o arquivo", text: "Clique no botão 'Converter' e aguarde alguns segundos até a conversão terminar" },
      { name: "Baixe o JPG", text: "Clique no botão 'Baixar' para salvar o arquivo JPG convertido no seu computador" },
    ],
  },
  "how-to-convert-heic-to-jpg-mac": {
    slug: "how-to-convert-heic-to-jpg-mac",
    title: "Como converter HEIC para JPG no Mac (4 métodos fáceis) | OpenMyHEIC",
    description: "Como converter HEIC para JPG no Mac com Pré-Visualização, Automator, Terminal ou conversor online grátis. Quatro métodos fáceis, passo a passo, para o macOS.",
    h1: "Como converter HEIC para JPG no Mac — 4 jeitos fáceis",
    content: `## Como converter HEIC para JPG no Mac

Embora o macOS tenha suporte nativo a arquivos HEIC, pode ser que você precise transformar HEIC em JPG no Mac para compartilhar com quem usa Windows, enviar para sites ou garantir compatibilidade com certos aplicativos. Veja quatro métodos fáceis.

## Método 1: usar o OpenMyHEIC.com (o mais rápido)

O método mais rápido, que funciona em qualquer Mac com um navegador.

### Passo a passo:
1. **Abra o Safari** (ou qualquer navegador) e acesse o [OpenMyHEIC.com](/pt)
2. **Arraste e solte** seu arquivo HEIC no conversor
3. **Ajuste a qualidade** se quiser (o padrão de 92% já é ótimo)
4. **Clique em "Converter"** — a conversão leva segundos
5. **Clique em "Baixar"** para salvar o JPG

**Vantagens:** não precisa de nenhum programa, os arquivos ficam privados no seu Mac e tudo acontece na hora.

## Método 2: usar o Pré-Visualização (já vem no Mac)

O Pré-Visualização é o visualizador de imagens nativo do macOS e consegue exportar HEIC para JPG.

### Passo a passo:
1. **Clique com o botão direito** no arquivo HEIC → **Abrir com** → **Pré-Visualização**
2. Clique em **Arquivo** na barra de menus
3. Selecione **Exportar...**
4. No menu **Formato**, escolha **JPEG**
5. Ajuste o controle de **Qualidade**
6. Clique em **Salvar**

### Para vários arquivos:
1. Selecione todos os arquivos HEIC no Finder
2. Clique com o botão direito → **Abrir com** → **Pré-Visualização**
3. No Pré-Visualização, pressione **Cmd+A** para selecionar todas as imagens na barra lateral
4. Clique em **Arquivo** → **Exportar imagens selecionadas...**
5. Escolha o formato e o destino

## Método 3: usar o Automator (conversão em lote)

O Automator permite criar um fluxo de trabalho reutilizável para converter em lote.

### Passo a passo:
1. Abra o **Automator** (pesquise no Spotlight)
2. Escolha **Ação Rápida** como tipo de documento
3. Em "O fluxo de trabalho recebe", selecione **arquivos de imagem** no **Finder**
4. Arraste a ação **"Alterar tipo das imagens"** da biblioteca
5. Selecione **JPEG** como formato de saída
6. Salve o fluxo com um nome como "Converter para JPG"
7. Agora é só clicar com o botão direito em qualquer arquivo HEIC → **Ações Rápidas** → **Converter para JPG**

## Método 4: usar o Terminal (avançado)

Para usuários avançados, o Terminal oferece conversão rápida com o comando \`sips\`, que já vem no macOS.

### Converter um único arquivo:
\`\`\`bash
sips -s format jpeg input.heic --out output.jpg
\`\`\`

### Converter todos os arquivos HEIC de uma pasta:
\`\`\`bash
for file in *.heic; do sips -s format jpeg "$file" --out "\${file%.heic}.jpg"; done
\`\`\`

## Comparação dos métodos

| Método | Ideal para | Conversão em lote | Facilidade |
|--------|----------|---------------|-------------|
| OpenMyHEIC.com | Conversões rápidas do dia a dia | ✅ Sim | ⭐⭐⭐⭐⭐ |
| Pré-Visualização | Conversões simples | ✅ Limitada | ⭐⭐⭐⭐ |
| Automator | Lotes recorrentes | ✅ Sim | ⭐⭐⭐ |
| Terminal | Usuários avançados | ✅ Sim | ⭐⭐ |

## Dicas para quem usa Mac

- **AirDrop**: ao receber fotos via AirDrop, você pode configurar o iPhone para enviar como "Mais compatível" (JPEG) em vez de HEIC
- **Fotos do iCloud**: se você usa o iCloud, as fotos podem ser baixadas em HEIC. Use qualquer método acima para convertê-las
- **Preservar a qualidade**: para qualidade máxima, use o formato PNG em vez de JPG. Nosso conversor também faz [HEIC para PNG](/pt/heic-to-png).

Pronto para converter HEIC para JPG no Mac? Experimente nosso [conversor de HEIC grátis](/pt) — funciona na hora, direto no navegador e com privacidade total.`,
    schemaSteps: [
      { name: "Abra o conversor", text: "Abra o Safari ou qualquer navegador no seu Mac e acesse OpenMyHEIC.com" },
      { name: "Envie seu arquivo HEIC", text: "Arraste e solte o arquivo HEIC do Finder na área do conversor, ou clique em 'Selecionar arquivos' para procurá-lo" },
      { name: "Defina a qualidade", text: "Ajuste o controle deslizante de qualidade como preferir. 92% oferece excelente qualidade com tamanho de arquivo razoável." },
      { name: "Converta o arquivo", text: "Clique no botão 'Converter'. A conversão acontece na hora, direto no navegador." },
      { name: "Baixe o resultado", text: "Clique em 'Baixar' para salvar o arquivo JPG convertido na pasta Downloads do seu Mac" },
    ],
  },
};

export default guides;
