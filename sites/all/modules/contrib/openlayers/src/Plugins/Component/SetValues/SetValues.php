<?php
/**
 * @file
 * Component: SetValues.
 */

namespace Drupal\openlayers\Plugins\Component\SetValues;
use Drupal\Component\Annotation\Plugin;
use Drupal\openlayers\Types\Component;

/**
 * Class SetValues.
 *
 * @Plugin(
 *  id = "SetValues"
 * )
 */
class SetValues extends Component {
  /**
   * {@inheritdoc}
   */
  public function optionsForm(&$form, &$form_state) {
    $form['options']['latitude'] = array(
      '#type' => 'textfield',
      '#title' => t('Latitude'),
      '#default_value' => $this->getOption('latitude'),
    );
    $form['options']['longitude'] = array(
      '#type' => 'textfield',
      '#title' => t('Longitude'),
      '#default_value' => $this->getOption('longitude'),
    );
    $form['options']['rotation'] = array(
      '#type' => 'textfield',
      '#title' => t('Rotation'),
      '#default_value' => $this->getOption('rotation'),
    );
    $form['options']['zoom'] = array(
      '#type' => 'textfield',
      '#title' => t('Zoom'),
      '#default_value' => $this->getOption('zoom'),
    );
    $form['options']['extent'] = array(
      '#type' => 'textfield',
      '#title' => t('Extent'),
      '#default_value' => $this->getOption('extent'),
    );
  }

}
