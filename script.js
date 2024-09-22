// INDEX.HTML : BARRE DE NAVIGATION
document.addEventListener('DOMContentLoaded', function() {
    function closeMobileNav() {
        const CSnavbarMenu = document.querySelector('#cs-navigation');
        const CSbody = document.body;
        CSnavbarMenu.classList.remove('cs-active');
        CSbody.classList.remove('cs-open');
    }

    const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');
    if (CShamburgerMenu) {
        CShamburgerMenu.addEventListener('click', function(event) {
            const CSnavbarMenu = document.querySelector('#cs-navigation');
            const CSbody = document.body;
            CSnavbarMenu.classList.toggle('cs-active');
            CSbody.classList.toggle('cs-open');
            event.stopPropagation();
        });
    }

    const navLinks = document.querySelectorAll('#cs-navigation .cs-li-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            closeMobileNav();
            event.stopPropagation();
        });
    });

    document.addEventListener('click', function() {
        const CSbody = document.body;
        if (CSbody.classList.contains('cs-open')) {
            closeMobileNav();
        }
    });

    document.addEventListener('keydown', function(event) {
        const CSbody = document.body;
        if (event.key === 'Escape' && CSbody.classList.contains('cs-open')) {
            closeMobileNav();
        }
    });

    setupSlider('.slider-unite1', '.prev1', '.next1');
    setupSlider('.slider-unite2', '.prev2', '.next2');
});

// INDEX.HTML : NOTRE GAMME DE MACARONS
document.addEventListener('DOMContentLoaded', function() {
    var hoverImages = [
        ['https://lesmacaronshottekiet.fr/images/non_disponible.webp'], 
        ['https://lesmacaronshottekiet.fr/images/non_disponible.webp'], 
        ['https://lesmacaronshottekiet.fr/images/non_disponible.webp'], 
        ['https://lesmacaronshottekiet.fr/images/non_disponible.webp'],
        ['https://lesmacaronshottekiet.fr/images/non_disponible.webp'], 
        ['https://lesmacaronshottekiet.fr/images/coffret16ferme-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/coffret20ferme-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/boite12ferme-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/boite16ferme-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/non_disponible.webp'],
        ['https://lesmacaronshottekiet.fr/images/boite16ferme-lesmacaronshottekiet.webp'], 
        ['https://lesmacaronshottekiet.fr/images/boite16ferme-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/pyramide55-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/pyramide75-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/pyramide100-lesmacaronshottekiet.webp'], 
        ['https://lesmacaronshottekiet.fr/images/pyramide126-lesmacaronshottekiet.webp'],
        ['https://lesmacaronshottekiet.fr/images/pyramide155-lesmacaronshottekiet.webp'], 
        ['https://lesmacaronshottekiet.fr/images/pyramide190-lesmacaronshottekiet.webp']
    ];
    var productCards = document.querySelectorAll('.product-card');
    productCards.forEach(function(card, index) {
        var hoverImage = document.createElement('img');
        hoverImage.classList.add('hover-image');
        var randomIndex = Math.floor(Math.random() * hoverImages[index].length);
        hoverImage.src = hoverImages[index][randomIndex];
        hoverImage.alt = 'Image au survol';
        var cardBanner = card.querySelector('.card-banner');
        cardBanner.appendChild(hoverImage);
    });
});

