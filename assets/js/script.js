// =====================================================
// SELEÇÃO DOS ELEMENTOS
// =====================================================

// Seção Sobre
const about =
    document.querySelector("#about")

// Seção Projetos
const swiperWrapper =
    document.querySelector(".swiper-wrapper")

// Formulário
const formulario =
    document.querySelector("#formulario")

// Expressão regular para validação do e-mail
const emailRegex =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// =====================================================
// SEÇÃO SOBRE MIM
// =====================================================

async function getAboutGithub() {

    // Executa somente se a seção Sobre existir
    if (!about) {
        return
    }

    try {

        const resposta =
            await fetch(
                "https://api.github.com/users/jonathanleao19"
            )


        const perfil =
            await resposta.json()


        about.innerHTML = ""


        about.innerHTML = `

            <!-- Coluna de Perfil -->
            <aside class="about-profile">

                <!-- Foto -->
                <figure class="about-image">

                    <img
                        src="${perfil.avatar_url}"
                        alt="${perfil.name}"
                    >

                </figure>


                <!-- Nome -->
                <h3>Jonathan Leão</h3>


                <!-- Cargo -->
                <span class="about-role">
                    Desenvolvedor Full Stack Jr.
                </span>


                <!-- Soft Skills -->
                <div class="soft-skills">

                    <h4>Soft Skills</h4>

                    <div class="soft-skills-list">

                        <span class="soft-skill">
                            Comunicação
                        </span>

                        <span class="soft-skill">
                            Trabalho em equipe
                        </span>

                        <span class="soft-skill">
                            Resolução de problemas
                        </span>

                        <span class="soft-skill">
                            Adaptabilidade
                        </span>

                        <span class="soft-skill">
                            Organização
                        </span>

                        <span class="soft-skill">
                            Proatividade
                        </span>

                    </div>

                </div>

            </aside>


            <!-- Conteúdo -->
            <article class="about-content">

                <h2>Sobre mim</h2>

                <p>
                    Sou desenvolvedor Full Stack Jr. em formação,
                    com foco em Java, Spring Boot e desenvolvimento
                    de aplicações web.
                </p>

                <p>
                    Minha trajetória profissional começou fora da
                    tecnologia e passou por diferentes experiências,
                    inclusive internacionais. Esse caminho ampliou
                    minha visão profissional e fortaleceu minha
                    capacidade de aprender, colaborar e lidar com
                    novos desafios.
                </p>

                <p>
                    Hoje direciono essa experiência para o
                    desenvolvimento de software, construindo projetos
                    com Java, Spring Boot, MySQL, JavaScript, HTML,
                    CSS e React, além de utilizar Git e GitHub no
                    versionamento dos meus projetos.
                </p>

                <p>
                    Busco minha primeira oportunidade na área de
                    tecnologia, onde possa continuar aprendendo,
                    contribuir com a equipe e transformar conhecimento
                    em soluções simples e funcionais.
                </p>


                <!-- Links e dados do GitHub -->
                <div class="about-buttons-data">

                    <!-- Botões -->
                    <div class="buttons-container">

                        <a
                            href="${perfil.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="botao"
                        >
                            GitHub
                        </a>

                        <a
                            href="./assets/docs/curriculo-jonathan-leao.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="botao-outline"
                        >
                            Currículo
                        </a>

                    </div>


                    <!-- Dados do GitHub -->
                    <div class="data-container">

                        <!-- Seguidores -->
                        <div class="data-item">

                            <span class="data-number">
                                ${perfil.followers}
                            </span>

                            <span class="data-label">
                                Seguidores
                            </span>

                        </div>


                        <!-- Repositórios -->
                        <div class="data-item">

                            <span class="data-number">
                                ${perfil.public_repos}
                            </span>

                            <span class="data-label">
                                Repositórios
                            </span>

                        </div>

                    </div>

                </div>

            </article>
        `


    } catch (error) {

        console.error(
            "Erro ao buscar dados no GitHub",
            error
        )
    }
}



