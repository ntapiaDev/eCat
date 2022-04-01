<?php
require_once('langage.php');
require_once('header.php');
?>
        <div class="main__banner">
            <img src="./assets/img/background.png" alt="">
        </div>
        <section class="main__cats">
            <h1><?=$title?></h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae odit tempora cum! Quis delectus, nesciunt saepe dolorum a quasi adipisci doloribus aut incidunt debitis! At alias molestias distinctio consequuntur voluptates mollitia modi veniam in itaque ipsa eaque, exercitationem impedit perferendis explicabo quo eveniet esse fuga beatae illo repellat, aspernatur suscipit.</p>
            
            <div class="main__cats__container">
                <!-- Template de chaque chat -->
                <template id="main__cat">
                    <div class="main__cat">
                        <a href="">
                            <img src="" alt="" class="main__cat__img">
                            <h2 class="main__cat__name"></h2>
                            <p><strong><?=$race?></strong> <span class="main__cat__race"></span></p>
                            <p><strong><?=$color?></strong> <span class="main__cat__color"></span></p>
                            <p><strong><?=$age?></strong> <span class="main__cat__age"></span></p>
                        </a>
                    </div>
                </template>
            </div>
        </section>
<?php
require_once('footer.php');