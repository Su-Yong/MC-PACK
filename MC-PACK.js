/**
 * MC-PACK
 * @author SuYong
 * @version v0.1.0
 */

 const Button = android.widget.Button;
 const ToggleButton = android.widget.ToggleButton;
 const TextView = android.widget.TextView;
 const ImageView = android.widget.ImageView;
 const Toast = android.widget.Toast;
 const LinearLayout = android.widget.LinearLayout;
 const FrameLayout = android.widget.FrameLayout;
 const PopupWindow = android.widget.PopupWindow;
 const ScrollView = android.widget.ScrollView;
 const HorizontalScrollView = android.widget.HorizontalScrollView;
 const SeekBar = android.widget.SeekBar;
 const EditText = android.widget.EditText;
 // widget

 const GONE = android.view.View.GONE;
 const VISIBLE = android.view.View.VISIBLE;
 const INVISIBLE = android.view.View.INVISIBLE;
 const OnTouchListener = android.view.View.OnTouchListener;
 const OnClickListener = android.view.View.OnClickListener;
 const MotionEvent = android.view.MotionEvent;
 const Gravity = android.view.Gravity;
 const ViewGroup = android.view.ViewGroup;
 // View

 const Bitmap = android.graphics.Bitmap;
 const Canvas = android.graphics.Canvas;
 const Paint = android.graphics.Paint;
 const Drawable = android.graphics.drawable.Drawaable;
 const BitmapDrawable = android.graphics.drawable.BitmapDrawable;
 const ColorDrawable = android.graphics.drawable.ColorDrawable;
 const Typeface = android.graphics.Typeface;
 const Color = android.graphics.Color;
 const BitmapFactory = android.graphics.BitmapFactory;
 const PorterDuffColorFilter = android.graphics.PorterDuffColorFilter;
 const PorterDuff = android.graphics.PorterDuff;
 // Graphics

var MC = {};

MC.CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

MC.WIDTH = MC.CTX.getScreenWidth();
MC.HEIGHT = MC.CTX.getScreenHeight();

MC.Widget = {};
MC.Font = {};
MC.Util = {};
MC.Color = {
  WHITE: Color.parseColor("#E1E1E1"),
  GRAY: Color.parseColor("#2C2C2C"),
  BLACK: Color.parseColor("#000000"),
  RED: Color.parseColor("#FF0000"),
  YELLOW: Color.parseColor("#FFFFA1"),
};

/**
 * @author SuYong
 * @see {@link http://cafe.naver.com/minecraftdev/6056} cut from N_GuiPE by 0isback
 */
