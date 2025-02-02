function copyAddress() {
    const tokenAddress = document.getElementById('tokenAddress').textContent;
    navigator.clipboard.writeText(tokenAddress)
        .then(() => {
            alert('Token address copied!');
        })
        .catch(err => {
            console.error('Copy error: ', err);
        });
}

// Обновляем логику появления элементов
document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем небольшую задержку перед появлением
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
                
                // Опционально: прекращаем наблюдение после появления
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Элемент появится когда 15% его будет видно
    });

    reveals.forEach(element => {
        observer.observe(element);
    });
});

// Добавляем обработчик загрузки видео
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('hero-video');
    const preloader = document.querySelector('.video-preloader');
    let isVideoLoaded = false;

    // Функция для проверки возможности воспроизведения
    function checkVideoPlayback() {
        if (video.readyState >= 3 && !isVideoLoaded) {
            isVideoLoaded = true;
            video.classList.add('loaded');
            preloader.classList.add('hidden');
        }
    }

    // Проверяем состояние загрузки
    video.addEventListener('loadeddata', checkVideoPlayback);
    video.addEventListener('canplay', checkVideoPlayback);
    
    // Обработка ошибок загрузки
    video.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        // Показываем фоллбэк изображение
        video.style.display = 'none';
        document.querySelector('.hero-image').style.display = 'block';
        preloader.classList.add('hidden');
    });

    // Если видео уже закэшировано
    if (video.readyState >= 3) {
        checkVideoPlayback();
    }

    // Оптимизация для мобильных устройств
    if (window.matchMedia('(max-width: 768px)').matches) {
        video.setAttribute('poster', video.poster); // Принудительная загрузка постера
    }
});

// Обновляем код управления музыкой
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('.music-icon');
    
    let isMusicPlaying = false;

    // Отладка загрузки аудио
    console.log('Audio element:', music);
    console.log('Audio source:', music.querySelector('source').src);

    music.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
    });

    music.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
    });

    async function toggleMusic() {
        try {
            if (isMusicPlaying) {
                await music.pause();
                musicIcon.textContent = '🔈';
                console.log('Music paused');
            } else {
                const playPromise = music.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        musicIcon.textContent = '🔊';
                        console.log('Music playing');
                    }).catch(error => {
                        console.error('Playback error:', error);
                    });
                }
            }
            isMusicPlaying = !isMusicPlaying;
        } catch (error) {
            console.error('Toggle music error:', error);
        }
    }

    musicToggle.addEventListener('click', toggleMusic);

    // Первое воспроизведение при клике на страницу
    const startPlayback = async () => {
        try {
            await toggleMusic();
            document.removeEventListener('click', startPlayback);
        } catch (error) {
            console.error('Initial playback error:', error);
        }
    };

    document.addEventListener('click', startPlayback, { once: true });
});

// Обновляем функцию создания огуречного дождя для мобильных устройств
function createCucumberRain() {
    const container = document.getElementById('cucumberRain');
    const cucumberImagePath = '/static/images/cucumber.png';
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    function createCucumber() {
        const cucumber = document.createElement('img');
        cucumber.src = cucumberImagePath;
        cucumber.classList.add('falling-cucumber');
        
        // Уменьшаем размеры и скорость для мобильных
        const size = isMobile ? 
            (Math.random() * 30 + 20) : // 20-50px для мобильных
            (Math.random() * 60 + 40);  // 40-100px для десктопа
        
        const startPosition = Math.random() * window.innerWidth;
        const duration = isMobile ?
            (Math.random() * 2 + 1) : // 1-3 секунды для мобильных
            (Math.random() * 3 + 2);  // 2-5 секунд для десктопа

        const rotation = Math.random() * 360;

        cucumber.style.left = `${startPosition}px`;
        cucumber.style.width = `${size}px`;
        cucumber.style.animationDuration = `${duration}s`;
        cucumber.style.transform = `rotate(${rotation}deg)`;

        container.appendChild(cucumber);

        cucumber.addEventListener('animationend', () => {
            cucumber.remove();
        });
    }

    // Уменьшаем частоту создания огурцов на мобильных
    const interval = isMobile ? 500 : 300; // ms
    return setInterval(createCucumber, interval);
}

