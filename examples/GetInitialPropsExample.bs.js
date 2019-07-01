

import * as $$Text from "../components/Text.bs.js";
import * as Util from "../common/util.bs.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as MainLayout from "../layouts/MainLayout.bs.js";

function GetInitialPropsExample$default(Props) {
  var msg = Props.msg;
  var name = Props.name;
  return React.createElement(MainLayout.make, {
              children: null
            }, Util.ReactStuff[/* s */0](msg), React.createElement($$Text.H1[/* make */0], {
                  children: Util.ReactStuff[/* s */0](msg + (" " + (name + "!")))
                }));
}

function getInitialProps(_ctx) {
  return Promise.resolve({
              msg: "Hello",
              name: "WorkerConf"
            });
}

var inject = ( (cls, fn) => cls.getInitialProps = fn );

Curry._2(inject, GetInitialPropsExample$default, getInitialProps);

var $$default = GetInitialPropsExample$default;

export {
  $$default ,
  $$default as default,
  getInitialProps ,
  inject ,
  
}
/* inject Not a pure module */
