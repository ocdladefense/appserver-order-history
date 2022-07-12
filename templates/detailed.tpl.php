<link rel="stylesheet" href="<?php print module_path(); ?>/assets/css/example.css">

<section>
    
    <a href="#" id="switchButton" data-action="list" class="hiddenButton" style="float:left;">
        <i id="switchButtonIcon" data-action="list" class="fas fa-arrow-left"></i>
    </a>

    <div id="order-history-main">
        <div class="example-list" id="example-list">
        </div>
    </div>


</section>



<script>const orderId = "<?php print $orderId; ?>"; </script>
<script type="module" src="<?php print module_path(); ?>/assets/js/dist/detailed.js"></script>