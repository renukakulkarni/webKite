(function ($) {
  Drupal.behaviors.mymodule = {
    attach: function (context, settings) {
      console.log(settings);
    }
  };
})(jQuery);
