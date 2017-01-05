/**
 * MC-PACK
 * @author SuYong
 * @version v0.1.0
 */

var MC = {};

MC.CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

MC.WIDTH = MC.CTX.getScreenWidth();
MC.HEIGHT = MC.CTX.getScreenHeight();

MC.Widget = {};
MC.Font = {};
MC.Util = {};

/**
 * @author SuYong
 * @description cut from N_GuiPE by 0isback http://cafe.naver.com/minecraftdev/6056
 */
MC.Image = {
 spritesheet: MC.Util.getImage("images/gui/spritesheet.png"),
 touchGUI: MC.Util.getImage("images/gui/touchgui.png"),
 touchGUI2: MC.Util.getImage("images/gui/touchgui2.png"),
 GUI: MC.Util.getImage("images/gui/gui.png"),

 getBitmap: function(original, x, y, width, height, nx, ny, nxx, nyy, func) {
   var bitmap = android.graphics.Bitmap.createBitmap(original, x, y, width, height);

   try {
     func();
   } catch(err) {}

   var bit = android.graphics.Bitmap.createScaledBitmap(bitmap, MC.Util.dp(width * 2), MC.Util.dp(height * 2), false);

   return MC.Util.createNinePatch(bit, MC.Util.dp(nx * 2), MC.Util.dp(ny * 2), MC.Util.dp(nxx * 2), MC.Util.dp(nyy * 2));
 },
 getBitmapNoNine: function(original, x, y, width, height) {
   var bitmap = android.graphics.Bitmap.createBitmap(original, x, y, width, height);
   var bit = android.graphics.Bitmap.createScaledBitmap(bitmap, MC.Util.dp(width * 2), MC.Util.dp(height * 2), false);

   return new BitmapDrawable(bit);
 }
};
MC.Image.BUTTON_NORMAL_OLD = MC.Image.getBitmap(MC.Image.spritesheet, 8, 32, 8, 8, 2, 2, 6, 7);
MC.Image.BUTTON_PRESSED_OLD = MC.Image.getBitmap(MC.Image.spritesheet, 0, 32, 8, 8, 2, 2, 6, 7);
MC.Image.SWITCH_ON_OLD = MC.Image.getBitmapNoNine(MC.Image.touchGUI, 198, 206, 38, 19);
MC.Image.SWITCH_OFF_OLD = MC.Image.getBitmapNoNine(MC.Image.touchGUI, 160, 206, 38, 19);
MC.Image.PANEL_OLD = MC.Image.getBitmap(MC.Image.spritesheet, 34, 43, 14, 14, 6, 6, 22, 22);
MC.Image.SEEKBAR_THUMB_OLD = MC.Image.getBitmapNoNine(MC.Image.touchGUI, 225, 125, 11, 17);
MC.Image.TOPBAR_OLD = MC.Image.getBitmap(MC.Image.touchGUI, 150, 26, 14, 30, 2.5, 3.5, 23, 11, function() {
  for (var i = 0; i < 26; i++) {
      bitmap.setPixel(2, i, bitmap.getPixel(3, i));
      bitmap.setPixel(11, i, bitmap.getPixel(10, i));
  }
  for (var i = 3; i < 11; i++) {
      bitmap.setPixel(i, 25, bitmap.getPixel(i, 26));
      bitmap.setPixel(i, 26, bitmap.getPixel(i, 27));
      bitmap.setPixel(i, 27, bitmap.getPixel(i, 28));
      bitmap.setPixel(i, 28, 0x00000000);
  }
  for (var i = 0; i < 14; i++) {
      bitmap.setPixel(i, 25, bitmap.getPixel(4, 25));
      bitmap.setPixel(i, 26, bitmap.getPixel(4, 26));
      bitmap.setPixel(i, 27, bitmap.getPixel(4, 27));
  }
});

