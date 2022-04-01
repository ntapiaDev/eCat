<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/normalize.css">
    <link rel="stylesheet" href="./assets/css/style.css">
    <script src="https://kit.fontawesome.com/015d178d74.js" crossorigin="anonymous"></script>
    <title>eCat</title>
</head>
<body>
    <header>
        <div class="header__info">
            <div class="header__info__container">
                <ul>
                    <li><i class="fa-solid fa-phone"></i> 02.35.06.66.00</li>
                    <li><i class="fa-solid fa-envelope"></i> mon.adresse@google.fr</li>
                    <li><i class="fa-solid fa-location-dot"></i> 12 rue des Sapins, 76100 ROUEN</li>
                </ul>
                <div class="header__info__lang">
                    <a href="<?=$_SERVER['PHP_SELF']?>?<?=$id?>lang=fr"><img src="./assets/img/fr.png" alt=""></a>
                    <a href="<?=$_SERVER['PHP_SELF']?>?<?=$id?>lang=en"><img src="./assets/img/en.png" alt=""></a>
                </div>
            </div>
        </div>
        <div class="header__logo">
            <div class="header__logo__container">
                 <div class="logo">
                    <img src="./assets/img/logo.png" alt="">
                </div>
                <p class="header__logo__name">
                    <?php if ($langage === "fr"): ?>
                        eCat - La location de chats pour tous
                    <?php else: ?>
                        eCat - Cats renting for everyone
                    <?php endif ?>
                </p>
            </div>
           
            <nav>
                <ul>
                    <li><a href="index.php<?=$lang?>"><?=$home?></a></li>
                    <li><a href="cart.php<?=$lang?>"><?=$cart?></a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main">