// Запускаем огуречный дождь при загрузке страницы
document.addEventListener('DOMContentLoaded', createCucumberRain);

// Добавляем управление дождем через кнопку (опционально)
function toggleCucumberRain() {
    const container = document.getElementById('cucumberRain');
    if (container.style.display === 'none') {
        container.style.display = 'block';
        createCucumberRain();
    } else {
        container.style.display = 'none';
        // Останавливаем создание новых огурцов
        clearInterval(rainInterval);
    }
}

// Функция для переключения языка
function switchLanguage(lang) {
    // Сохраняем выбранный язык
    localStorage.setItem('selectedLanguage', lang);
    
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Обновляем все переводимые элементы
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Инициализация языка - теперь всегда английский
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем английский язык
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        if (translations['en'][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations['en'][key];
            } else {
                element.textContent = translations['en'][key];
            }
        }
    });
});

// Mobile menu handling
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    // Удаляем весь код обработки мобильного меню
    /*
    const menuTrigger = document.getElementById('menuTrigger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuTrigger.addEventListener('click', () => {
        menuTrigger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuTrigger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    */

    // Оставляем только необходимую оптимизацию для мобильных
    if (window.matchMedia('(max-width: 768px)').matches) {
        const video = document.getElementById('hero-video');
        if (video) {
            video.setAttribute('playsinline', '');
            video.setAttribute('preload', 'metadata');
        }
    }

    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Touch event handlers
    document.querySelectorAll('.feature, .tokenomics-item, .roadmap-item').forEach(item => {
        item.addEventListener('touchstart', () => {
            item.classList.add('touch-active');
        }, { passive: true });

        item.addEventListener('touchend', () => {
            item.classList.remove('touch-active');
        }, { passive: true });
    });
});

// Обновляем обработчик загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    // Изменяем оптимизацию для мобильных устройств
    if (window.matchMedia('(max-width: 768px)').matches) {
        const video = document.getElementById('hero-video');
        if (video) {
            // Используем оригинальную версию видео
            video.src = '/static/videos/cucuanimation.MP4';
            
            video.setAttribute('playsinline', '');
            video.setAttribute('preload', 'metadata');
        }

        // Включаем огуречный дождь с оптимизированными параметрами
        const rainInterval = createCucumberRain();
        
        // Сохраняем интервал для возможности остановки
        window.rainInterval = rainInterval;
    }
});

// Оптимизируем создание огуречного дождя
function createCucumberRain() {
    const container = document.getElementById('cucumberRain');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    function createCucumber() {
        const cucumber = document.createElement('img');
        cucumber.src = '/static/images/cucumber.png';
        cucumber.classList.add('falling-cucumber');
        
        // Оптимизированные размеры для мобильных
        const size = isMobile ? 
            (Math.random() * 30 + 38) : // 38-68px для мобильных
            (Math.random() * 60 + 40);  // 40-100px для десктопа
        
        const startPosition = Math.random() * window.innerWidth;
        const duration = isMobile ? 
            (Math.random() * 1.5 + 1) : // 1-2.5 секунды для мобильных
            (Math.random() * 3 + 2);    // 2-5 секунд для десктопа

        cucumber.style.cssText = `
            left: ${startPosition}px;
            width: ${size}px;
            animation-duration: ${duration}s;
            transform: rotate(${Math.random() * 360}deg);
        `;

        container.appendChild(cucumber);
        
        // Удаляем огурец после завершения анимации
        cucumber.addEventListener('animationend', () => cucumber.remove());
    }

    // Регулируем частоту создания огурцов
    return setInterval(createCucumber, isMobile ? 800 : 300);
}

// Оптимизируем видео для всех устройств
/*
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    // video.src = '/static/videos/cucuanimation.MP4';
    // ...existing code...
});
*/

// ...existing code...