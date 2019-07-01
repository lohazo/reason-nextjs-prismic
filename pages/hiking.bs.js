

import * as Util from "../common/util.bs.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as Prismic from "../components/Prismic.bs.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as MainLayout from "../layouts/MainLayout.bs.js";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Caml_builtin_exceptions from "bs-platform/lib/es6/caml_builtin_exceptions.js";

require('../styles/main.css')
;

var ppx_printed_query = "query   {\nallHikingSpots  {\nedges  {\nhikingSpot: node  {\nname  \npreview_image  \nshort_description  \n}\n\n}\n\n}\n\n}\n";

function parse(value) {
  var match = Js_json.decodeObject(value);
  if (match !== undefined) {
    var match$1 = Js_dict.get(Caml_option.valFromOption(match), "allHikingSpots");
    var tmp;
    if (match$1 !== undefined) {
      var match$2 = Js_json.decodeObject(Caml_option.valFromOption(match$1));
      if (match$2 !== undefined) {
        var match$3 = Js_dict.get(Caml_option.valFromOption(match$2), "edges");
        var tmp$1;
        if (match$3 !== undefined) {
          var value$1 = Caml_option.valFromOption(match$3);
          var match$4 = Js_json.decodeNull(value$1);
          if (match$4 !== undefined) {
            tmp$1 = undefined;
          } else {
            var match$5 = Js_json.decodeArray(value$1);
            tmp$1 = match$5 !== undefined ? match$5.map((function (value) {
                      var match = Js_json.decodeNull(value);
                      if (match !== undefined) {
                        return undefined;
                      } else {
                        var match$1 = Js_json.decodeObject(value);
                        var tmp;
                        if (match$1 !== undefined) {
                          var match$2 = Js_dict.get(Caml_option.valFromOption(match$1), "hikingSpot");
                          var tmp$1;
                          if (match$2 !== undefined) {
                            var value$1 = Caml_option.valFromOption(match$2);
                            var match$3 = Js_json.decodeObject(value$1);
                            if (match$3 !== undefined) {
                              var value$2 = Caml_option.valFromOption(match$3);
                              var match$4 = Js_dict.get(value$2, "name");
                              var field_name;
                              if (match$4 !== undefined) {
                                var value$3 = Caml_option.valFromOption(match$4);
                                var match$5 = Js_json.decodeNull(value$3);
                                if (match$5 !== undefined) {
                                  field_name = undefined;
                                } else {
                                  var match$6 = Js_json.decodeString(value$3);
                                  field_name = match$6 !== undefined ? match$6 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                                }
                              } else {
                                field_name = undefined;
                              }
                              var match$7 = Js_dict.get(value$2, "preview_image");
                              var field_preview_image;
                              if (match$7 !== undefined) {
                                var value$4 = Caml_option.valFromOption(match$7);
                                var match$8 = Js_json.decodeNull(value$4);
                                field_preview_image = match$8 !== undefined ? undefined : Caml_option.some(value$4);
                              } else {
                                field_preview_image = undefined;
                              }
                              var match$9 = Js_dict.get(value$2, "short_description");
                              var field_short_description;
                              if (match$9 !== undefined) {
                                var value$5 = Caml_option.valFromOption(match$9);
                                var match$10 = Js_json.decodeNull(value$5);
                                if (match$10 !== undefined) {
                                  field_short_description = undefined;
                                } else {
                                  var match$11 = Js_json.decodeString(value$5);
                                  field_short_description = match$11 !== undefined ? match$11 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$5));
                                }
                              } else {
                                field_short_description = undefined;
                              }
                              tmp$1 = /* record */Block.record([
                                  "name",
                                  "preview_image",
                                  "short_description"
                                ], [
                                  field_name,
                                  field_preview_image,
                                  field_short_description
                                ]);
                            } else {
                              tmp$1 = Js_exn.raiseError("graphql_ppx: Expected object of type HikingSpot, got " + JSON.stringify(value$1));
                            }
                          } else {
                            tmp$1 = Js_exn.raiseError("graphql_ppx: Field hikingSpot on type HikingSpotConnectionEdge is missing");
                          }
                          tmp = {
                            hikingSpot: tmp$1
                          };
                        } else {
                          tmp = Js_exn.raiseError("graphql_ppx: Object is not a value");
                        }
                        return Caml_option.some(tmp);
                      }
                    })) : Js_exn.raiseError("graphql_ppx: Expected array, got " + JSON.stringify(value$1));
          }
        } else {
          tmp$1 = undefined;
        }
        tmp = {
          edges: tmp$1
        };
      } else {
        tmp = Js_exn.raiseError("graphql_ppx: Object is not a value");
      }
    } else {
      tmp = Js_exn.raiseError("graphql_ppx: Field allHikingSpots on type Query is missing");
    }
    return {
            allHikingSpots: tmp
          };
  } else {
    return Js_exn.raiseError("graphql_ppx: Object is not a value");
  }
}