MC.Image.BUTTON_NORMAL = MC.Image.getBitmap(MC.Util.getImage("resourcepacks/vanilla/textures/gui/newgui/ButtonWithBorder.png"), 0, 0, 6, 6, 3, 3, 4, 4);
MC.Image.BUTTON_HOVER = MC.Image.getBitmap(MC.Util.getImage("resourcepacks/vanilla/textures/gui/newgui/buttons/ButtonWithBorderHover.png"), 0, 0, 6, 6, 3, 3, 4, 4);
MC.Image.BUTTON_PRESSED = MC.Image.getBitmap(MC.Util.getImage("resourcepacks/vanilla/textures/gui/newgui/buttons/ButtonWithBorderPressed.png"), 0, 0, 6, 6, 3, 3, 4, 4);

// ---------------- MC.Widget start ---------------
MC.Widget.TextView = function() {
  this.width = 0;
  this.height = 0;

  this.text = "";
  this.textSize = 1;
  this.textColor = 0;
  this.isShadow = false;
};
MC.Widget.TextView.prototype = {
  /**
   * @author SuYong
   * @description set MC textview's text
   * @param {String} text
   * @return {void}
   */
  setText: function(text) {
    this.text = text;

    return this;
  },
  /**
   * @author SuYong
   * @description set MC textview's text color
   * @param {Number} text color
   * @return {void}
   */
  setTextColor: function(color) {
    this.textColor = color;

    return this;
  },
  /**
   * @author SuYong
   * @description set MC textview's text size
   * @param {Number} text size
   * @return {void}
   */
  setTextSize: function(size) {
    this.textSize = size;

    return this;
  },
  /**
   * @author SuYong
   * @description set using text shadow
   * @param {boolean} use shadow
   * @return {void}
   */
  setShadow: function(isShadow) {
    this.isShadow = isShadow;

    return this;
  }
};

MC.Widget.Button = function() {
  this.focus = false;
  this.isPressed = false;

  this.listener = {};
  this.listener.onClick = function(this);
  this.listener.onTouch = function(this, this.isPressed);
};
MC.Util.Implements(MC.Widget.Button, MC.Widget.TextView);

MC.Widget.ImageButton = function() {

};

MC.Widget.Switch = function() {

};

MC.Widget.CheckBox = function() {

};

MC.Widget.RadioButton = function() {

};

MC.Widget.RadioGroup = function() {

};

// ---------------- MC.Font start ---------------
/**
 * @author SuYong
 * @description get string ascii code
 * @param {String} string
 * @return {Number}
 */
MC.Font.getAscii = function(str) {
   return str.charCodeAt(0);
};

MC.Font.prototype.Convert = function(text, isShadow) {

};

// ---------------- MC.Util start ---------------

MC.Util.CacheManager = function() {

};

/**
 * @author SuYong
 * @description get minecraft image in resourcepack
 * @param {String} image's path
 * @return {android.graphics.Bitmap}
 */
MC.Util.getImage = function(path) {
   return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack(path));
};

/**
 * @author Affogatoman
 * @description create ninepatch image
 * @param {android.graphics.Bitmap} original image
 * @param {Number} x coordinate
 * @param {Number} y coordinate
 * @param {Number} second x coordinate
 * @param {Number} second y coordinate
 * @return {android.graphics.drawable.NinePatchDrawable}
 */
MC.Util.createNinePatch = function(bitmap, x, y, xx, yy) {
    var NO_COLOR = 0x00000001;
    var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());

    buffer.put(0x01);
    buffer.put(0x02);
    buffer.put(0x02);
    buffer.put(0x09);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(y);
    buffer.putInt(yy);
    buffer.putInt(x);
    buffer.putInt(xx);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);

    var drawable = new android.graphics.drawable.NinePatchDrawable(MC.CTX.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);

    return drawable;
};

/**
 * @author SuYong
 * @description copy parent's method and field to child
 * @param {Object} child object
 * @param {Object} parent object
 * @return {void}
 */
MC.Util.Implements = function(child, parent) {
  var child_class = eval(child);
  var parent_class = eval(parent + ".prototype");

  for(var i in parent_class)
    eval(child + ".prototype." + i + " = " + parent_class[i] + ";");

  var fake = eval("new " + parent + "();");
  for(var i in fake)
    eval(child + "." + i + " = " + (fake[i] == null) ? "null" : fake[i] + ";");
}

/**
 * @author Unknown
 * @description dip to pixel
 * @param {Number} dip value
 * @return {Number} pixel value
 */
MC.Util.dp(dips) {
  return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}