// =====================================================
// PROJETOS DO GITHUB
// =====================================================

async function getProjectsGitHub() {

    // Executa somente se o carrossel existir
    if (!swiperWrapper) {
        return
    }


    try {

        const resposta =
            await fetch(
                "https://api.github.com/users/jonathanleao19/repos?sort=update&per_page=6"
            )


        const repositorios =
            await resposta.json()


        swiperWrapper.innerHTML = ""


        // Ícones das linguagens
        const linguagens = {

            "JavaScript": "javascript",
            "TypeScript": "typescript",
            "Python": "python",
            "Java": "java",
            "HTML": "html",
            "CSS": "css",
            "PHP": "php",
            "C#": "csharp",
            "Go": "go",
            "Kotlin": "kotlin",
            "Swift": "swift",
            "C": "c",
            "C++": "c_plus",
            "GitHub": "github"
        }


        repositorios.forEach(
            (repositorio) => {

                // Linguagem principal
                const linguagem =
                    repositorio.language ||
                    "GitHub"


                // Ícone
                const icone =
                    linguagens[linguagem] ??
                    linguagens["GitHub"]


                const urlIcone =
                    `./assets/icons/languages/${icone}.svg`


                // Nome formatado
                const nomeFormatado =
                    repositorio.name
                        .replace(/[-_]/g, " ")
                        .replace(
                            /[^a-zA-Z0-9\s]/g,
                            ""
                        )
                        .replace(
                            /\s+t[a-z0-9]+$/i,
                            ""
                        )
                        .toUpperCase()


                // Limita descrição
                const truncar =
                    (texto, limite) =>

                        texto.length > limite
                            ? texto.substring(
                                0,
                                limite
                            ) + "..."
                            : texto


                const descricao =
                    repositorio.description

                        ? truncar(
                            repositorio.description,
                            100
                        )

                        : "Projeto desenvolvido no GitHub"


                // Tags
                const tags =

                    repositorio.topics?.length > 0

                        ? repositorio.topics
                            .slice(0, 3)
                            .map(
                                (topic) =>
                                    `<span class="tag">${topic}</span>`
                            )
                            .join("")

                        : `<span class="tag">${linguagem}</span>`


                // Deploy
                const botaoDeploy =
                    repositorio.homepage

                        ? `
                            <a
                                href="${repositorio.homepage}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="botao-outline botao-sm"
                            >
                                Deploy
                            </a>
                        `

                        : ""


                // Botões
                const botoesAcao = `

                    <div class="project-buttons">

                        <a
                            href="${repositorio.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="botao botao-sm"
                        >
                            GitHub
                        </a>

                        ${botaoDeploy}

                    </div>
                `


                // Card
                swiperWrapper.innerHTML += `

                    <div class="swiper-slide">

                        <article class="project-card">

                            <!-- Ícone -->
                            <figure class="project-image">

                                <img
                                    src="${urlIcone}"
                                    alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                                >

                            </figure>


                            <!-- Conteúdo -->
                            <div class="project-content">

                                <h3>
                                    ${nomeFormatado}
                                </h3>

                                <p>
                                    ${descricao}
                                </p>


                                <div class="project-tags">
                                    ${tags}
                                </div>


                                ${botoesAcao}

                            </div>

                        </article>

                    </div>
                `
            }
        )


        iniciarSwiper()


    } catch (error) {

        console.error(
            "Erro ao buscar os dados dos projetos no GitHub",
            error
        )
    }
}



// =====================================================
// SWIPER
// =====================================================

