<?php

/**
 * Implements hook_form().
 */
function stanley_theme() {
  $items = array();

  $items['form_two_col'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'stanley') . '/templates',
    'template' => 'form-two-col',
    'preprocess functions' => array(
      'stanley_preprocess_form_two_col',
    ),
  );

  return $items;
}

/**
 * Implements hook_css_alter().
 */
function stanley_css_alter(&$css) {
  if (isset($css['modules/overlay/overlay-child.css'])) {
    $css['modules/overlay/overlay-child.css']['data'] = drupal_get_path('theme', 'stanley') . '/styles/overlay-child.css';
    $css['modules/overlay/overlay-child.css']['group'] = CSS_THEME;
    $css['modules/overlay/overlay-child.css']['media'] = 'screen';
  }

  if (isset($css['misc/ui/jquery.ui.theme.css'])) {
    $css['misc/ui/jquery.ui.theme.css']['data'] = drupal_get_path('theme', 'stanley') . '/styles/jquery.ui.theme.css';
    $css['misc/ui/jquery.ui.theme.css']['weight']++;
  }

  //unset date_popup date picker css, core already has a theme
  unset($css['sites/all/modules/contrib/date/date_popup/themes/datepicker.1.7.css']);

  // unset core css
  unset($css['modules/dblog/dblog.css']);
  unset($css['modules/menu/menu.css']);
  unset($css['modules/system/system.menus.css']);
  unset($css['modules/system/system.messages.css']);
  unset($css['modules/system/system.theme.css']);
}

/**
 * Implements hook_page_alter().
 */
function stanley_page_alter(&$page) {
  $original_css = drupal_add_css();
  $css_options = array(
    'group' => CSS_THEME,
    'media' => 'screen',
    'every_page' => TRUE,
  );

  // add toolbar css
  if (module_exists('toolbar') && user_access('access toolbar')) {
    drupal_add_css(drupal_get_path('theme', 'stanley') . '/styles/modules/core.toolbar.css', $css_options);
  }

  // add admin toolbar css
  if (module_exists('admin') && user_access('use admin toolbar')) {
    drupal_add_css(drupal_get_path('theme', 'stanley') . '/styles/modules/contrib.admin.toolbar.css', $css_options);
  }

  foreach (_stanley_additional_css() as $css) {
    if (isset($original_css[$css['original']])) {
      drupal_add_css($css['addition'], $css_options);
    }
  }
}

/**
 * Helper function listing additional css to be included based on the available css
 */
function _stanley_additional_css() {
  $css = array();
  $default_path = drupal_get_path('theme', 'stanley') . '/styles/modules/';

  $css[] = array(
    'original' => drupal_get_path('module', 'field_group') . '/horizontal-tabs/horizontal-tabs.css',
    'addition' => $default_path . 'contrib.fieldgroup.css',
  );

  $css[] = array(
    'original' => drupal_get_path('module', 'views') . '/css/views.css',
    'addition' => $default_path . 'contrib.views.css',
  );

  return $css;
}

/**
 * Implementation of hook_preprocess_html().
 */
