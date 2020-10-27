<?php

namespace Drupal\emmr_core\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Validates the AnnoSafe constraint.
 */
class AnnoSafeValidator extends ConstraintValidator {

  /**
   * {@inheritdoc}
   */
  public function validate($items, Constraint $constraint) {
    foreach ($items as $item) {
      // Check if the value contains forbiden characters.
      $value = $item->value;

      if (strpos($value, '/') !== FALSE
        or strpos($value, '<') !== FALSE
        or strpos($value, '>') !== FALSE) {
        // The value fails validation, so a violation, aka error, is applied.
        // The type of violation applied comes from the constraint description.
        $this->context->addViolation($constraint->notSafe, ['%value' => $value]);
      }
    }
  }

}