function iniciarSwiper() {

    // Evita erro na success.html
    if (
        !document.querySelector(
            ".projects-swiper"
        ) ||
        typeof Swiper === "undefined"
    ) {

        return
    }


    new Swiper(
        ".projects-swiper",
        {

            slidesPerView: 1,

            slidesPerGroup: 1,

            spaceBetween: 24,

            centeredSlides: false,

            loop: true,

            watchOverflow: true,


            breakpoints: {

                0: {

                    slidesPerView: 1,

                    slidesPerGroup: 1,

                    spaceBetween: 40,

                    centeredSlides: false
                },


                769: {

                    slidesPerView: 2,

                    slidesPerGroup: 2,

                    spaceBetween: 40,

                    centeredSlides: false
                },


                1025: {

                    slidesPerView: 3,

                    slidesPerGroup: 3,

                    spaceBetween: 54,

                    centeredSlides: false
                }
            },


            navigation: {

                nextEl:
                    ".swiper-button-next",

                prevEl:
                    ".swiper-button-prev"
            },


            pagination: {

                el:
                    ".swiper-pagination",

                clickable: true,

                dynamicBullets: true
            },


            autoplay: {

                delay: 5000,

                pauseOnMouseEnter: true,

                disableOnInteraction: false
            },


            grabCursor: true,

            slidesOffsetBefore: 0,

            slidesOffsetAfter: 0
        }
    )
}



// =====================================================
// VALIDAÇÃO DO FORMULÁRIO
// =====================================================

// Só executa quando o formulário existir
if (formulario) {

    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault()


            // Limpa mensagens anteriores
            document
                .querySelectorAll(
                    "form span"
                )
                .forEach(
                    (span) => {

                        span.innerHTML = ""
                    }
                )


            let isValid = true



            // =================================================
            // NOME
            // =================================================

            const nome =
                document.querySelector(
                    "#nome"
                )


            const erroNome =
                document.querySelector(
                    "#erro-nome"
                )


            if (
                nome.value
                    .trim()
                    .length < 3
            ) {

                erroNome.innerHTML =
                    "O nome deve ter no mínimo 3 caracteres"


                if (isValid) {

                    nome.focus()
                }


                isValid = false
            }



            // =================================================
            // E-MAIL
            // =================================================

            const email =
                document.querySelector(
                    "#email"
                )


            const erroEmail =
                document.querySelector(
                    "#erro-email"
                )


            if (
                !email.value
                    .trim()
                    .match(emailRegex)
            ) {

                erroEmail.innerHTML =
                    "Digite um endereço de e-mail válido"


                if (isValid) {

                    email.focus()
                }


                isValid = false
            }



            // =================================================
            // ASSUNTO
            // =================================================

            const assunto =
                document.querySelector(
                    "#assunto"
                )


            const erroAssunto =
                document.querySelector(
                    "#erro-assunto"
                )


            if (
                assunto.value
                    .trim()
                    .length < 5
            ) {

                erroAssunto.innerHTML =
                    "O assunto deve ter no mínimo 5 caracteres"


                if (isValid) {

                    assunto.focus()
                }


                isValid = false
            }



            // =================================================
            // MENSAGEM
            // =================================================

            const mensagem =
                document.querySelector(
                    "#mensagem"
                )


            const erroMensagem =
                document.querySelector(
                    "#erro-mensagem"
                )


            if (
                mensagem.value
                    .trim()
                    .length === 0
            ) {

                erroMensagem.innerHTML =
                    "A mensagem não pode ser vazia"


                if (isValid) {

                    mensagem.focus()
                }


                isValid = false
            }



            // =================================================
            // ENVIO
            // =================================================

            if (isValid) {

                const submitButton =
                    formulario.querySelector(
                        'button[type="submit"]'
                    )


                submitButton.disabled =
                    true


                submitButton.textContent =
                    "Enviando..."


                formulario.submit()
            }
        }
    )
}



// =====================================================
// CARREGA OS DADOS DO GITHUB
// =====================================================

// Somente na página principal
if (about) {

    getAboutGithub()
}


// Somente quando existir o carrossel
if (swiperWrapper) {

    getProjectsGitHub()
}