// INDEX.HTML : SLIDE MACARONS UNITES
function setupSlider(sliderSelector, prevBtnSelector, nextBtnSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const slides = document.querySelectorAll(`${sliderSelector} .slide-unite`);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    let currentIndex = 0;
    let interval;
    let touchStartX = 0;
    let touchEndX = 0;
    function showSlide(index) {
        const slideWidth = slides[0].offsetWidth + 10;
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${slideWidth * index}px)`;
        currentIndex = index;
    }
    function nextSlide() {
        if (currentIndex < slides.length - 3) {
            showSlide(currentIndex + 1);
        } else {
            showSlide(0);
        }
    }
    function prevSlide() {
        if (currentIndex > 0) {
            showSlide(currentIndex - 1);
        } else {
            showSlide(slides.length - 3);
        }
    }
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    function startAutoSlide() {
        interval = setInterval(nextSlide, 2500);
    }
    function stopAutoSlide() {
        clearInterval(interval);
    }
    slider.addEventListener('mouseover', stopAutoSlide);
    slider.addEventListener('mouseout', startAutoSlide);
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleGesture();
    });
    function handleGesture() {
        const gestureThreshold = 50;
        const gestureDistance = touchStartX - touchEndX;

        if (gestureDistance > gestureThreshold) {
            nextSlide();
        } else if (gestureDistance < -gestureThreshold) {
            prevSlide();
        }
    }
    startAutoSlide();
}

// INDEX.HTML : CARTE GOOGLE MAP
function mapError() {
    document.getElementById('map-error').style.display = 'block';
}

// INDEX.HTML : FORMULAIRE DE CONTACT
(function () {
    emailjs.init("b4afb2QjaaFwEpzUPoUVG");
})();

const contactForm = document.querySelector('.cs-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const messageContainer = document.getElementById('mail_envoye');

function validateForm(event) {
    event.preventDefault();
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || phoneInput.value.trim() === '' || messageInput.value.trim() === '') {
        showMessage('Veuillez remplir tous les champs.');
        return;
    }
    if (!isValidEmail(emailInput.value)) {
        showMessage('Veuillez saisir une adresse e-mail valide.');
        return;
    }
    sendMail();
}
function showMessage(message) {
    messageContainer.textContent = message;
    messageContainer.classList.add('mail-envoye');
    messageContainer.style.display = 'block';
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 10000);
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
}
function sendMail() {
    const userID = 'YNJtomeDJHjY8e-9V';
    const serviceID = 'mail';
    const templateID = 'template_i3gqnou';
    const params = {
        from_name: nameInput.value,
        from_email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value,
        sender_email: emailInput.value,
        sender_phone: phoneInput.value
    };
    emailjs.send(serviceID, templateID, params, userID)
        .then((response) => {
            console.log('Mail envoyé avec succès !', response);
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            messageInput.value = '';
            showMessage('Votre message a été envoyé avec succès.');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            showMessage('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
        });
}

// ./PAGES-EXT/PARFUMS.HTML (RECHERCHE UNITE MACARON)
$(document).ready(function() {
    if ($('#searchInput').length > 0) {
        $('#searchInput').autocomplete({
            source: function(request, response) {
                var searchTerm = request.term.toLowerCase();
                var suggestions = [];

                $('.cs-item').each(function() {
                    var name = $(this).find('.cs-name').text().trim().toLowerCase();
                    var image = $(this).find('.cs-picture img').attr('src');
                    var id = $(this).attr('id');

                    if (name.startsWith(searchTerm)) {
                        suggestions.push({
                            label: '<div class="suggestion-item" data-page="#' + id + '"><img src="' + image + '" alt="' + name + '"><span>' + name + '</span></div>',
                            value: name,
                            page: '#' + id
                        });
                    }
                });
                response(suggestions);
            },
            select: function(event, ui) {
                var selectedPage = ui.item.page;
                if (selectedPage) {
                    if (!event.isDefaultPrevented()) {
                        window.location.href = selectedPage;
                        $('#searchInput').val('');
                    }
                    return false;
                }
            }
        });

        if ($.ui && $.ui.autocomplete) {
            $('#searchInput').autocomplete('instance')._renderItem = function(ul, item) {
                return $('<li>')
                    .append(item.label)
                    .appendTo(ul);
            };
        }

        $(document).on('click touchstart', '.suggestion-item', function(event) {
            var selectedPage = $(this).data('page');
            if (selectedPage) {
                if (!event.isDefaultPrevented()) {
                    window.location.href = selectedPage;
                    $('#searchInput').val('');
                }
            }
        });

        $('#searchInput').on('touchmove', function(event) {
            event.preventDefault();
        });
    }
});

// INDEX.HTML... : SYSTEME CHANGEMENT DE LANGUE
document.addEventListener("DOMContentLoaded", function() {
    const changeLanguageBtn = document.getElementById('changeLanguageBtn');
    const flagIcon = document.getElementById('flagIcon');
    let currentLanguage = localStorage.getItem('language') || 'fr';
    changeLanguage(currentLanguage);
    updateFlagIcon(currentLanguage);
    updatePlaceholders(currentLanguage);

    changeLanguageBtn.addEventListener('click', function() {
        currentLanguage = (currentLanguage === 'en') ? 'fr' : 'en';
        changeLanguage(currentLanguage);
        updateFlagIcon(currentLanguage);
        updatePlaceholders(currentLanguage);
        localStorage.setItem('language', currentLanguage);
    });
    function changeLanguage(language) {
        const elements = document.querySelectorAll('[data-en], [data-fr]');
        elements.forEach(element => {
            const text = (language === 'en') ? element.getAttribute('data-en') : element.getAttribute('data-fr');
            element.innerHTML = text.replace(/"(.*?)"/g, '<strong>"$1"</strong>');
        });
    }
    function updateFlagIcon(language) {
        let imagePath;
        const currentPage = window.location.pathname;
        imagePath = (language === 'en') ? `https://lesmacaronshottekiet.fr/images/flag-angleterre_lesmacaronshottekiet.webp` : `https://lesmacaronshottekiet.fr/images/flag-france_lesmacaronshottekiet.webp`;
        flagIcon.src = imagePath;
        flagIcon.alt = (language === 'en') ? 'English Flag' : 'French Flag';
    }
    function updatePlaceholders(language) {
        updatePlaceholder('searchInput', language);
        updatePlaceholder('name', language);
        updatePlaceholder('email', language);
        updatePlaceholder('phone', language);
        updatePlaceholder('message', language);

        updatePlaceholder('nom', language);
        updatePlaceholder('prenom', language);
        updatePlaceholder('telephone', language);
        updatePlaceholder('dateSelect', language);
    }
    function updatePlaceholder(elementId, language) {
        const element = document.getElementById(elementId);
        if (element) {
            switch (elementId) {
                case 'searchInput':
                    element.placeholder = (language === 'en') ? 'Search by name...' : 'Rechercher par nom...';
                    break;
                case 'name':
                    element.placeholder = (language === 'en') ? 'Your name, first name...' : 'Votre nom, prénom...';
                    break;
                case 'email':
                    element.placeholder = (language === 'en') ? 'Your mail...' : 'Votre mail...';
                    break;
                case 'phone':
                    element.placeholder = (language === 'en') ? 'Your phone number...' : 'Votre numéro de téléphone...';
                    break;
                case 'message':
                    element.placeholder = (language === 'en') ? 'Write your message...' : 'Écrire votre message...';
                    break;
                
                case 'nom':
                    element.placeholder = (language === 'en') ? 'Your name...' : 'Votre nom...';
                    break;
                case 'prenom':
                    element.placeholder = (language === 'en') ? 'Your first name...' : 'Votre prénom...';
                    break;
                case 'telephone':
                    element.placeholder = (language === 'en') ? 'Your phone number...' : 'Votre numéro de téléphone...';
                    break;
                case 'dateSelect':
                    element.placeholder = (language === 'en') ? 'Select a date...' : 'Sélectionnez une date...';
                    break;

                
            }
        }
    }
});

