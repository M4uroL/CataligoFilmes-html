  // Dados dos filmes e séries
  const contentData = [
    {
        id: 1,
        title: "Vingadores: Ultimato",
        type: "filme",
        year: 2019,
        rating: 8.4,
        genre: "Ação",
        description: "Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas devido aos esforços do Titã Louco, Thanos. Com a ajuda de aliados remanescentes, os Vingadores devem se reunir mais uma vez para desfazer as ações de Thanos e restaurar a ordem no universo de uma vez por todas.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
        featured: true
    },
    {
        id: 2,
        title: "Stranger Things",
        type: "serie",
        year: 2016,
        rating: 8.7,
        genre: "Ficção Científica",
        description: "Em 1980, na cidade fictícia de Hawkins, Indiana, um garoto desaparece misteriosamente. Seus amigos, sua mãe e o chefe de polícia se envolvem em uma busca desesperada por respostas, descobrindo forças sobrenaturais e experimentos governamentais secretos.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
        featured: true
    },
    {
        id: 3,
        title: "Coringa",
        type: "filme",
        year: 2019,
        rating: 8.4,
        genre: "Drama",
        description: "Durante a década de 1980, um comediante fracassado é levado à loucura e se torna um assassino psicopata em Gotham City. Uma história sombria e perturbadora sobre a origem do icônico vilão do Batman.",
        image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&h=250&fit=crop",
        featured: true
    },
    {
        id: 4,
        title: "Breaking Bad",
        type: "serie",
        year: 2008,
        rating: 9.5,
        genre: "Crime",
        description: "Walter White, um professor de química do ensino médio, se torna um fabricante de metanfetamina depois de descobrir que tem câncer terminal, tentando garantir o futuro financeiro de sua família.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        featured: true
    },
    {
        id: 5,
        title: "Parasita",
        type: "filme",
        year: 2019,
        rating: 8.6,
        genre: "Thriller",
        description: "Uma família pobre, mas engenhosa, planeja se infiltrar na casa de uma família rica, mas um evento inesperado ameaça seu plano elaborado.",
        image: "https://images.unsplash.com/photo-1489599456549-c2e71d34e81c?w=400&h=250&fit=crop",
        featured: false
    },
    {
        id: 6,
        title: "The Crown",
        type: "serie",
        year: 2016,
        rating: 8.7,
        genre: "Drama",
        description: "A série segue a vida política e pessoal da Rainha Elizabeth II da década de 1940 aos tempos modernos, explorando os eventos que moldaram a segunda metade do século XX.",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400&h=250&fit=crop",
        featured: false
    },
    {
        id: 7,
        title: "Interestelar",
        type: "filme",
        year: 2014,
        rating: 8.6,
        genre: "Ficção Científica",
        description: "Em um futuro onde a Terra está se tornando inabitável, um grupo de exploradores empreende a missão espacial mais importante da história da humanidade, viajando além da nossa galáxia em busca de um novo lar.",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop",
        featured: false
    },
    {
        id: 8,
        title: "Game of Thrones",
        type: "serie",
        year: 2011,
        rating: 9.3,
        genre: "Fantasia",
        description: "Nove famílias nobres lutam pelo controle das terras míticas de Westeros, enquanto um antigo inimigo retorna após estar adormecido por milênios.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
        featured: false
    }
];

