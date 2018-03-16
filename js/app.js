(function() {
  var $dc;
  var type = 'default';
  var $dc = $(document);
  var local_storage_apps;
  var $btnByType = {
  };
  var $checkIcon = $('<i class="icon-check"></i>');
  $dc.ready(function() {
    type = APPS.settings.find(function(settingsObj) {
      if (settingsObj.name === 'r_labelstyle_labelstyle') {
        return settingsObj.value;
      }
    });
    if (!type) {
      type = 'default';
    }
    init();
  });

  var init = function() {
      //var template = '   <li>  '  + 
    //'     <div class="btn-group navbar-btn js-labelstyle-list-dropdown dropdown">  '  + 
 //'       <button class="btn btn-default btn-sm js-board-labelstyle" type="button"><i class="icon-tag"></i></button>  '  + 
    //'       <button data-toggle="dropdown" class="btn btn-default btn-sm dropdown-toggle active js-board-labelstyle" type="button"> <span><i class="icon-caret-down cur"></i></span> <span class="sr-only">Toggle Dropdown</span> </button>  '  + 
    //'       <ul class="dropdown-menu arrow arrow-right col-xs-push-0">  '  + 
    //'         <li class="js-labelstyle-popup js-dropdown-popup dropdown-popup col-xs-12">  '  + 
    //'           <div class="clearfix text-center"><a class="js-back-to-board-labelstyle hide pull-left" href="#"><i class="icon-caret-left"></i></a><span class="col-xs-10"><strong>Change Labels style</strong></span><a class="js-close-popover pull-right" href="#"><i class="icon-remove"></i></a>  '  + 
    //'           </div>  '  + 
    //'         </li>  '  + 
    //'         <li class="col-xs-12 divider js-labelstyle-list"></li>  '  + 
    //'         <li class="col-xs-12 btn-block text-justify"><a href="#" name="private" class="  h6 js-set-labelstyle-default navbar-btn"> <span class="show text-primary navbar-btn h5"> Default  </span> </a> </li>  '  + 
    //'         <li class="col-xs-12 btn-block text-justify"> <a href="#" name="public" class=" h6 navbar-btn js-set-labelstyle-tags"><span class="show text-primary navbar-btn h5"> Tags  </span> </a> </li>  '  + 
    //'       </ul>  '  + 
    //'     </div>  '  + 
    //'  </li>  ' ;  
    //var $toolbar = $('.hdrpvtvws');
    //var $toolbarItem = $(template);
    //$btnByType['default'] = $toolbarItem.find('.js-set-labelstyle-default');
    //$btnByType['tags'] = $toolbarItem.find('js-set-labelstyle-tags');
    //$btnByType[type].addClass('btn-default').children('span').append($checkIcon);
    //$toolbar.prepend($toolbarItem);
    //$.each($btnByType, (btntype, $btn) => {
      //$btn.on('click', function() {
        //type = btntype;
        //Backbone.history.stop(); 
        //Backbone.history.start(); 
      //});
    //});

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
    Backbone.history.stop(); 
    Backbone.history.start(); 
  };
})();
