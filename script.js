let cardStack = [];
const CARD_OFFSET = 30; // Pixel overlap between cards

function createCard(imageSrc, isLoyalty) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.type = isLoyalty ? 'loyalty' : 'credit';
  
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    card.style.transform = `translateY(${cardStack.length * CARD_OFFSET}px)`;
    card.style.zIndex = cardStack.length + 1;
  };
  
  card.appendChild(img);
  cardStack.push(card);
  cardContainer.appendChild(card);

  // Click Handler
  card.addEventListener('click', () => {
    cardStack.forEach(c => {
      c.style.transform = c === card ? 
        'translateY(0) scale(1)' : 
        `translateY(-${CARD_OFFSET}px) scale(0.9)`;
      c.style.zIndex = c === card ? 1000 : 1;
    });
    
    card.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    document.querySelector('header').style.display = 'none';
    doneBtn.classList.add('visible');
  });
}

// Update image upload handler
function handleImageUpload(isLoyalty) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      createCard(reader.result, isLoyalty);
      // Auto-scroll to new card
      cardContainer.scrollTo({
        top: cardContainer.scrollHeight,
        behavior: 'smooth'
      });
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