let currentCarouselIndex = 0;
let currentFilter = 'todos';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    renderContent();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.tab;
            renderContent();
        });
    });

    // Modal close on outside click
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function initCarousel() {
    const carousel = document.getElementById('featuredCarousel');
    const featuredItems = contentData.filter(item => item.featured);
    
    carousel.innerHTML = featuredItems.map(item => `
        <div class="carousel-item" onclick="openModal(${item.id})">
            <img src="${item.image}" alt="${item.title}">
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-year">${item.year} • ${item.type.toUpperCase()}</div>
                <div class="item-rating">
                    <span class="star">⭐</span>
                    <span>${item.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function moveCarousel(direction) {
    const carousel = document.getElementById('featuredCarousel');
    const items = carousel.children;
    const itemWidth = 300; // 280px + 20px gap
    
    if (direction === 'next') {
        currentCarouselIndex = (currentCarouselIndex + 1) % items.length;
    } else {
        currentCarouselIndex = currentCarouselIndex === 0 ? items.length - 1 : currentCarouselIndex - 1;
    }
    
    carousel.style.transform = `translateX(-${currentCarouselIndex * itemWidth}px)`;
}

function renderContent() {
    const grid = document.getElementById('contentGrid');
    let filteredData = contentData;

    if (currentFilter === 'filmes') {
        filteredData = contentData.filter(item => item.type === 'filme');
    } else if (currentFilter === 'series') {
        filteredData = contentData.filter(item => item.type === 'serie');
    } else if (currentFilter === 'favoritos') {
        filteredData = contentData.filter(item => favorites.includes(item.id));
    }

    grid.innerHTML = filteredData.map(item => `
        <div class="content-item" onclick="openModal(${item.id})">
            <img src="${item.image}" alt="${item.title}">
            <div class="content-info">
                <div class="content-title">${item.title}</div>
                <div class="content-description">${item.description.substring(0, 100)}...</div>
                <div class="content-meta">
                    <span class="genre-tag">${item.genre}</span>
                    <div class="item-rating">
                        <span class="star">⭐</span>
                        <span>${item.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('contentGrid');
    
    if (!searchTerm) {
        renderContent();
        return;
    }

    const filteredData = contentData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.genre.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );

    grid.innerHTML = filteredData.map(item => `
        <div class="content-item" onclick="openModal(${item.id})">
            <img src="${item.image}" alt="${item.title}">
            <div class="content-info">
                <div class="content-title">${item.title}</div>
                <div class="content-description">${item.description.substring(0, 100)}...</div>
                <div class="content-meta">
                    <span class="genre-tag">${item.genre}</span>
                    <div class="item-rating">
                        <span class="star">⭐</span>
                        <span>${item.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(id) {
    const item = contentData.find(content => content.id === id);
    const isFavorite = favorites.includes(id);
    
    document.getElementById('modalContent').innerHTML = `
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="margin-bottom: 10px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${item.title}</h2>
        <div style="display: flex; gap: 20px; margin-bottom: 20px; align-items: center;">
            <span style="color: #4ecdc4;">${item.year}</span>
            <span style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); padding: 5px 12px; border-radius: 15px; font-size: 12px;">${item.genre}</span>
            <div style="display: flex; align-items: center; gap: 5px;">
                <span style="color: #ffd700;">⭐</span>
                <span>${item.rating}</span>
            </div>
        </div>
        <p style="line-height: 1.6; margin-bottom: 20px; color: #cccccc;">${item.description}</p>
        <div style="display: flex; gap: 10px;">
            <button onclick="toggleFavorite(${id})" style="padding: 10px 20px; border: none; border-radius: 25px; cursor: pointer; ${isFavorite ? 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4);' : 'background: rgba(255, 255, 255, 0.1);'} color: white; transition: all 0.3s ease;">
                ${isFavorite ? '❤️ Favorito' : '🤍 Adicionar aos Favoritos'}
            </button>
            <button onclick="playContent(${id})" style="padding: 10px 20px; border: none; border-radius: 25px; background: linear-gradient(45deg, #4ecdc4, #45b7d1); color: white; cursor: pointer; transition: all 0.3s ease;">
                ▶ Assistir
            </button>
        </div>
    `;
    
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    openModal(id); // Reabrir modal para atualizar botão
    if (currentFilter === 'favoritos') {
        renderContent(); // Atualizar grid se estiver vendo favoritos
    }
}

function playContent(id) {
    const item = contentData.find(content => content.id === id);
    alert(`🎬 Iniciando reprodução de "${item.title}"!\n\nEm um aplicativo real, isso abriria o player de vídeo.`);
}

// Auto-scroll do carrossel
setInterval(() => {
    moveCarousel('next');
}, 5000);
