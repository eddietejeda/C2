var DetailsRequestCard;

DetailsRequestCard = (function(){
  function DetailsRequestCard(el) {
    this.el = $(el);
    this._setup();
    this.data = {
      buttonText: "Modify",
      gridLayout: "two-column"
    }
    return this;
  }
  
  DetailsRequestCard.prototype._setup = function(){
    this._events();
  }

  DetailsRequestCard.prototype._events = function(){
    var self = this;    
    
    this.el.find("input, textarea, select, radio").on("change keyup", function(e){
      var el = this;
      switch(el.nodeName){
        case "TEXTAREA":
          $(el).text(el.value);
          break;
        case "INPUT":
          switch(el.type){
            case "radio":
              $(el).attr('checked', 'true');
              break;
            case "checkbox":
              if (el.checked === true){
                $(el).attr('checked', 'false');
              } else {
                $(el).attr('checked', 'true');
              }
              break;
          }
          break;
        default:
          break;
      }
      self.fieldChanged(e, el);
    });

    this.el.find('.edit-toggle').on('click', function(e){
      e.preventDefault();
      self.el.trigger('edit-toggle:trigger');
    });
  }

  DetailsRequestCard.prototype.toggleMode = function(mode){
    switch (mode){
      case 'view':
        this.data.buttonText = "Modify";
        this.data.gridLayout = "two-column";
        this.scrollUp();
        break;
      case 'edit':
        this.data.buttonText = "Cancel";
        this.data.gridLayout = "one-column";
        break;
    }
    this.updateCard();
  }

  DetailsRequestCard.prototype.updateButton = function(){
    text = this.data.buttonText;
    this.toggleButtonText(text);
  }

  DetailsRequestCard.prototype.updateGrid = function(){
    var klass = "grid-layout small-up-1 ";
    switch (this.data.gridLayout) {
      case "one-column":
          klass = klass + "medium-up-1";
        break;
      case "two-column":
          klass = klass + "medium-up-2";
        break;
    }
    this.el.find('.grid-layout').attr('class', klass);
  }

  DetailsRequestCard.prototype.updateCard = function(){
    console.log(this.data);
    this.updateGrid();
    this.updateButton();
  }

  DetailsRequestCard.prototype.toggleButtonText = function(text){
    this.el.find('.edit-toggle span').text(text)
  }


  DetailsRequestCard.prototype.updateTextFields = function(field, value){
    $(field).html(value);
  }
  
  DetailsRequestCard.prototype.updateCheckbox = function(field, value){
    $(field)[0].checked = value;
  }

  DetailsRequestCard.prototype.updateViewModeContent = function(data){
    console.log(data);
    var viewEl = this.el.find('#view-request-details')
    var content = data['response'];
    var id = content['id'];
    var self = this;
    delete content['id'];
    console.log('Entire size: ', content);
    $.each(content, function(key, value){
      console.log('Running for ', key);
      var field = '#' + key + '-' + id;
      if(key === "direct_pay"){
        self.updateCheckbox(field + ' input[type="checkbox"]', value);
      } else if(key === "not_to_exceed") {
        if (value === true){
          value = "Not to exceed";
        } else {
          value = "Exact";
        }
        self.updateTextFields(field + ".detail-value", value);
      } else if(key === "amount") {
        self.updateTextFields(field + ".detail-value", value);
      } else if( !(value === null) ) {
        self.updateTextFields(field + " .detail-display .detail-value", value);
      }
    });
    console.log('Finished the looping');
    this.el.trigger("form:updated");
  }

  DetailsRequestCard.prototype.setMode = function(type){
    if (type === "view"){
      this.el.removeClass('edit-fields');
      this.el.addClass('view-fields');
    } else if (type === "edit") {
      this.el.removeClass('view-fields');
      this.el.addClass('edit-fields');
    }
  }

  DetailsRequestCard.prototype.scrollUp = function(){
    console.log('scrollUp');
    var self = this;
    $('html, body').animate({
      scrollTop:  self.el.offset().top
    });
  }

  DetailsRequestCard.prototype.fieldChanged = function(e, el){
    this.el.trigger("form:changed"); 
  }

  return DetailsRequestCard;

}());

window.DetailsRequestCard = DetailsRequestCard;
