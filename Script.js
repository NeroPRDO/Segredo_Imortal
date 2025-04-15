document.addEventListener("DOMContentLoaded", () => {
    // Efeito de flickering para a luz de vela
    const candleLight = document.querySelector(".candle-light")
  
    function randomFlicker() {
      const intensity = 0.7 + Math.random() * 0.3
      const duration = 2000 + Math.random() * 3000
  
      candleLight.style.opacity = intensity
      setTimeout(randomFlicker, duration)
    }
  
    randomFlicker()
  
    // Efeito de hover nos símbolos
    const symbols = document.querySelectorAll(".symbol")
  
    symbols.forEach((symbol) => {
      symbol.addEventListener("mouseover", function () {
        // Efeito de brilho ao passar o mouse
        const glow = document.createElement("div")
        glow.classList.add("symbol-glow")
        glow.style.position = "absolute"
        glow.style.width = "50px"
        glow.style.height = "50px"
        glow.style.borderRadius = "50%"
        glow.style.background =
          "radial-gradient(ellipse at center, rgba(255, 237, 188, 0.7) 0%, rgba(255, 237, 188, 0) 70%)"
        glow.style.pointerEvents = "none"
        glow.style.zIndex = "0"
  
        const rect = this.getBoundingClientRect()
        glow.style.left = rect.left + rect.width / 2 - 25 + "px"
        glow.style.top = rect.top + rect.height / 2 - 25 + "px"
  
        document.body.appendChild(glow)
  
        setTimeout(() => {
          glow.remove()
        }, 1000)
      })
    })
  
    // Configuração do formulário de login
    const loginForm = document.getElementById("login-form")
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")
    const loginBtn = document.getElementById("login-btn")
    const errorMessage = document.getElementById("error-message")
    const poemContainer = document.getElementById("poem-container")
    const parchment = document.querySelector(".parchment")
    const resetButton = document.getElementById("reset-button")
  
    // Configurar o botão de reset invisível
    resetButton.addEventListener("click", () => {
      // Resetar o contador de tentativas
      localStorage.removeItem("loginAttempts")
  
      // Remover todos os efeitos de dano
      document.querySelectorAll(".permanent-damage").forEach((el) => el.remove())
  
      // Resetar o estilo do pergaminho
      parchment.style.filter = "brightness(1)"
  
      // Habilitar o formulário novamente
      usernameInput.disabled = false
      passwordInput.disabled = false
      loginBtn.disabled = false
      loginBtn.classList.remove("disabled")
  
      // Limpar a mensagem de erro
      errorMessage.textContent = ""
  
      // Resetar o estilo do formulário
      loginForm.style.opacity = "1"
      loginForm.style.filter = "none"
  
      // Resetar o selo
      const seal = document.querySelector(".seal")
      if (seal) {
        seal.style.opacity = "0.2"
        seal.style.transform = "scale(1)"
      }
  
      // Atualizar a variável de tentativas
      loginAttempts = 0
  
      // Mostrar um efeito visual sutil de confirmação
      const confirmEffect = document.createElement("div")
      confirmEffect.classList.add("reset-confirm")
      document.body.appendChild(confirmEffect)
  
      // Remover o efeito após a animação
      setTimeout(() => {
        confirmEffect.remove()
      }, 500)
    })
  
    // Credenciais corretas
    const correctUsername = "Sonhos"
    const correctPassword = "816"
  
    // Sistema de tentativas limitadas
    let loginAttempts = localStorage.getItem("loginAttempts") ? Number.parseInt(localStorage.getItem("loginAttempts")) : 0
    const maxAttempts = 3
  
    // Aplicar efeitos de destruição com base no número de tentativas
    function applyDamageEffects() {
      // Remover efeitos anteriores
      document.querySelectorAll(".burn-mark, .age-spot, .permanent-damage").forEach((el) => el.remove())
  
      // Aplicar efeitos com base no número de tentativas
      if (loginAttempts > 0) {
        // Escurecer progressivamente o pergaminho
        const darkenFactor = 0.1 * loginAttempts
        parchment.style.filter = `brightness(${1 - darkenFactor})`
  
        // Adicionar manchas de queimado permanentes
        addBurnMarks(loginAttempts)
  
        // Adicionar mais manchas de idade
        addAgeSpots(6 * loginAttempts)
  
        // Adicionar efeito de fumaça
        if (loginAttempts >= 2) {
          addSmokeEffect()
        }
  
        // Adicionar rasgos no pergaminho
        if (loginAttempts >= 2) {
          addTears(loginAttempts)
        }
  
        // Efeito de borda queimada
        addBurnedEdges(loginAttempts)
      }
  
      // Se atingiu o máximo de tentativas, aplicar efeito de selado
      if (loginAttempts >= maxAttempts) {
        sealParchment()
      }
    }
  
    // Função para adicionar manchas de queimado
    function addBurnMarks(attempts) {
      const numMarks = attempts * 3
  
      for (let i = 0; i < numMarks; i++) {
        const burnMark = document.createElement("div")
        burnMark.classList.add("burn-mark", "permanent-damage")
  
        const size = 20 + Math.random() * 40 * attempts
        const opacity = 0.3 + Math.random() * 0.4
  
        burnMark.style.position = "absolute"
        burnMark.style.width = size + "px"
        burnMark.style.height = size + "px"
        burnMark.style.borderRadius = "50%"
        burnMark.style.background =
          "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, rgba(139, 69, 19, 0.5) 30%, transparent 70%)"
        burnMark.style.opacity = opacity
        burnMark.style.left = Math.random() * 100 + "%"
        burnMark.style.top = Math.random() * 100 + "%"
        burnMark.style.pointerEvents = "none"
        burnMark.style.zIndex = "1"
  
        parchment.appendChild(burnMark)
      }
    }
  
    // Função para adicionar manchas de idade
    function addAgeSpots(numSpots) {
      for (let i = 0; i < numSpots; i++) {
        const spot = document.createElement("div")
        spot.classList.add("age-spot", "permanent-damage")
  
        const size = 10 + Math.random() * 15
        const opacity = 0.4 + Math.random() * 0.2
  
        spot.style.position = "absolute"
        spot.style.width = size + "px"
        spot.style.height = size + "px"
        spot.style.borderRadius = "50%"
        spot.style.backgroundColor = "#5e4b31"
        spot.style.opacity = opacity
        spot.style.left = Math.random() * 100 + "%"
        spot.style.top = Math.random() * 100 + "%"
        spot.style.pointerEvents = "none"
        spot.style.zIndex = "1"
  
        parchment.appendChild(spot)
      }
    }
  
    // Função para adicionar efeito de fumaça
    function addSmokeEffect() {
      const smoke = document.createElement("div")
      smoke.classList.add("smoke-effect", "permanent-damage")
  
      smoke.style.position = "absolute"
      smoke.style.top = "0"
      smoke.style.left = "0"
      smoke.style.width = "100%"
      smoke.style.height = "100%"
      smoke.style.background = "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
      smoke.style.pointerEvents = "none"
      smoke.style.zIndex = "2"
  
      parchment.appendChild(smoke)
    }
  
    // Função para adicionar rasgos no pergaminho
    function addTears(attempts) {
      const numTears = attempts
  
      for (let i = 0; i < numTears; i++) {
        const tear = document.createElement("div")
        tear.classList.add("tear", "permanent-damage")
  
        const width = 6 + Math.random() * 3
        const height = 300 + Math.random() * 100
        const rotation = Math.random() * 360
  
        tear.style.position = "absolute"
        tear.style.width = width + "px"
        tear.style.height = height + "px"
        tear.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
        tear.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)"
        tear.style.left = Math.random() * 100 + "%"
        tear.style.top = Math.random() * 100 + "%"
        tear.style.transform = `rotate(${rotation}deg)`
        tear.style.pointerEvents = "none"
        tear.style.zIndex = "1"
  
        parchment.appendChild(tear)
      }
    }
  
    // Função para adicionar bordas queimadas
    function addBurnedEdges(attempts) {
      const edge = document.createElement("div")
      edge.classList.add("burned-edge", "permanent-damage")
  
      edge.style.position = "absolute"
      edge.style.top = "0"
      edge.style.left = "0"
      edge.style.width = "100%"
      edge.style.height = "100%"
      edge.style.boxShadow = `inset 0 0 ${20 * attempts}px ${10 * attempts}px rgba(0, 0, 0, ${0.2 * attempts})`
      edge.style.pointerEvents = "none"
      edge.style.zIndex = "1"
      edge.style.borderRadius = "7px"
  
      parchment.appendChild(edge)
    }
  
    // Função para selar o pergaminho (efeito final)
    function sealParchment() {
      // Desabilitar o formulário
      usernameInput.disabled = true
      passwordInput.disabled = true
      loginBtn.disabled = true
  
      // Adicionar classe para estilo visual de desabilitado
      loginBtn.classList.add("disabled")
  
      // Mostrar mensagem de bloqueio
      errorMessage.textContent = "O pergaminho foi selado após muitas tentativas falhas..."
      errorMessage.style.color = "#8b0000"
      errorMessage.style.fontWeight = "bold"
  
      // Efeito visual de pergaminho selado
      loginForm.style.opacity = "0.8"
      loginForm.style.filter = "grayscale(80%)"
  
      // Adicionar selo mais visível
      const seal = document.querySelector(".seal")
      if (seal) {
        seal.style.opacity = "0.8"
        seal.style.transform = "scale(1.5)"
      }
  
      // Adicionar efeito de cinzas caindo
      addAshEffect()
    }
  
    // Função para adicionar efeito de cinzas caindo
    function addAshEffect() {
      const ashContainer = document.createElement("div")
      ashContainer.classList.add("ash-container", "permanent-damage")
      ashContainer.style.position = "absolute"
      ashContainer.style.top = "0"
      ashContainer.style.left = "0"
      ashContainer.style.width = "100%"
      ashContainer.style.height = "100%"
      ashContainer.style.pointerEvents = "none"
      ashContainer.style.zIndex = "4"
      ashContainer.style.overflow = "hidden"
  
      // Criar partículas de cinza
      for (let i = 0; i < 30; i++) {
        const ash = document.createElement("div")
        ash.classList.add("ash-particle")
  
        const size = 2 + Math.random() * 4
        const startPosition = Math.random() * 100
        const fallDuration = 10 + Math.random() * 20
        const delay = Math.random() * 10
  
        ash.style.position = "absolute"
        ash.style.width = size + "px"
        ash.style.height = size + "px"
        ash.style.backgroundColor = "rgba(169, 169, 169, 0.7)"
        ash.style.borderRadius = "50%"
        ash.style.top = "-10px"
        ash.style.left = startPosition + "%"
        ash.style.animation = `fall ${fallDuration}s linear ${delay}s infinite`
  
        ashContainer.appendChild(ash)
      }
  
      parchment.appendChild(ashContainer)
  
      // Adicionar keyframes para animação de queda
      if (!document.getElementById("ash-keyframes")) {
        const style = document.createElement("style")
        style.id = "ash-keyframes"
        style.textContent = `
          @keyframes fall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            100% { transform: translateY(${parchment.clientHeight}px) rotate(360deg); opacity: 0; }
          }
        `
        document.head.appendChild(style)
      }
    }
  
    // Aplicar efeitos de dano ao carregar a página
    applyDamageEffects()
  
    // Verificar se já excedeu o número de tentativas
    function checkAttemptsExceeded() {
      if (loginAttempts >= maxAttempts) {
        sealParchment()
        return true
      }
      return false
    }
  
    // Executar verificação ao carregar a página
    checkAttemptsExceeded()
  
    // Função para verificar o login
    loginBtn.addEventListener("click", () => {
      // Verificar se já excedeu tentativas
      if (loginAttempts >= maxAttempts) {
        return
      }
  
      const username = usernameInput.value.trim()
      const password = passwordInput.value.trim()
  
      if (username === correctUsername && password === correctPassword) {
        // Login bem-sucedido - resetar contagem de tentativas
        localStorage.removeItem("loginAttempts")
  
        // Mostrar o poema
        loginForm.style.opacity = "0"
        setTimeout(() => {
          loginForm.style.display = "none"
          poemContainer.style.display = "block"
          setTimeout(() => {
            poemContainer.style.opacity = "1"
          }, 100)
        }, 500)
      } else {
        // Login falhou - incrementar tentativas
        loginAttempts++
        localStorage.setItem("loginAttempts", loginAttempts)
  
        // Aplicar efeitos de dano progressivos
        applyDamageEffects()
  
        // Mostrar mensagem de erro apropriada
        if (loginAttempts >= maxAttempts) {
          checkAttemptsExceeded()
        } else {
          const tentativasRestantes = maxAttempts - loginAttempts
          errorMessage.textContent = `As palavras antigas não foram reconhecidas... (${tentativasRestantes} ${
            tentativasRestantes === 1 ? "tentativa restante" : "tentativas restantes"
          })`
        }
  
        // Efeito de tremor
        loginForm.classList.add("shake")
  
        // Remover a classe shake após a animação
        setTimeout(() => {
          loginForm.classList.remove("shake")
        }, 500)
  
        // Efeito de pergaminho queimando temporário
        const burnEffect = document.createElement("div")
        burnEffect.style.position = "absolute"
        burnEffect.style.top = "0"
        burnEffect.style.left = "0"
        burnEffect.style.width = "100%"
        burnEffect.style.height = "100%"
        burnEffect.style.background = `radial-gradient(ellipse at center, rgba(139, 0, 0, ${0.3 + loginAttempts * 0.1}) 0%, rgba(139, 0, 0, 0) 70%)`
        burnEffect.style.pointerEvents = "none"
        burnEffect.style.zIndex = "3"
        burnEffect.style.opacity = "0"
        burnEffect.style.borderRadius = "5px"
  
        loginForm.appendChild(burnEffect)
  
        // Animar o efeito de queimadura
        let opacity = 0
        const burnInterval = setInterval(() => {
          opacity += 0.30
          burnEffect.style.opacity = opacity
  
          if (opacity >= 1) {
            clearInterval(burnInterval)
  
            setTimeout(() => {
              let fadeOut = 1
              const fadeInterval = setInterval(() => {
                fadeOut -= 0.1
                burnEffect.style.opacity = fadeOut
  
                if (fadeOut <= 0) {
                  clearInterval(fadeInterval)
                  burnEffect.remove()
                }
              }, 50)
            }, 900)
          }
        }, 40)
      }
    })
  
    // Permitir envio do formulário ao pressionar Enter
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        loginBtn.click()
      }
    })
  
    // Configurar o link secreto no símbolo
    const secretLink = document.getElementById("secret-link")
  
    secretLink.addEventListener("click", () => {
      // Substitua a URL abaixo pela URL desejada
      window.location.href = "https://github.com/NeroPRDO/Segredo_Imortal"
    })
  })
  