function make(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function ret_type(f) {
  return /* module */Block.localModule([], []);
}

var MT_Ret = /* module */Block.localModule([], []);

var QueryAllHikingSpots = /* module */Block.localModule([
    "ppx_printed_query",
    "query",
    "parse",
    "make",
    "makeWithVariables",
    "ret_type",
    "MT_Ret"
  ], [
    ppx_printed_query,
    ppx_printed_query,
    parse,
    make,
    makeWithVariables,
    ret_type,
    MT_Ret
  ]);

function Hiking$HikingCard(Props) {
  var match = Props.name;
  var name = match !== undefined ? match : "";
  var img = Props.img;
  var match$1 = Props.short_description;
  var short_description = match$1 !== undefined ? match$1 : "";
  return React.createElement("div", undefined, img !== undefined ? React.createElement(Prismic.ResponsiveImage[/* make */1], {
                    img: Caml_option.valFromOption(img),
                    maxSize: /* Xs */19739
                  }) : null, React.createElement("div", undefined, Util.ReactStuff[/* s */0](name)), React.createElement("div", undefined, Util.ReactStuff[/* s */0](short_description)));
}

var HikingCard = /* module */Block.localModule(["make"], [Hiking$HikingCard]);

function Hiking$default(Props) {
  var hikingSpots = Props.hikingSpots;
  return React.createElement(MainLayout.make, {
              children: Util.ReactStuff[/* ate */1](Belt_Array.map(hikingSpots, (function (spot) {
                          var img = spot[/* preview_image */1];
                          var tmp = { };
                          var tmp$1 = spot[/* name */0];
                          if (tmp$1 !== undefined) {
                            tmp.name = Caml_option.valFromOption(tmp$1);
                          }
                          if (img !== undefined) {
                            tmp.img = Caml_option.valFromOption(img);
                          }
                          var tmp$2 = spot[/* short_description */2];
                          if (tmp$2 !== undefined) {
                            tmp.short_description = Caml_option.valFromOption(tmp$2);
                          }
                          return React.createElement(Hiking$HikingCard, tmp);
                        })))
            });
}

function getInitialProps(_ctx) {
  var q = make(/* () */0);
  return Prismic.Query[/* sendQuery */5](q).then((function (data) {
                  var allHikingSpots = Belt_Option.mapWithDefault(data.allHikingSpots.edges, /* array */[], (function (edges) {
                          return Belt_Array.keepMap(edges, (function (edge) {
                                        return Belt_Option.map(edge, (function (e) {
                                                      return e.hikingSpot;
                                                    }));
                                      }));
                        }));
                  return Promise.resolve({
                              hikingSpots: allHikingSpots
                            });
                })).catch((function (error) {
                console.log("Error while fetching hikingspots: ", error);
                return Promise.reject(Caml_builtin_exceptions.not_found);
              }));
}

var inject = ( (cls, fn) => cls.getInitialProps = fn );

Curry._2(inject, Hiking$default, getInitialProps);

var ResponsiveImage = 0;

var $$Image = 0;

var $$default = Hiking$default;

export {
  ResponsiveImage ,
  $$Image ,
  QueryAllHikingSpots ,
  HikingCard ,
  $$default ,
  $$default as default,
  getInitialProps ,
  inject ,
  
}
/*  Not a pure module */