function stanley_preprocess_html(&$vars) {
  // Add body class for theme.
  $vars['classes_array'][] = 'stanley';

  // HTML5 shiv -> http://code.google.com/p/html5shiv/
  $vars['shiv'] = '<!--[if lt IE 9]>' . "\n" . '<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>' . "\n" . '<![endif]-->';

  // Don't assume RDFa is enabled and don't use XHTML if it is
  if (module_exists('rdf')) {
    $vars['doctype'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML+RDFa 1.1//EN">' . "\n";
    $vars['rdf_version'] = ' version="HTML+RDFa 1.1"';
    $vars['rdf_profile'] = ' profile="' . $vars['grddl_profile'] . '"';
  }
  else {
    $vars['doctype'] = '<!DOCTYPE html>' . "\n";
    $vars['rdf_version'] = '';
    $vars['rdf_profile'] = '';
  }
}

/**
 * Preprocessor for theme('page').
 */
function stanley_preprocess_page(&$vars) {
  // Toolbar is enabled
  $vars['toolbar'] = module_exists('toolbar');

  // local tasks
  $vars['primary_local_tasks'] = $vars['secondary_local_tasks'] = FALSE;
  if (!empty($vars['tabs']['#primary'])) {
    $vars['primary_local_tasks'] = $vars['tabs'];
    unset($vars['primary_local_tasks']['#secondary']);
  }
  if (!empty($vars['tabs']['#secondary'])) {
    $vars['secondary_local_tasks'] = array(
      '#theme' => 'menu_local_tasks',
      '#secondary' => $vars['tabs']['#secondary'],
    );
  }

  // Set a page icon class.
  $vars['page_icon_class'] = ($item = menu_get_item()) ? implode(' ' , _stanley_icon_classes($item['href'])) : '';

  // Overlay is enabled.
  $vars['overlay'] = (module_exists('overlay') && overlay_get_mode() === 'child');

  if ($vars['overlay']) {
    $vars['theme_hook_suggestions'][] = 'page__overlay';
    $vars['primary_local_tasks'] = menu_primary_local_tasks();
  }
}

/**
 * Implementation of theme_breadcrumb().
 */
function stanley_breadcrumb($vars) {
  //add divider
  foreach ($vars['breadcrumb'] as $key => $link) {
    $vars['breadcrumb'][$key] = $link . ' <span class="divider">/</span>';
  }

  // Add current page onto the end.
  if (!drupal_is_front_page()) {
    $item = menu_get_item();
    $end = end($vars['breadcrumb']);
    if ($end && strip_tags($end) !== $item['title']) {
      $vars['breadcrumb'][] = check_plain($item['title']);
    }
  }

  return theme('item_list', array('items' => $vars['breadcrumb'], 'attributes' => array('class' => array('breadcrumb'))));
}

/**
 * Implements theme_fieldset().
 */
function stanley_fieldset($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id'));
  _form_set_class($element, array('form-wrapper'));

  if (!isset($element['#title']) && !in_array('fieldset-no-legend', $element['#attributes']['class'])) {
    $element['#attributes']['class'][] = 'fieldset-no-legend';
  }

  $output = '<fieldset' . drupal_attributes($element['#attributes']) . '>';
  if (!empty($element['#title'])) {
    // Always wrap fieldset legends in a SPAN for CSS positioning.
    $output .= '<legend><span class="fieldset-legend">' . $element['#title'] . '</span></legend>';
  }
  $output .= '<div class="fieldset-wrapper">';
  if (!empty($element['#description'])) {
    $output .= '<div class="fieldset-description">' . $element['#description'] . '</div>';
  }
  $output .= $element['#children'];
  if (isset($element['#value'])) {
    $output .= $element['#value'];
  }
  $output .= '</div>';
  $output .= "</fieldset>\n";
  return $output;
}

/**
 * Generate an icon class from a path.
 */
function _stanley_icon_classes($path) {
  $classes = array();
  $args = explode('/', $path);
  if ($args[0] === 'admin' || (count($args) > 1 && $args[0] === 'node' && $args[1] === 'add')) {
    // Add a class specifically for the current path that allows non-cascading
    // style targeting.
    $classes[] = 'path-icon-'. str_replace('/', '-', implode('/', $args)) . '-active';
    while (count($args)) {
      $classes[] = 'path-icon-'. str_replace('/', '-', implode('/', $args));
      array_pop($args);
    }
    return $classes;
  }
  return array();
}

/**
 * Preprocess two col forms
 */
function stanley_preprocess_form_two_col(&$vars) {
  $vars['sidebar'] = isset($vars['sidebar']) ? $vars['sidebar'] : array();

  if (isset($vars['form']['#node_edit_form']) && $vars['form']['#node_edit_form']) {
    stanley_preprocess_node_form($vars);
  }
}

/**
 * Implements hook_form_node_form_alter();
 */
function stanley_form_node_form_alter(&$form, &$form_state) {
  $form['#theme'][] = 'form_two_col';
}

/**
 * Preprocess node form
 * Move the additional settings vertical tabs to the sidebar
 */
function stanley_preprocess_node_form(&$vars) {
  $vars['sidebar']['additional_settings'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array('additional-settings-container fieldsets-group'),
    ),
  );

  foreach (element_children($vars['form']) as $key) {
    $element = $vars['form'][$key];
    if (isset($element['#group']) && $element['#group'] == 'additional_settings') {
      // unset group property other wise the javascript
      // removes the elemnt from the page
      unset($element['#group']);
      $vars['sidebar']['additional_settings'][$key] = $element;
      unset($vars['form'][$key]);
    }
  }

  // Field group support
  // This moves all fieldgroup tabs without a parent to the sidebar
  // Field group would automatically move these to additional settings
  if (isset($vars['form']['#fieldgroups'])) {
    foreach($vars['form']['#fieldgroups'] as $group_name => $group) {
      if ($group->format_type == 'tab' && empty($group->parent_name)) {
        $vars['sidebar']['additional_settings'][$group_name] = $vars['form']['additional_settings']['group']['#groups']['additional_settings'][$group_name];
      }
    }
  }

  // remove vertical tabs group
  unset($vars['form']['additional_settings']);
}
