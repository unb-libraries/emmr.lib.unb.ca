<?php

namespace Drupal\emmr_core\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Checks that the submitted value is a unique integer.
 *
 * @Constraint(
 *   id = "AnnoSafe",
 *   label = @Translation("Safe EMMR Annotation Text", context = "Validation"),
 *   type = "string"
 * )
 */
class AnnoSafe extends Constraint {

  // The message that will be shown if the value contains unsafe characters.
  public $notSafe =
    'Annotation text cannot contain the following characters: /, <, >.';

}
