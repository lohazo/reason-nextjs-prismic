

import * as Util from "../common/util.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";

function ColorSquare(Props) {
  var color = Props.color;
  var match = React.useState((function () {
          return 0;
        }));
  var setCount = match[1];
  var count = match[0];
  var color$1;
  switch (color) {
    case "blue" : 
        color$1 = "blue";
        break;
    case "red" : 
        color$1 = "red";
        break;
    case "yellow" : 
        color$1 = "yellow";
        break;
    default:
      color$1 = "pink";
  }
  var grade = count > 3 || count < 0 ? (
      count === 5 || count === 4 ? "400" : "900"
    ) : (
      count >= 2 ? "300" : "200"
    );
  var className = "bg-" + (String(color$1) + ("-" + (String(grade) + " w-32 h-32")));
  return React.createElement("div", {
              className: className
            }, React.createElement("button", {
                  onClick: (function (_evt) {
                      return Curry._1(setCount, (function (_state) {
                                    return count + 1 | 0;
                                  }));
                    })
                }, Util.ReactStuff[/* s */0]("PLUS")), Util.ReactStuff[/* s */0](String(count)), React.createElement("button", {
                  onClick: (function (_evt) {
                      return Curry._1(setCount, (function (_state) {
                                    return count - 1 | 0;
                                  }));
                    })
                }, Util.ReactStuff[/* s */0]("MINUS")));
}

var make = ColorSquare;

export {
  make ,
  
}
/* react Not a pure module */