// ./PAGE-EXT/FORMULAIRECOMMANDE.HTML : SYSTEME COMMANDE
const parfumsDisponibles = {
    //"Amande": { nom: { en: "Almond", fr: "Amande" }, image: "../images/amende.png", prix: 1.50},
    "Angevin": { nom: { en: "Angevin", fr: "Angevin" }, image: "https://lesmacaronshottekiet.fr/images/macaron-angevin_lesmacaronshottekiet.webp", prix: 1.50 },
    "Aux Deux Chocolats": { nom: { en: "Two Chocolate", fr: "Aux Deux Chocolats" }, image: "https://lesmacaronshottekiet.fr/images/macaron-2chocolats_lesmacaronshottekiet.webp", prix: 1.50 },
    "Bergamote": { nom: { en: "Bergamot", fr: "Bergamote" }, image: "https://lesmacaronshottekiet.fr/images/macaron-bergamote_lesmacaronshottekiet.webp", prix: 1.50 },
    //"Bonbon à la Fraise": { nom: { en: "Strawberry Candy", fr: "Bonbon à la Fraise" }, image: "../images/bonbon_fraise.png", prix: 1.50 },
    "Bonbon au Caramel": { nom: { en: "Caramel Candy", fr: "Bonbon au Caramel" }, image: "https://lesmacaronshottekiet.fr/images/macaron-bonboncaramel_lesmacaronshottekiet.webp", prix: 1.50 },
    "Café": { nom: { en: "Coffee", fr: "Café" }, image: "https://lesmacaronshottekiet.fr/images/macaron-cafe_lesmacaronshottekiet.webp", prix: 1.50 },
    "Caramel Beurre Salé": { nom: { en: "Salted Butter Caramel", fr: "Caramel Beurre Salé" }, image: "https://lesmacaronshottekiet.fr/images/macaron-caramel_lesmacaronshottekiet.webp", prix: 1.50 },
    "Cassis": { nom: { en: "Cassis", fr: "Cassis" }, image: "https://lesmacaronshottekiet.fr/images/macaron-cassis_lesmacaronshottekiet.webp", prix: 1.50 },
    "Céréale Croustillante": { nom: { en: "Crispy Cereal", fr: "Céréale Croustillante" }, image: "https://lesmacaronshottekiet.fr/images/macaron-cerealecroustillante_lesmacaronshottekiet.webp", prix: 1.50 },
    "Cerise": { nom: { en: "Cherry", fr: "Cerise" }, image: "https://lesmacaronshottekiet.fr/images/macaron-cerise_lesmacaronshottekiet.webp", prix: 1.50 },
    "Chocolat": { nom: { en: "Chocolate", fr: "Chocolat" }, image: "https://lesmacaronshottekiet.fr/images/macaron-chocolat_lesmacaronshottekiet.webp", prix: 1.50 },
    "Chocolat Blanc": { nom: { en: "White Chocolate", fr: "Chocolat Blanc" }, image: "https://lesmacaronshottekiet.fr/images/macaron-chocolatblanc_lesmacaronshottekiet.webp", prix: 1.50 },
    "Chocolat Caramel Cacahuète": { nom: { en: "Chocolate Caramel Peanut", fr: "Chocolat Caramel Cacahuète" }, image: "https://lesmacaronshottekiet.fr/images/macaron-chocolatcacahuete.webp", prix: 1.50 },
    "Citron": { nom: { en: "Lemon", fr: "Citron" }, image: "https://lesmacaronshottekiet.fr/images/macaron-citron_lesmacaronshottekiet.webp", prix: 1.50 },
    "Coco": { nom: { en: "Coco", fr: "Coco" }, image: "https://lesmacaronshottekiet.fr/images/macaron-coco_lesmacaronshottekiet.webp", prix: 1.50 },
    "Cointreau": { nom: { en: "Cointreau", fr: "Cointreau" }, image: "https://lesmacaronshottekiet.fr/images/macaron-cointreau_lesmacaronshottekiet.webp", prix: 1.50 },
    "Combava": { nom: { en: "Combava", fr: "Combava" }, image: "https://lesmacaronshottekiet.fr/images/macaron-combava_lesmacaronshottekiet.webp", prix: 1.50 },
    "Coquelicot": { nom: { en: "Poppy", fr: "Coquelicot" }, image: "https://lesmacaronshottekiet.fr/images/macaron-coquelicot_lesmacaronshottekiet.webp", prix: 1.50 },
    "Fraise": { nom: { en: "Strawberry", fr: "Fraise" }, image: "https://lesmacaronshottekiet.fr/images/macaron-fraise_lesmacaronshottekiet.webp", prix: 1.50 },
    "Fraise Basilic": { nom: { en: "Strawberry Basil", fr: "Fraise Basilic" }, image: "https://lesmacaronshottekiet.fr/images/macaron-fraisebasilic_lesmacaronshottekiet.webp", prix: 1.50 },
    "Framboise": { nom: { en: "Raspberry", fr: "Framboise" }, image: "https://lesmacaronshottekiet.fr/images/macaron-framboise_lesmacaronshottekiet.webp", prix: 1.50 },
    "Kalamansi": { nom: { en: "Kalamansi", fr: "Kalamansi" }, image: "https://lesmacaronshottekiet.fr/images/macaron-kalamansi_lesmacaronshottekiet.webp", prix: 1.50 },
    "Litchi Framboise": { nom: { en: "Raspberry Lychee", fr: "Litchi Framboise" }, image: "https://lesmacaronshottekiet.fr/images/macaron-litchiframboise_lesmacaronshottekiet.webp", prix: 1.50 },
    "Menthe Chocolat": { nom: { en: "Mint Chocolate", fr: "Menthe Chocolat" }, image: "https://lesmacaronshottekiet.fr/images/macaron-menthechocolat_lesmacaronshottekiet.webp", prix: 1.50 },
    //"Mojito": { nom: { en: "Mojito", fr: "Mojito" }, image: "../images/mojito.png", prix: 1.50 },
    "Myrtille": { nom: { en: "Blueberry", fr: "Myrtille" }, image: "https://lesmacaronshottekiet.fr/images/macaron-myrtille_lesmacaronshottekiet.webp", prix: 1.50 },
    "Nougat": { nom: { en: "Nougat", fr: "Nougat" }, image: "https://lesmacaronshottekiet.fr/images/macaron-nougat_lesmacaronshottekiet.webp", prix: 1.50 },
    //"Pamplemousse": { nom: { en: "Grapefruit", fr: "Pamplemousse" }, image: "../images/pamplemousse.png", prix: 1.50 },
    "Pâte à Tartiner": { nom: { en: "Chocolate Spread", fr: "Pâte à Tartiner" }, image: "https://lesmacaronshottekiet.fr/images/macaron-patetartiner_lesmacaronshottekiet.webp", prix: 1.50 },
    "Pistache": { nom: { en: "Pistachio", fr: "Pistache" }, image: "https://lesmacaronshottekiet.fr/images/macaron-pistache_lesmacaronshottekiet.webp", prix: 1.50 },
    "Praliné Feuilletés": { nom: { en: "Puff Pastry Praline", fr: "Praliné Feuilletés" }, image: "https://lesmacaronshottekiet.fr/images/macaron-pralinefeuilletes_lesmacaronshottekiet.webp", prix: 1.50 },
    "Rose": { nom: { en: "Rose", fr: "Rose" }, image: "https://lesmacaronshottekiet.fr/images/macaron-framboise_lesmacaronshottekiet.webp", prix: 1.50 },
    "Spéculoos": { nom: { en: "Speculoos", fr: "Spéculoos" }, image: "https://lesmacaronshottekiet.fr/images/macaron-speculoss_lesmacaronshottekiet.webp", prix: 1.50 },
    "Vanille": { nom: { en: "Vanilla", fr: "Vanille" }, image: "https://lesmacaronshottekiet.fr/images/macaron-vanille_lesmacaronshottekiet.webp", prix: 1.50 },
    "Yuzu": { nom: { en: "Yuzu", fr: "Yuzu" }, image: "https://lesmacaronshottekiet.fr/images/macaron-yuzu_lesmacaronshottekiet.webp", prix: 1.50 },
    
    "Bleu & Noix": { nom: { en: "Blue Cheese & Walnuts", fr: "Bleu & Noix" }, image: "https://lesmacaronshottekiet.fr/images/macaron-bleu&noix_lesmacaronshottekiet.webp", prix: 2.00 },
    "Chèvre Figue": { nom: { en: "Goat Cheese Fig", fr: "Chèvre Figue" }, image: "https://lesmacaronshottekiet.fr/images/macaron-chevrefigue_lesmacaronshottekiet.webp", prix: 2.00 },
    "Foie Gras": { nom: { en: "Foie Gras", fr: "Foie Gras" }, image: "https://lesmacaronshottekiet.fr/images/macaron-foiegras_lesmacaronshottekiet.webp", prix: 2.00 },
    "Magret de Canard": { nom: { en: "Duck Breast", fr: "Magret de Canard" }, image: "https://lesmacaronshottekiet.fr/images/macaron-magret_lesmacaronshottekiet.webp", prix: 2.00 },
    "Saumon Fumé": { nom: { en: "Smoked Salmon", fr: "Saumon Fumé" }, image: "https://lesmacaronshottekiet.fr/images/macaron-saumon_lesmacaronshottekiet.webp", prix: 2.00 }
};

