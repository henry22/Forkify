import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`);
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};