// =====================================================
// FUNDO INTERATIVO DO HERO
// =====================================================

const canvas =
    document.querySelector(
        "#hero-background"
    )


// Só executa se o Hero existir
if (canvas) {

    const ctx =
        canvas.getContext("2d")


    let particles = []



    // =====================================================
    // POSIÇÃO DO MOUSE
    // =====================================================

    const mouse = {

        x: null,

        y: null,

        radius: 120
    }



    // =====================================================
    // TAMANHO DO CANVAS
    // =====================================================

    function resizeCanvas() {

        canvas.width =
            canvas.offsetWidth


        canvas.height =
            canvas.offsetHeight
    }



    // =====================================================
    // PARTÍCULA
    // =====================================================

    class Particle {

        constructor(x, y) {

            this.x = x

            this.y = y


            this.size =
                Math.random() *
                1.2 +
                0.5


            this.speedX =
                (
                    Math.random() -
                    0.5
                ) *
                0.35


            this.speedY =
                (
                    Math.random() -
                    0.5
                ) *
                0.35
        }



        // Atualiza a posição
        update() {

            this.x +=
                this.speedX


            this.y +=
                this.speedY



            // =================================================
            // LIMITES DO HERO
            // =================================================

            if (this.x <= 0) {

                this.x = 0

                this.speedX *= -1


            } else if (
                this.x >=
                canvas.width
            ) {

                this.x =
                    canvas.width

                this.speedX *= -1
            }


            if (this.y <= 0) {

                this.y = 0

                this.speedY *= -1


            } else if (
                this.y >=
                canvas.height
            ) {

                this.y =
                    canvas.height

                this.speedY *= -1
            }



            // =================================================
            // INTERAÇÃO COM O MOUSE
            // =================================================

            if (
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    this.x -
                    mouse.x


                const dy =
                    this.y -
                    mouse.y


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    )


                if (
                    distance <
                    mouse.radius &&
                    distance > 0
                ) {

                    const force =
                        (
                            mouse.radius -
                            distance
                        ) /
                        mouse.radius


                    this.x +=
                        (
                            dx /
                            distance
                        ) *
                        force *
                        1.5


                    this.y +=
                        (
                            dy /
                            distance
                        ) *
                        force *
                        1.5
                }
            }
        }



        // Desenha a partícula
        draw() {

            ctx.beginPath()


            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            )


            ctx.fillStyle =
                "rgba(87, 150, 162, 0.85)"


            ctx.fill()
        }
    }



    // =====================================================
    // CRIA AS PARTÍCULAS
    // =====================================================

    function createParticles() {

        particles = []


        const amount =
            window.innerWidth < 768

                ? 20

                : 40


        const columns =
            Math.ceil(
                Math.sqrt(amount)
            )


        const rows =
            Math.ceil(
                amount /
                columns
            )


        const cellWidth =
            canvas.width /
            columns


        const cellHeight =
            canvas.height /
            rows


        let count = 0


        for (
            let row = 0;
            row < rows;
            row++
        ) {

            for (
                let column = 0;
                column < columns;
                column++
            ) {

                if (
                    count >= amount
                ) {

                    break
                }


                const x =
                    column *
                    cellWidth +
                    Math.random() *
                    cellWidth


                const y =
                    row *
                    cellHeight +
                    Math.random() *
                    cellHeight


                particles.push(
                    new Particle(
                        x,
                        y
                    )
                )


                count++
            }
        }
    }



    // =====================================================
    // CONECTA AS PARTÍCULAS
    // =====================================================

    function connectParticles() {

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x


                const dy =
                    particles[i].y -
                    particles[j].y


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    )


                if (
                    distance < 100
                ) {

                    const opacity =
                        1.70 *
                        (
                            1 -
                            distance /
                            150
                        )


                    ctx.beginPath()


                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    )


                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    )


                    ctx.strokeStyle =
                        `rgba(
                            13,
                            61,
                            71,
                            ${opacity}
                        )`


                    ctx.lineWidth =
                        0.4


                    ctx.stroke()
                }
            }
        }
    }



    // =====================================================
    // INTERAÇÃO COM O MOUSE
    // =====================================================

    const hero =
        document.querySelector(
            "#hero"
        )


    if (hero) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    canvas
                        .getBoundingClientRect()


                mouse.x =
                    event.clientX -
                    rect.left


                mouse.y =
                    event.clientY -
                    rect.top
            }
        )


        hero.addEventListener(
            "mouseleave",
            () => {

                mouse.x = null

                mouse.y = null
            }
        )
    }



    // =====================================================
    // ANIMAÇÃO
    // =====================================================

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        )


        particles.forEach(
            (particle) => {

                particle.update()

                particle.draw()
            }
        )


        connectParticles()


        requestAnimationFrame(
            animateParticles
        )
    }



    // =====================================================
    // INICIALIZAÇÃO
    // =====================================================

    resizeCanvas()

    createParticles()

    animateParticles()



    // =====================================================
    // RESPONSIVIDADE
    // =====================================================

    window.addEventListener(
        "resize",
        () => {

            resizeCanvas()

            createParticles()
        }
    )
}