let commandes = [];

document.addEventListener('DOMContentLoaded', function() {
    const boiteSelect = document.getElementById('boiteSelect');
    if (boiteSelect) {
        boiteSelect.addEventListener('change', function() {
            const capacite = parseInt(this.value);
            if (capacite > 0) {
                afficherParfums(capacite);
            } else {
                fermerListeParfums();
            }
        });
    }

    if (document.getElementById('dateSelect')) {
        initDateTimeSelectors();
    }

    if (document.getElementById('submitCommande')) {
        initPaymentSelector();
        document.getElementById('submitCommande').addEventListener('click', function(event) {
            event.preventDefault();
            validerCommande();
        });
    }

    const inputs = [
        { id: 'nom', errorId: 'nomError' },
        { id: 'prenom', errorId: 'prenomError' },
        { id: 'email', errorId: 'emailError' },
        { id: 'telephone', errorId: 'telError' },
        { id: 'dateSelect', errorId: 'dateError' },
        { id: 'timeSelect', errorId: 'timeError' },
        { id: 'confidentialite', errorId: 'confidentialiteError' }
    ];

    inputs.forEach(input => {
        const element = document.getElementById(input.id);
        const errorElement = document.getElementById(input.errorId);
        if (element && errorElement) {
            element.addEventListener('input', function() {
                errorElement.textContent = '';
            });
        }
    });
});