MC.Image = {
 spritesheet: MC.Util.getImage("images/gui/spritesheet.png"),
 touchGUI: MC.Util.getImage("images/gui/touchgui.png"),
 touchGUI2: MC.Util.getImage("images/gui/touchgui2.png"),
 GUI: MC.Util.getImage("images/gui/gui.png"),

 getBitmap: function(original, x, y, width, height, nx, ny, nxx, nyy, func) {
   var bitmap = Bitmap.createBitmap(original, x, y, width, height);

   try {
     func();
   } catch(err) {}

   var bit = Bitmap.createScaledBitmap(bitmap, MC.Util.dp(width * 2), MC.Util.dp(height * 2), false);

   return MC.Util.createNinePatch(bit, MC.Util.dp(nx * 2), MC.Util.dp(ny * 2), MC.Util.dp(nxx * 2), MC.Util.dp(nyy * 2));
 },
 getBitmapNoNine: function(original, x, y, width, height) {
   var bitmap = Bitmap.createBitmap(original, x, y, width, height);
   var bit = Bitmap.createScaledBitmap(bitmap, MC.Util.dp(width * 2), MC.Util.dp(height * 2), false);

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
  this.textColor = MC.Color.BLACK;
  this.isShadow = false;

  this.imageView = null;
  this.textBitmap = null;
};
MC.Widget.TextView.prototype = {
  constructor: function() {
    imageView = new ImageView(MC.CTX);
  }
  /**
   * @param {String} text
   */
  setText: function(text) {
    this.text = text;
    this.imageView.setImageBitmap(MC.Font.Convert(text, this.isShadow, textColor, this.textSize));

    return this;
  },
  /**
   * @param {Number} text color
   */
  setTextColor: function(color) {
    this.textColor = color;
    this.imageView.setImageBitmap(MC.Font.Convert(text, this.isShadow, textColor, this.textSize));

    return this;
  },
  /**
   * @param {Number} text size
   */
  setTextSize: function(size) {
    this.textSize = size;
    this.imageView.setImageBitmap(MC.Font.Convert(text, this.isShadow, textColor, this.textSize));

    return this;
  },
  /**
   * @param {boolean} use shadow
   */
  setShadow: function(isShadow) {
    this.isShadow = isShadow;
    this.imageView.setImageBitmap(MC.Font.Convert(text, this.isShadow, textColor, this.textSize));

    return this;
  },

  get: function() {
    return this.imageView;
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
 * @param {String} string
 * @return {Number}
 */
MC.Font.getAscii = function(str) {
   return str.charCodeAt(0);
};
/**
 * @description check for all strings are english
 * @param {String} string
 * @return {boolean}
 */
MC.Font.isDefault = function(str) {
  for(var i = 0; i < str.length; i ++) {
    if(str.charCodeAt(i) > 127) {
      return false;
    }
  }

   return true;
};

MC.Font.prototype.ConvertChar = function(text, isShadow, color) {
  var hex = parseInt(MC.Font.getAscii(text), 16).toString().toUpperCase();

  var font = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("resourcepacks/vanilla/font/glyph_" + hex + ".png"));
  var bitmap;

  if(isShadow) {
    bitmap = Bitmap.createBitmap(font.getWidth() + 1, font.getHeight() + 1, Bitmap.Config.ARGB_8888);
  } else {
    bitmap = Bitmap.createBitmap(font.getWidth(), font.getHeight(), Bitmap.Config.ARGB_8888);
  }

  var canvas = new Canvas(bitmap);
  var paint = new Paint();
  paint.setColorFilter(PorterDuffColorFilter(Color.parseColor(color), PorterDuff.Mode.MULTIPLY));

  if(isShadow) {
    var shadow = new Paint();
    shadow.setColor(MC.Color.GRAY);
    canvas.drawBitmap(font, 1, 1, shadow);
  }

  canvas.drawBitmap(font, 0, 0, paint);

  if(MC.Font.isDefault(text)) {
    bitmap = Bitmap.createScaledBitmap(bitmap, bitmap.getWidth() * 2, bitmap.getHeight() * 2, false);
  }
  return bitmap;
};
MC.Font.prototype.Convert = function(text, isShadow, color, size) {
  var length = text.length();
  var bitmap = Bitmap.createBitmap(length * 34 - 1, 33, Bitmap.Config.ARGB_8888);
  var canvas = new Canvas(bitmap);
  var num = 0;

  for each(var i in text.split("")) {
    canvas.drawBitmap(MC.Font.ConvertChar(i, isShadow, color), num, 0, paint);
    num += 34;
  }

  if(!!size) {
    return Bitmap.createScaledBitmap(bitmap, MC.Util.dp(bitmap.getWidth() * 2), MC.Util.dp(bitmap.getHeight() * 2), false);
  } else {
    return Bitmap.createScaledBitmap(bitmap, MC.Util.dp(bitmap.getWidth() * 2 * size), MC.Util.dp(bitmap.getHeight() * 2 * size), false);
  }
};
// ---------------- MC.Util start ---------------

MC.Util.CacheManager = function() {

};

/**
 * @param {String} image's path
 * @return {Bitmap}
 */
MC.Util.getImage = function(path) {
   return BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack(path));
};

/**
 * @author Affogatoman
 * @param {Bitmap} original image
 * @param {Number} x coordinate
 * @param {Number} y coordinate
 * @param {Number} second x coordinate
 * @param {Number} second y coordinate
 * @return {NinePatchDrawable}
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

    var drawable = new NinePatchDrawable(MC.CTX.getResources(), bitmap, buffer.array(), new Rect(), null);

    return drawable;
};

/**
 * @description copy parent's method and field to child
 * @param {Object} child object
 * @param {Object} parent object
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
 * @param {Number} dip value
 * @return {Number} pixel value
 */
MC.Util.dp(dips) {
  return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}
