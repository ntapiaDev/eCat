<?php
if (isset($_GET['lang'])) {
    $langage = $_GET['lang'];
    $lang = '?lang=' . $langage;
} else {
    $langage = 'fr';
    $lang = '';
}

// Header
$home = $langage === 'fr' ? 'Accueil' : 'Home';
$cart = $langage === 'fr' ? 'Mon panier' : 'My cart';

// Index
$title = $langage === 'fr' ? 'Nos chats à adopter :' : 'Our cats for rent :';
$race = $langage === 'fr' ? 'Race :' : 'Race :';
$color = $langage === 'fr' ? 'Couleur :' : 'Color :';
$age = $langage === 'fr' ? 'Age :' : 'Age :';

// Cats
if (isset($_GET['id'])) {
    $id = 'id=' . $_GET['id'] . '&';
} else {
    $id = '';
}

// Cart
$sweeties = $langage === 'fr' ? 'Vos petits chouchous :' : 'Your little sweeties :';
$empty = $langage === 'fr' ? 'Votre panier est vide.' : 'Your cart is empty.';

// Footer
$contact = $langage === 'fr' ? 'Pour nous joindre : 0' : 'Contact us : (+33) ';
$rights = $langage === 'fr' ? 'Toute reproduction interdite' : 'All reproduction prohibited';