// Scroll Suave no Menu

const menuItens = document.querySelectorAll('#menu nav a');

menuItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
}

function scrollToIdOnClick(event) {
    event.preventDefault()
    const to = getScrollTopByHref(event.target)
    scrollToPosition(to);
}

function scrollToPosition(to) {
    window.scroll({
        top: to,
        behavior: 'smooth'
    });
}

// Animação da pagina

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function (element) {
        if (windowTop > element.offsetTop) {
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }
    })
}

animeScroll();

if (target.length) {
    window.addEventListener('scroll', function () {
        animeScroll();
    })
}



// RENDERIZAR  AS TAGS NO HTML

function renderCard(item) {
    const divCard = document.getElementById('perfil');
    const htmlElement = `
    <h1>${item.name}</h1>
    <div class="container-repo">
        <div class="esq">
            <img src="${item.avatar_url}" alt="">
            <a href="${item.html_url}" target="_blank">Visitar Perfil</a>
        </div>
        <div class="dir">
            <ul>
                <li>REPOSITORIOS: ${item.public_repos}</li>
                <li>SEGUIDORES: ${item.followers}</li>
                <li>SEGUINDO: ${item.following}</li>
            </ul>
            <div class="btn-repo">
                <input type="button" value="Ver Respositorios" id="btn-esq" onclick="mostrarRepo()"></input>
                <input type="button" value="Ver Favoritos" id="btn-dir" onclick="mostrarRepo()"></input>
            </div>
        </div>
    </div>
    <div id="repo-list"></div>
</div>
`;
    divCard.innerHTML = htmlElement;
}

function renderRepo(item) {
    const repoDiv = document.getElementById('repo-list');
    const repoElement = `
    <h4>LISTA DE REPOSITÓRIOS</h4>
        <ul>
            <li>${item[0].name}</li>
            <li>${item[1].name}</li>
            <li>${item[2].name}</li>
            <li>${item[3].name}</li>
            <li>${item[4].name}</li>
            <li>${item[5].name}</li>
        </ul>  
`;
    repoDiv.innerHTML = repoElement;
}


// FAZER AS REQUISIÇÕES API

function fetchData() {
    fetch("https://api.github.com/users/qcx").then(response => {
        if (!response.ok) {
            throw Error('Error')
        }
        return response.json()
    }).then(data => {
        console.log(data)
        renderCard(data)
    }).catch(error => {
        console.log(error)
    })
}

function fetchRepo() {
    fetch("https://api.github.com/users/qcx/repos?per_page=7&sort=created:asc").then(r => {
        if (!r.ok) {
            throw Error('Error')
        }
        return r.json()
    }).then(dados => {
        renderRepo(dados)
    }).catch(error => {
        console.log(error)
    })
}

fetchData();
fetchRepo();

// EVENTO DO BOTAO NO REPOSITORIO

function mostrarRepo() {
    const divRepo = document.getElementById('repo-list');
    
    if(divRepo.style.display == 'flex') {
        divRepo.style.display = 'none'
    } else {
        divRepo.style.display = 'flex'
    }
}

mostrarRepo();