// =====================================================
// ANIMAÇÃO DA SEÇÃO SOBRE MIM
// =====================================================

const aboutSection =
    document.querySelector(
        "#about"
    )


if (
    aboutSection &&
    "IntersectionObserver" in window
) {

    const aboutObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            const profile =
                                entry.target
                                    .querySelector(
                                        ".about-profile"
                                    )


                            const content =
                                entry.target
                                    .querySelector(
                                        ".about-content"
                                    )


                            // Perfil entra primeiro
                            if (profile) {

                                profile
                                    .classList
                                    .add(
                                        "about-visible"
                                    )
                            }


                            // Conteúdo entra depois
                            if (content) {

                                setTimeout(
                                    () => {

                                        content
                                            .classList
                                            .add(
                                                "about-visible"
                                            )

                                    },
                                    150
                                )
                            }


                            observer.unobserve(
                                entry.target
                            )
                        }
                    }
                )
            },

            {
                threshold: 0.25
            }
        )


    aboutObserver.observe(
        aboutSection
    )
}



// =====================================================
// MODO CLARO / ESCURO
// =====================================================

const themeToggle =
    document.querySelector(
        "#theme-toggle"
    )


if (themeToggle) {

    const savedTheme =
        localStorage.getItem(
            "theme"
        )


    // =================================================
    // CARREGA O TEMA SALVO
    // =================================================

    if (
        savedTheme === "dark"
    ) {

        document
            .documentElement
            .setAttribute(
                "data-theme",
                "dark"
            )


        themeToggle
            .classList
            .add(
                "active"
            )


        themeToggle
            .setAttribute(
                "aria-pressed",
                "true"
            )


        themeToggle
            .setAttribute(
                "aria-label",
                "Ativar modo claro"
            )
    }



    // =================================================
    // ALTERNA O TEMA
    // =================================================

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                document
                    .documentElement
                    .getAttribute(
                        "data-theme"
                    ) === "dark"



            // =============================================
            // MODO CLARO
            // =============================================

            if (isDark) {

                document
                    .documentElement
                    .removeAttribute(
                        "data-theme"
                    )


                themeToggle
                    .classList
                    .remove(
                        "active"
                    )


                themeToggle
                    .setAttribute(
                        "aria-pressed",
                        "false"
                    )


                themeToggle
                    .setAttribute(
                        "aria-label",
                        "Ativar modo escuro"
                    )


                localStorage.setItem(
                    "theme",
                    "light"
                )



            } else {


                // =========================================
                // MODO ESCURO
                // =========================================

                document
                    .documentElement
                    .setAttribute(
                        "data-theme",
                        "dark"
                    )


                themeToggle
                    .classList
                    .add(
                        "active"
                    )


                themeToggle
                    .setAttribute(
                        "aria-pressed",
                        "true"
                    )


                themeToggle
                    .setAttribute(
                        "aria-label",
                        "Ativar modo claro"
                    )


                localStorage.setItem(
                    "theme",
                    "dark"
                )
            }
        }
    )
}