function getLanguage() {
    return localStorage.getItem('language') || 'fr';
}

function afficherParfums(capacite) {
    const parfumsContainer = document.getElementById('parfumsContainer');
    parfumsContainer.innerHTML = '';

    const currentLanguage = getLanguage();
    
    for (const parfum in parfumsDisponibles) {
        const parfumData = parfumsDisponibles[parfum];
        const parfumNom = parfumData.nom[currentLanguage] || parfumData.nom.fr;

        const parfumOption = document.createElement('div');
        parfumOption.classList.add('parfum-option');

        const parfumLabel = document.createElement('label');
        parfumLabel.textContent = parfumNom;
        parfumLabel.classList.add('parfum-label');

        const parfumImage = document.createElement('img');
        parfumImage.src = parfumData.image;
        parfumImage.alt = parfumNom;
        parfumImage.classList.add('parfum-image');

        const parfumInput = document.createElement('input');
        parfumInput.type = 'number';
        parfumInput.min = '0';
        parfumInput.value = '0';
        parfumInput.dataset.parfum = parfum;
        parfumInput.classList.add('parfum-input', 'parfum-quantity-input');

        const parfumQuantityContainer = document.createElement('div');
        parfumQuantityContainer.classList.add('parfum-quantity-container');
        parfumQuantityContainer.appendChild(parfumInput);

        parfumOption.appendChild(parfumLabel);
        parfumOption.appendChild(parfumImage);
        parfumOption.appendChild(parfumQuantityContainer);
        parfumsContainer.appendChild(parfumOption);
    }

    parfumsContainer.dataset.capacite = capacite;
}

function fermerListeParfums() {
    const parfumsContainer = document.getElementById('parfumsContainer');
    parfumsContainer.innerHTML = '';
    document.getElementById('messageErreur').textContent = '';
}

function verifierQuantiteMax(capacite) {
    const currentLanguage = localStorage.getItem('language') || 'fr';
    
    const parfumsContainer = document.getElementById('parfumsContainer');
    const parfumInputs = parfumsContainer.querySelectorAll('.parfum-quantity-input');
    let quantiteTotale = 0;

    parfumInputs.forEach(input => {
        quantiteTotale += parseInt(input.value) || 0;
    });

    const messages = {
        'en': `You have exceeded the capacity of ${capacite} macarons maximum.`,
        'fr': `Vous avez dépassé la capacité du format de : ${capacite} macarons maximum.`
    };

    const errorMessageElement = document.getElementById('messageErreur');
    if (quantiteTotale > capacite) {
        errorMessageElement.textContent = messages[currentLanguage];
        return false;
    } else {
        errorMessageElement.textContent = '';
        return true;
    }
}

