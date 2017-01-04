/**
 * MC-PACK
 * @author SuYong
 * @version v0.1.0
 */
 
var MC = {};

MC.CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

MC.Widget = {};
MC.Widget.Button = function() {
  this.text = "";
  this.width = 0;
  this.height = 0;
  
  this.focus = false;
  this.isPressed = false;
  
  this.listener = {};
  this.listener.onClick = function(this);
  this.listener.onTouch = function(this, this.isPressed);
};

MC.Widget.Button.prototype = {
  setText: function(text) {
    this.text = text;
  
    return this;
  },
};


MC.Widget.ImageButton = function() {
  
};

MC.Widget.TextView = function() {
  
};

MC.Widget.Switch = function() {
  
};

MC.Widget.CheckBox = function() {
  
};

MC.Widget.RadioButton = function() {
  
};

MC.Widget.RadioGroup = function() {
  
};

MC.Font = function() {
  
};

MC.Font.prototype.Convert = function(text) {
  
};

MC.Image = function() {
  
};

MC.Util = {};
MC.Util.CacheManager = function() {
  
};