// =====================================================
// CONTROLE DE ÁUDIO
// =====================================================

const audioToggle =
    document.querySelector("#audio-toggle")

const backgroundAudio =
    document.querySelector("#background-audio")


// Executa somente quando o áudio existir na página
if (backgroundAudio) {

    // Volume da música
    backgroundAudio.volume = 0.15


    // Recupera as informações salvas
    const savedAudio =
        localStorage.getItem("audio")

    const savedAudioTime =
        Number(
            localStorage.getItem("audioTime")
        ) || 0


    // Recupera o ponto onde a música estava
    backgroundAudio.addEventListener(
        "loadedmetadata",
        () => {

            if (
                savedAudioTime >= 0 &&
                savedAudioTime < backgroundAudio.duration
            ) {

                backgroundAudio.currentTime =
                    savedAudioTime
            }
        }
    )


    // =================================================
    // ATUALIZA A POSIÇÃO DA MÚSICA
    // =================================================

    backgroundAudio.addEventListener(
        "timeupdate",
        () => {

            localStorage.setItem(
                "audioTime",
                backgroundAudio.currentTime
            )
        }
    )


    // =================================================
    // RESTAURA O ESTADO DO SWITCH
    // =================================================

    if (
        audioToggle &&
        savedAudio === "on"
    ) {

        audioToggle.classList.add(
            "active"
        )

        audioToggle.setAttribute(
            "aria-pressed",
            "true"
        )

        audioToggle.setAttribute(
            "aria-label",
            "Desativar música"
        )
    }


    // =================================================
    // TENTA CONTINUAR A MÚSICA
    // =================================================

    if (savedAudio === "on") {

        backgroundAudio
            .play()
            .catch(() => {

                /*
                 * Alguns navegadores bloqueiam reprodução
                 * automática ao trocar de página.
                 * Nesse caso, a música continuará após
                 * uma nova interação do usuário.
                 */

            })
    }


    // =================================================
    // CONTROLE PELO SWITCH
    // =================================================

    if (audioToggle) {

        audioToggle.addEventListener(
            "click",
            async () => {

                // =========================================
                // DESLIGA A MÚSICA
                // =========================================

                if (!backgroundAudio.paused) {

                    backgroundAudio.pause()

                    audioToggle.classList.remove(
                        "active"
                    )

                    audioToggle.setAttribute(
                        "aria-pressed",
                        "false"
                    )

                    audioToggle.setAttribute(
                        "aria-label",
                        "Ativar música"
                    )

                    localStorage.setItem(
                        "audio",
                        "off"
                    )

                    return
                }


                // =========================================
                // LIGA A MÚSICA
                // =========================================

                try {

                    await backgroundAudio.play()

                    audioToggle.classList.add(
                        "active"
                    )

                    audioToggle.setAttribute(
                        "aria-pressed",
                        "true"
                    )

                    audioToggle.setAttribute(
                        "aria-label",
                        "Desativar música"
                    )

                    localStorage.setItem(
                        "audio",
                        "on"
                    )

                } catch (error) {

                    console.error(
                        "Erro ao reproduzir música:",
                        error
                    )
                }
            }
        )
    }


    // =================================================
    // SALVA A POSIÇÃO ANTES DE SAIR DA PÁGINA
    // =================================================

    window.addEventListener(
        "beforeunload",
        () => {

            localStorage.setItem(
                "audioTime",
                backgroundAudio.currentTime
            )
        }
    )
}