function validerBoite() {
    const currentLanguage = localStorage.getItem('language') || 'fr';

    const parfumsContainer = document.getElementById('parfumsContainer');
    const capacite = parseInt(parfumsContainer.dataset.capacite);
    const parfumInputs = parfumsContainer.querySelectorAll('.parfum-quantity-input');
    let quantiteTotale = 0;
    const parfumsSelectionnes = [];

    const messages = {
        'en': {
            'selectAtLeastOne': 'Please select at least one format.',
            'quantityMismatch': `The total quantity of macarons must match the box capacity of : ${capacite} macarons.`
        },
        'fr': {
            'selectAtLeastOne': 'Veuillez sélectionner au moins un format.',
            'quantityMismatch': `La quantité totale de macarons doit correspondre à la capacité du format de : ${capacite} macarons.`
        }
    };

    parfumInputs.forEach(input => {
        const quantite = parseInt(input.value);
        if (quantite > 0) {
            quantiteTotale += quantite;
            parfumsSelectionnes.push({
                nom: parfumsDisponibles[input.dataset.parfum].nom,
                quantite: quantite,
                prix: parfumsDisponibles[input.dataset.parfum].prix
            });
        }
    });

    if (quantiteTotale === 0) {
        document.getElementById('messageErreur').textContent = messages[currentLanguage].selectAtLeastOne;
        return;
    }

    if (quantiteTotale !== capacite) {
        document.getElementById('messageErreur').textContent = messages[currentLanguage].quantityMismatch;
        return;
    }

    let type = '';
    const boiteSelect = document.getElementById('boiteSelect');
    if (boiteSelect) {
        const selectedOption = boiteSelect.options[boiteSelect.selectedIndex];
        if (selectedOption) {
            type = selectedOption.dataset.type;
        }
    }

    commandes.push({
        capacite: capacite,
        type: type,
        parfums: parfumsSelectionnes
    });

    afficherRecapitulatif();
    fermerListeParfums();

    if (boiteSelect) {
        boiteSelect.selectedIndex = 0;
    }
}

function resetForm() {
    document.getElementById('boiteSelect').selectedIndex = 0;
    fermerListeParfums();
    document.getElementById('commandeForm').reset();
}

function afficherRecapitulatif() {
    const currentLanguage = getLanguage();
    const labels = {
        en: { typeLabels: { coffret: 'BOX', boite: 'SET', pyramide: 'PYRAMID', sachet: 'SET' }, deleteButton: 'DELETE' },
        fr: { typeLabels: { coffret: 'COFFRET', boite: 'BOÎTE', pyramide: 'PYRAMIDE', sachet: 'SACHET' }, deleteButton: 'SUPPRIMER' }
    };

    const commandesRecap = document.getElementById('commandesRecap');
    commandesRecap.innerHTML = '';

    commandes.forEach((commande, index) => {
        const boiteDiv = document.createElement('div');
        boiteDiv.classList.add('commandes-recap');

        const boiteTitre = document.createElement('h3');
        const typeLabel = labels[currentLanguage].typeLabels[commande.type] || '';
        boiteTitre.textContent = `${typeLabel} ${commande.capacite} MACARONS`;
        boiteDiv.appendChild(boiteTitre);

        const ul = document.createElement('ul');
        commande.parfums.forEach(parfum => {
            const li = document.createElement('li');
            li.textContent = `${parfum.nom[currentLanguage] || parfum.nom.fr} : ${parfum.quantite}`;
            ul.appendChild(li);
        });

        boiteDiv.appendChild(ul);

        const supprimerButton = document.createElement('button');
        supprimerButton.textContent = labels[currentLanguage].deleteButton;
        supprimerButton.classList.add('button');
        supprimerButton.addEventListener('click', function() {
            supprimerBoite(index);
        });
        boiteDiv.appendChild(supprimerButton);

        commandesRecap.appendChild(boiteDiv);
    });

    afficherTotal();
}

function supprimerBoite(index) {
    commandes.splice(index, 1);
    afficherRecapitulatif();
}

function afficherTotal() {
    const totalDiv = document.getElementById('total');
    totalDiv.innerHTML = '';

    let totalPrix = 0;

    commandes.forEach(commande => {
        let prixTotalMacarons = 0;

        // Calcul du prix total pour les parfums
        commande.parfums.forEach(parfum => {
            prixTotalMacarons += parfum.quantite * parfum.prix;
        });

        // Ajouter le prix total des macarons au total général
        totalPrix += prixTotalMacarons;

        // Ajouter le surcoût pour les coffrets
        if (commande.type === 'coffret') {
            let surcout = 0;
            switch (commande.capacite) {
                case 7:
                    surcout = 4.50;
                    break;
                case 12:
                case 16:
                case 20:
                    surcout = 5.00;
                    break;
                default:
                    break;
            }
            totalPrix += surcout; // Ajout du surcoût au total
        }
    });

    totalDiv.textContent = `Total : ${totalPrix.toFixed(2)} €`; // Affichage du total formaté
}



