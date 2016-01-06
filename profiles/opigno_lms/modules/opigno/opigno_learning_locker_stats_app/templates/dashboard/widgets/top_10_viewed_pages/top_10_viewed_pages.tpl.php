<?php
/**
 * @file
 * Opigno Learning Locker stats - Dashboard - Top 10 viewed page template file
 *
 * @param array $top_10_viewed_pages
 */
?>
<div class="learning-locker-stats-widget col col-3-out-of-6" id="learning-locker-stats-widget-dashboard-top-10-most-viewed-pages">
  <h2><?php print t('Top 10 most viewed pages'); ?></h2>
  <?php print theme('opigno_learning_locker_stats_dashboard_widget_top_10_viewed_pages_list', compact('top_10_viewed_pages')); ?>
</div>