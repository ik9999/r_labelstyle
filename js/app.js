(function() {
  var $dc;
  var type = 'default';
  var $dc = $(document);
  var local_storage_apps;
  var $btnByType = {
  };
  var $checkIcon = $('<i class="icon-check"></i>');

  var init = function() {
    var oldCardView = App.CardView;
    var newCardView = oldCardView.extend({
      template: function(opts) {
        var template = JST['templates/card'](opts);
        if (type === 'tags') {
          var $template = $('<div>' + template + '</div>');
          var $labelSection = $template.find('div[class*="js-card-label-section"]');
          if ($labelSection.length > 0) {
            var $labelList = $labelSection.children();
            if ($labelList.length > 0) {
              var $newLabelList = [];
              $labelList.each(function() {
                var text = $(this).find('[data-original-title]').data('original-title');
                var color = $(this).find('[style*="color"]').css('color');
                if (text && color) {
                  var $newLabel = $('<span></span>', {
                    title: text,
                    class: 'r_labelstyle-tagLabel'
                  }).html(text);
                  $newLabel.css('background-color', color);
                  $newLabelList.push($newLabel);
                }
              });
              if ($newLabelList.length > 0) {
                $labelSection.html('');
                $newLabelList.forEach(function($newLabel) {
                  $labelSection.append($newLabel);
                });
              }
            }
          }
          return $template.html();
        }
        return template;
      }
    });
    App.CardView = newCardView;
  };

  $dc.ready(function() {
    var settingsObj = APPS.settings.find(function(settingsObj) {
      if (settingsObj.name === 'r_labelstyle_labelstyle') {
        return settingsObj;
      }
    });
    if (settingsObj) {
      type = settingsObj.value;
    }
    init();
  });

})();
