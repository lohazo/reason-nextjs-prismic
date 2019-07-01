

import * as Block from "bs-platform/lib/es6/block.js";
import * as React from "react";

function Text$H1(Props) {
  var children = Props.children;
  return React.createElement("h1", {
              className: "font-montserrat font-medium text-main-black text-3xl mb-2"
            }, children);
}

var H1 = /* module */Block.localModule(["make"], [Text$H1]);

function Text$H2(Props) {
  var children = Props.children;
  return React.createElement("h2", {
              className: "font-montserrat font-medium text-main-black text-2xl mb-2"
            }, children);
}

var H2 = /* module */Block.localModule(["make"], [Text$H2]);

function Text$H3(Props) {
  var children = Props.children;
  return React.createElement("h3", {
              className: "font-montserrat font-medium text-main-black text-xl mb-2"
            }, children);
}

var H3 = /* module */Block.localModule(["make"], [Text$H3]);

function Text$P(Props) {
  var children = Props.children;
  return React.createElement("p", {
              className: "my-4 text-main-lighten-15"
            }, children);
}

var P = /* module */Block.localModule(["make"], [Text$P]);

function Text$Pre(Props) {
  var children = Props.children;
  return React.createElement("pre", {
              className: "my-8 p-4 block bg-main-lighten-95"
            }, children);
}

var Pre = /* module */Block.localModule(["make"], [Text$Pre]);

function Text$Ul(Props) {
  var children = Props.children;
  return React.createElement("ul", {
              className: "md-ul my-4"
            }, children);
}

var Ul = /* module */Block.localModule(["make"], [Text$Ul]);

function Text$Ol(Props) {
  var children = Props.children;
  return React.createElement("ol", {
              className: "md-ol list-reset -ml-4 text-primary"
            }, children);
}

var Ol = /* module */Block.localModule(["make"], [Text$Ol]);

function typeOf (thing){{ return typeof thing; }};

function isArray (thing){{ return thing instanceof Array; }};

function isSublist (element){{
        if(element == null || element.props == null) {
          return false;
        }
        const name = element.props.name;
        return name === 'ul' || name === 'ol';
      }};

function Text$Li(Props) {
  var children = Props.children;
  var elements;
  if (isArray(children)) {
    if (children.length !== 2) {
      elements = React.createElement("p", undefined, children);
    } else {
      var potentialSublist = children[1];
      elements = isSublist(potentialSublist) ? children : React.createElement("p", undefined, children);
    }
  } else {
    elements = typeOf(children) === "string" ? React.createElement("p", undefined, children) : children;
  }
  return React.createElement("li", {
              className: "md-li mt-4 leading-4 ml-8 text-main-lighten-15"
            }, elements);
}

var Li = /* module */Block.localModule([
    "typeOf",
    "isArray",
    "isSublist",
    "make"
  ], [
    typeOf,
    isArray,
    isSublist,
    Text$Li
  ]);

function Text$InlineCode(Props) {
  var children = Props.children;
  return React.createElement("code", {
              className: "px-1 rounded-sm text-inherit font-mono bg-info-blue-lighten-90"
            }, children);
}

var InlineCode = /* module */Block.localModule(["make"], [Text$InlineCode]);

var inline = "no-underline border-b hover:text-main-lighten-20 hover:border-primary-dark-10 border-primary-lighten-50 text-inherit";

function Text$A(Props) {
  var href = Props.href;
  var children = Props.children;
  return React.createElement("a", {
              className: "" + (String(inline) + " hover:text-main-lighten-20 hover:border-b border-primary"),
              href: href
            }, children);
}

var A = /* module */Block.localModule([
    "inline",
    "make"
  ], [
    inline,
    Text$A
  ]);

export {
  H1 ,
  H2 ,
  H3 ,
  P ,
  Pre ,
  Ul ,
  Ol ,
  Li ,
  InlineCode ,
  A ,
  
}
/* react Not a pure module */
