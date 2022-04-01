<?php
require_once('langage.php');
require_once('header.php');
?>
        <section class="main__cart">
            <h1 class="main__cart__title"><?=$sweeties?></h1>
            <p class="main__cart__price"><?=$empty?></p>
            <!-- Template affichage du prix -->
            <template id="price">
                <span class="underline">Prix total :</span><span class="price"></span>
            </template>
            <!-- Template affichage de la quantité -->
            <template id="quantity">
                <p><span class="underline">Quantité :</span> <span class="main__cart__cat__quant"></span> (<span class="add">ajouter</span> - <span class="remove">retirer</span>)</p>
            </template>
            <!-- Template vaccin & puces -->
            <template id="vac-puc">
                <p><span class="underline">Vaccination :</span> <span class="vaccination-statut"></span> <span class="underline">Traitement anti-puces :</span> <span class="puces-statut"></span></p>
            </template>
            <div class="main__cart__content"></div>

            <!-- Formulaire de contact -->
            <form action="#" class="main__cart__form">
                <label for="name"><span>Votre nom</span><span class="label-name"></span></label>
                <input type="text" name="name" id="name" required>
                <label for="email"><span>Votre adresse email</span><span class="label-email"></span></label>
                <input type="email" name="email" id="email" required>
                <label for="message"><span>Votre message</span><span class="label-message"></span></label>
                <textarea name="message" id="message"></textarea>
                <input type="submit" value="Commander mon chat !" class="main__cart__form__submit">
            </form>
        </section>
<?php
require_once('footer.php');