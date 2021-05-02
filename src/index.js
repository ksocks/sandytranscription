var canvas = new fabric.Canvas("c");
canvas.selection = false;

fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";
fabric.Object.prototype.selectable = false;

fabric.Image.fromURL("assets/sand puff.png", function (img) {
  img.scaleToHeight(200);
  img.scaleToWidth(200);
  canvas.add(img.set({ left: 100, top: 100, angle: -15 }));
  img.selectable = false;
  canvas.renderAll();

  for (var i = 0; i < 13; i += 1) {
    for (var j = 0; j < 9; j += 1) {
      console.log(100 * i);
      (function (x, y) {
        img.clone(function (c) {
          canvas.add(c.set({ left: x, top: y, angle: -15 }));
        });
      })(100 * i + Math.random() * 80, 100 * j + Math.random() * 80);
    }
  }
});

fabric.Image.fromURL("assets/message_test3.png", function (img) {
  img.notrans = true;
  img.scaleToWidth(1280);
  img.originX = "left";
  img.originY = "top";
  canvas.add(img);
  img.selectable = false;
  canvas.sendToBack(img);
  canvas.renderAll();
});

canvas.on("mouse:move", function (options) {
  console.log("mouse:move");
  var p = canvas.getPointer(options.e);

  canvas.forEachObject(function (obj) {
    if (obj.notrans) {
    } else {
      var distX = Math.abs(p.x - obj.left),
        distY = Math.abs(p.y - obj.top),
        dist = Math.round(Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)));

      obj.set("opacity", (1 - 1 / (1 + (dist / 250) ** 2)) * 0.8);
    }
  });
  canvas.renderAll();
});