function initDateTimeSelectors() {
    const dateSelect = document.getElementById('dateSelect');

    if (!dateSelect) {
        console.error("Element with ID 'dateSelect' not found.");
        return;
    }

    flatpickr(dateSelect, {
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: "today",
        disable: [
            function(date) {
                return (date.getDay() === 0 || date.getDay() === 1);
            }
        ],
        locale: {
            firstDayOfWeek: 2,
            ...flatpickr.l10ns.fr
        },
        onChange: function(selectedDates, dateStr, instance) {
            validateTime();
            const selectedDate = selectedDates[0];
            const currentDate = new Date();

            if (selectedDate.getDate() === currentDate.getDate() &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.getFullYear() === currentDate.getFullYear()) {
                updateAvailableTimes();
            } else {
                resetTimeOptions();
            }
        }
    });

    dateSelect.addEventListener('change', function() {
        validateTime();
    });
}

function updateAvailableTimes() {
    const timeSelect = document.getElementById('timeSelect');
    const currentTime = new Date();
    const selectedDate = flatpickr.parseDate(document.getElementById('dateSelect').value, "Y-m-d");
    const options = timeSelect.querySelectorAll('option');

    options.forEach(option => {
        const time = option.value.split(':');
        const optionTime = new Date(selectedDate);
        optionTime.setHours(time[0]);
        optionTime.setMinutes(time[1]);

        if (selectedDate.toDateString() === currentTime.toDateString() && optionTime <= currentTime) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });
}

function resetTimeOptions() {
    const timeSelect = document.getElementById('timeSelect');
    const options = timeSelect.querySelectorAll('option');

    options.forEach(option => {
        option.disabled = false;
    });
}

function validateTime() {
    const currentLanguage = localStorage.getItem('language') || 'fr';

    const errorMessages = {
        'en': 'Please select a time.',
        'fr': 'Veuillez sélectionner une heure.'
    };

    const timeSelect = document.getElementById('timeSelect');
    const timeError = document.getElementById('timeError');

    if (timeSelect.value === '') {
        timeError.textContent = errorMessages[currentLanguage];
    } else {
        timeError.textContent = '';
    }
}

