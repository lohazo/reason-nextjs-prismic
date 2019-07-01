

import * as Mdx from "../bindings/Mdx.bs.js";
import * as Util from "../common/util.bs.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as React from "react";
import * as Link from "next/link";
import * as React$1 from "@mdx-js/react";

require('../styles/main.css')
;

function MainLayout$Navigation(Props) {
  return React.createElement("nav", {
              className: "p-2 h-12 flex border-b border-gray-200 justify-between items-center text-sm"
            }, React.createElement(Link.default, {
                  href: "/",
                  children: React.createElement("a", {
                        className: "flex items-center w-1/3"
                      }, React.createElement("img", {
                            className: "w-8",
                            src: "/static/worker-logo.png"
                          }), React.createElement("span", {
                            className: "text-xl ml-2 align-middle font-semibold"
                          }, Util.ReactStuff[/* s */0]("Reason"), React.createElement("span", {
                                className: "text-orange-800"
                              }, Util.ReactStuff[/* s */0]("Workshop"))))
                }), React.createElement("div", {
                  className: "flex w-2/3 justify-end"
                }, React.createElement(Link.default, {
                      href: "/",
                      children: React.createElement("a", {
                            className: "px-3"
                          }, Util.ReactStuff[/* s */0]("Home"))
                    }), React.createElement(Link.default, {
                      href: "/hiking",
                      children: React.createElement("a", {
                            className: "px-3"
                          }, Util.ReactStuff[/* s */0]("Hiking App"))
                    }), React.createElement(Link.default, {
                      href: "/help",
                      children: React.createElement("a", {
                            className: "px-3"
                          }, Util.ReactStuff[/* s */0]("Help"))
                    })));
}

var Navigation = /* module */Block.localModule(["make"], [MainLayout$Navigation]);

function MainLayout(Props) {
  var children = Props.children;
  var minWidth = {
    minWidth: "20rem"
  };
  return React.createElement("div", {
              className: "flex lg:justify-center mb-32",
              style: minWidth
            }, React.createElement("div", {
                  className: "max-w-5xl w-full lg:w-3/4 text-gray-900 font-base"
                }, React.createElement(MainLayout$Navigation, { }), React.createElement("main", {
                      className: "mt-4 mx-4 max-w-3xl"
                    }, React.createElement(React$1.MDXProvider, {
                          components: Mdx.components,
                          children: children
                        }))));
}

var Link$1 = 0;

var make = MainLayout;

export {
  Link$1 as Link,
  Navigation ,
  make ,
  
}
/*  Not a pure module */
