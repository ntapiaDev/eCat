<?php
require_once('./assets/php/langage.php');
require_once('./assets/php/header.php');
?>
        <section class="main__cat-info">
            <h1 class="main__cat-info__title"></h1>
            <img src="" alt="" class="main__cat-info__img">
            <div class="main__cat-info__info">
                <p>Ce petit chat <span class="color"></span> de <span class="age"></span> saura mettre de la vie dans votre foyer.</p>
                <p>Il s'agit d'un <span class="race"></span>.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente aspernatur laboriosam a inventore quia ratione repellat at dolor? Numquam omnis vitae molestiae animi aspernatur voluptates repudiandae qui, optio est maiores quaerat iste voluptatem? Dolorem repellat autem alias consectetur esse harum cum earum aliquid! Culpa eveniet non neque reiciendis sed minima!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus error expedita nisi dolore impedit porro voluptatem distinctio labore assumenda? Dicta minima ab nihil inventore officia recusandae tempora. Facere ea quis amet maxime molestias, et blanditiis architecto. Minus corrupti, quis nobis possimus adipisci laborum nulla sequi debitis, illo itaque architecto! Error.</p>
                <p class="price"></p>
                <form action="#" class="main__cat-info__form">
                    <label for="vaccin">Vaccination (+5€)</label>
                    <input type="checkbox" name="vaccin" id="vaccin">
                    <label for="puces">Traitement anti-puces (+10€)</label>
                    <input type="checkbox" name="puces" id="puces">
                    <input type="number" name="number" id="number" placeholder="Quantité désirée" min="1" class="main__cat-info__number">
                    <a href="cart.php<?=$lang?>"><input type="button" value="" class="main__cat-info__btn"></a>
                </form>
                <p class="main__cat-info__ready"></p>
            </div>
        </section>
<?php
require_once('./assets/php/footer.php');