function initPaymentSelector() {
    const paymentOptions = document.querySelectorAll('input[name="paymentOption"]');

    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            document.getElementById('paymentError').textContent = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("b4afb2QjaaFwEpzUPoUVG");

    const userID = 'YNJtomeDJHjY8e-9V';
    const serviceID = 'commander';
    const templateID = 'ncjzncbzepci';

    const stripe = Stripe('pk_test_51Q1QuB00T9b7SysatnXwDYJq27olZwF7cNZeTSVBi6NacrPhKG0ieNJULR4tmIn84MCD8cbIEFP0tzFdXbpT0MyO00H0hHnmzl');

    function validerCommande() {
        const currentLanguage = localStorage.getItem('language') || 'fr';
        const errorMessages = {
            'en': {
                'dateError': 'Please select a date.',
                'timeError': 'Cannot choose a past time today.',
                'paymentError': 'Please select a payment option.',
                'nomError': 'Please enter your last name.',
                'prenomError': 'Please enter your first name.',
                'emailError': 'Please enter a valid email address.',
                'telError': 'Please enter a valid phone number.',
                'confidentialiteError': 'You must accept the privacy policy.'
            },
            'fr': {
                'dateError': 'Veuillez sélectionner une date.',
                'timeError': 'Impossible de choisir un horaire passé aujourd\'hui.',
                'paymentError': 'Veuillez sélectionner une option de paiement.',
                'nomError': 'Veuillez entrer votre nom.',
                'prenomError': 'Veuillez entrer votre prénom.',
                'emailError': 'Veuillez entrer une adresse e-mail valide.',
                'telError': 'Veuillez entrer un numéro de téléphone valide.',
                'confidentialiteError': 'Vous devez accepter la politique de confidentialité.'
            }
        };

        const dateSelect = document.getElementById('dateSelect');
        const timeSelect = document.getElementById('timeSelect');
        const paymentOptions = document.querySelectorAll('input[name="paymentOption"]');
        const selectedPaymentOption = Array.from(paymentOptions).find(option => option.checked);

        const nomInput = document.getElementById('nom');
        const prenomInput = document.getElementById('prenom');
        const emailInput = document.getElementById('email');
        const telInput = document.getElementById('telephone');
        const confidentialiteCheckbox = document.getElementById('confidentialite');

        let isValid = true;

        // Validation des champs
        if (!dateSelect.value.trim()) {
            document.getElementById('dateError').textContent = errorMessages[currentLanguage].dateError;
            isValid = false;
        } else {
            document.getElementById('dateError').textContent = '';
            const selectedDate = new Date(dateSelect.value);
            const currentDate = new Date();
            const selectedTime = timeSelect.value.split(':');
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();

            if (selectedDate.toDateString() === currentDate.toDateString() && selectedTime.length === 2) {
                const selectedHour = parseInt(selectedTime[0], 10);
                const selectedMinute = parseInt(selectedTime[1], 10);

                if (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute < currentMinute)) {
                    document.getElementById('timeError').textContent = errorMessages[currentLanguage].timeError;
                    isValid = false;
                } else {
                    document.getElementById('timeError').textContent = '';
                }
            }
        }

        // Validation des autres champs
        if (!selectedPaymentOption) {
            document.getElementById('paymentError').textContent = errorMessages[currentLanguage].paymentError;
            isValid = false;
        } else {
            document.getElementById('paymentError').textContent = '';
        }

        if (!nomInput.value.trim()) {
            document.getElementById('nomError').textContent = errorMessages[currentLanguage].nomError;
            isValid = false;
        } else {
            document.getElementById('nomError').textContent = '';
        }

        if (!prenomInput.value.trim()) {
            document.getElementById('prenomError').textContent = errorMessages[currentLanguage].prenomError;
            isValid = false;
        } else {
            document.getElementById('prenomError').textContent = '';
        }

        if (!validateEmail(emailInput.value.trim())) {
            document.getElementById('emailError').textContent = errorMessages[currentLanguage].emailError;
            isValid = false;
        } else {
            document.getElementById('emailError').textContent = '';
        }

        if (!validatePhoneNumber(telInput.value.trim())) {
            document.getElementById('telError').textContent = errorMessages[currentLanguage].telError;
            isValid = false;
        } else {
            document.getElementById('telError').textContent = '';
        }

        if (!confidentialiteCheckbox.checked) {
            document.getElementById('confidentialiteError').textContent = errorMessages[currentLanguage].confidentialiteError;
            isValid = false;
        } else {
            document.getElementById('confidentialiteError').textContent = '';
        }

        // Si tout est valide, procéder à l'envoi
        if (isValid) {
            const totalElement = document.getElementById('total');
            const totalText = totalElement.textContent;
            const totalMatch = totalText.match(/Total : (\d+(\.\d{1,2})?)\s?€/);

            let total = 0;
            if (totalMatch) {
                total = parseFloat(totalMatch[1]) * 100; // Convertir en cents
            }

            if (total <= 0) {
                showMessage('Le montant total doit être supérieur à zéro.');
                return;
            }

            // Créer une session Stripe et rediriger
            fetch('http://localhost:3000/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ total }), // Envoyer le total uniquement
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de la requête réseau');
                }
                return response.json();
            })
            .then(data => {
                // Rediriger vers la page de paiement Stripe
                return stripe.redirectToCheckout({ sessionId: data.id });
            })
            .then(result => {
                if (result.error) {
                    console.error(result.error.message);
                } else {
                    // Envoyer l'email uniquement à toi
                    const templateParams = {
                        from_name: `${prenom} ${nom}`,
                        to_name: 'contact@lesmacaronshottekiet.fr', // Remplace par ton adresse e-mail
                        subject: currentLanguage === 'fr' ? 'Confirmation de votre commande' : 'Order Confirmation',
                        message: currentLanguage === 'fr'
                            ? `Bonjour ${prenom} ${nom},\n\nMerci pour votre commande !`
                            : `Dear ${prenom} ${nom},\n\nThank you for your order!`
                    };

                    return emailjs.send(serviceID, templateID, templateParams, userID);
                }
            })
            .then((response) => {
                console.log('Email envoyé avec succès !', response);
                showMessage(currentLanguage === 'fr' ? 'Votre commande a été envoyée avec succès.' : 'Your order has been sent successfully.');

                // Rediriger vers la page de remerciement
                setTimeout(() => {
                    window.location.href = 'https://lesmacaronshottekiet.fr/pages-ext/merci.html';
                }, 3000);
            })
            .catch(error => {
                console.error('Erreur:', error);
                showMessage('Une erreur s\'est produite. Veuillez réessayer.');
            });
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhoneNumber(phone) {
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        return phoneRegex.test(phone);
    }

    function resetForm() {
        const form = document.getElementById('commandeForm');
        if (form) {
            form.reset();
        }
        document.getElementById('dateError').textContent = '';
        document.getElementById('timeError').textContent = '';
        document.getElementById('paymentError').textContent = '';
        document.getElementById('nomError').textContent = '';
        document.getElementById('prenomError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('telError').textContent = '';
        document.getElementById('confidentialiteError').textContent = '';
    }

    function showMessage(message) {
        const messageContainer = document.getElementById('messageContainer');
        if (messageContainer) {
            messageContainer.textContent = message;
            messageContainer.style.display = 'block';
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 10000);
        } else {
            console.error('Message container element not found');
        }
    }

    const submitButton = document.getElementById('submitCommande');
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault();
            validerCommande();
        });
    }
});
