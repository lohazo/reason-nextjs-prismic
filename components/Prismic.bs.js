

import * as Util from "../common/util.bs.js";
import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Fetch from "bs-fetch/src/Fetch.js";
import * as React from "react";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";
import * as Caml_exceptions from "bs-platform/lib/es6/caml_exceptions.js";

var Xl = /* module */Block.localModule([], []);

var Lg = /* module */Block.localModule([], []);

var Md = /* module */Block.localModule([], []);

var Sm = /* module */Block.localModule([], []);

var Xs = /* module */Block.localModule([], []);

function getVariantUrl(img, size) {
  if (img !== undefined) {
    var img$1 = Caml_option.valFromOption(img);
    if (size >= 18618) {
      if (size >= 19739) {
        if (size >= 983167089) {
          return img$1.url;
        } else {
          return img$1.xs.url;
        }
      } else if (size >= 19732) {
        return img$1.xl.url;
      } else {
        return img$1.sm.url;
      }
    } else if (size >= 17271) {
      return img$1.md.url;
    } else {
      return img$1.lg.url;
    }
  }
  
}

var $$Image = /* module */Block.localModule([
    "Xl",
    "Lg",
    "Md",
    "Sm",
    "Xs",
    "getVariantUrl"
  ], [
    Xl,
    Lg,
    Md,
    Sm,
    Xs,
    getVariantUrl
  ]);

function Prismic$ResponsiveImage(Props) {
  var img = Props.img;
  var maxSize = Props.maxSize;
  var children = Props.children;
  var xs = getVariantUrl(Caml_option.some(img), /* Xs */19739);
  var sm = getVariantUrl(Caml_option.some(img), /* Sm */18618);
  var md = getVariantUrl(Caml_option.some(img), /* Md */17271);
  var lg = getVariantUrl(Caml_option.some(img), /* Lg */17051);
  var xl = getVariantUrl(Caml_option.some(img), /* Xl */19732);
  var original = getVariantUrl(Caml_option.some(img), /* Original */983167089);
  var sources = /* array */[
    /* tuple */[
      xs,
      320
    ],
    /* tuple */[
      sm,
      640
    ],
    /* tuple */[
      md,
      768
    ],
    /* tuple */[
      lg,
      1024
    ],
    /* tuple */[
      xl,
      1280
    ]
  ];
  var maxSizeUrl;
  if (maxSize !== undefined) {
    var max = maxSize;
    maxSizeUrl = max >= 18618 ? (
        max >= 19739 ? (
            max >= 983167089 ? original : xs
          ) : (
            max >= 19732 ? xl : sm
          )
      ) : (
        max >= 17271 ? md : lg
      );
  } else {
    maxSizeUrl = xl;
  }
  var children$1 = children !== undefined ? children : (function (src) {
        return React.createElement("img", {
                    src: src
                  });
      });
  return React.createElement("picture", undefined, Util.ReactStuff[/* ate */1](Belt_Array.mapWithIndex(sources, (function (i, param) {
                        var url = param[0];
                        if (url !== undefined) {
                          var media = "(max-width: " + (String(param[1]) + "px)");
                          return React.createElement("source", {
                                      key: String(i),
                                      media: media,
                                      srcSet: url
                                    });
                        } else {
                          return null;
                        }
                      }))), maxSizeUrl !== undefined ? Curry._1(children$1, maxSizeUrl) : null);
}

var ResponsiveImage = /* module */Block.localModule([
    "Image",
    "make"
  ], [
    $$Image,
    Prismic$ResponsiveImage
  ]);

function image(json) {
  return /* record */Block.record(["url"], [Json_decode.field("url", Json_decode.string, json)]);
}

function span(json) {
  return /* record */Block.record([
            "start",
            "end_",
            "type_"
          ], [
            Json_decode.field("start", Json_decode.$$int, json),
            Json_decode.field("end", Json_decode.$$int, json),
            Json_decode.field("type", Json_decode.string, json)
          ]);
}

function contents(json) {
  return /* record */Block.record([
            "text",
            "spans"
          ], [
            Json_decode.field("text", Json_decode.string, json),
            Json_decode.field("spans", (function (param) {
                    return Json_decode.array(span, param);
                  }), json)
          ]);
}

function richText(json) {
  var type_ = Json_decode.field("type", Json_decode.string, json);
  switch (type_) {
    case "heading1" : 
        return /* Heading1 */Block.variant("Heading1", 0, [contents(json)]);
    case "heading2" : 
        return /* Heading2 */Block.variant("Heading2", 1, [contents(json)]);
    case "heading3" : 
        return /* Heading3 */Block.variant("Heading3", 2, [contents(json)]);
    case "heading4" : 
        return /* Heading4 */Block.variant("Heading4", 3, [contents(json)]);
    case "image" : 
        return /* Image */Block.variant("Image", 7, [image(json)]);
    case "list-item" : 
        return /* ListItem */Block.variant("ListItem", 4, [contents(json)]);
    case "o-list-item" : 
        return /* OListItem */Block.variant("OListItem", 6, [contents(json)]);
    case "paragraph" : 
        return /* Paragraph */Block.variant("Paragraph", 5, [contents(json)]);
    default:
      return /* Unknown */Block.variant("Unknown", 8, [
                type_,
                json
              ]);
  }
}

function decode(data) {
  if (data !== undefined) {
    return Json_decode.array(richText, Caml_option.valFromOption(data));
  } else {
    return /* array */[];
  }
}

var Decode = /* module */Block.localModule([
    "image",
    "span",
    "contents",
    "richText",
    "decode"
  ], [
    image,
    span,
    contents,
    richText,
    decode
  ]);

function getKind(item) {
  switch (item.tag | 0) {
    case 4 : 
        return /* Ul */19063;
    case 6 : 
        return /* Ol */17725;
    default:
      return /* Ul */19063;
  }
}

function Make(Render) {
  var renderRichText = function (elements) {
    var groupCount = /* record */Block.record(["contents"], [0]);
    var newGroupId = function (param) {
      groupCount[0] = groupCount[0] + 1 | 0;
      return groupCount[0];
    };
    var isLast = function (i) {
      return (i + 1 | 0) === elements.length;
    };
    var renderList = Render[/* renderList */1];
    var renderItem = Render[/* renderItem */0];
    var match = Belt_Array.reduceWithIndex(elements, /* tuple */[
          /* array */[],
          undefined
        ], (function (param, item, i) {
            var group = param[1];
            var acc = param[0];
            var match = isLast(i);
            if (group !== undefined) {
              var match$1 = group;
              var elements = match$1[/* elements */1];
              var kind = match$1[/* kind */0];
              var exit = 0;
              switch (item.tag | 0) {
                case 4 : 
                case 6 : 
                    exit = 1;
                    break;
                default:
                  var someList = Curry._3(renderList, newGroupId(/* () */0), kind, elements);
                  var next = Curry._3(renderItem, undefined, i, item);
                  return /* tuple */[
                          Belt_Array.concat(acc, /* array */[
                                someList,
                                next
                              ]),
                          undefined
                        ];
              }
              if (exit === 1) {
                var currentKind = getKind(item);
                var kindChanged = currentKind !== kind;
                if (kindChanged) {
                  if (match) {
                    var groupList = Curry._3(renderList, groupCount[0], kind, elements);
                    var lastElement = Curry._3(renderList, newGroupId(/* () */0), currentKind, /* array */[Curry._3(renderItem, 1, i, item)]);
                    return /* tuple */[
                            Belt_Array.concat(acc, /* array */[
                                  groupList,
                                  lastElement
                                ]),
                            group
                          ];
                  } else {
                    var groupList$1 = Curry._3(renderList, newGroupId(/* () */0), kind, elements);
                    var newGroup_001 = /* elements : array */[Curry._3(renderItem, 1, i, item)];
                    var newGroup = /* record */Block.record([
                        "kind",
                        "elements"
                      ], [
                        currentKind,
                        newGroup_001
                      ]);
                    return /* tuple */[
                            Belt_Array.concat(acc, /* array */[groupList$1]),
                            newGroup
                          ];
                  }
                } else if (match) {
                  var groupList$2 = Curry._3(renderList, newGroupId(/* () */0), kind, Belt_Array.concat(elements, /* array */[Curry._3(renderItem, elements.length + 1 | 0, i, item)]));
                  return /* tuple */[
                          Belt_Array.concat(acc, /* array */[groupList$2]),
                          undefined
                        ];
                } else {
                  var elements$1 = Belt_Array.concat(elements, /* array */[Curry._3(renderItem, elements.length + 1 | 0, i, item)]);
                  return /* tuple */[
                          acc,
                          /* record */Block.record([
                              "kind",
                              "elements"
                            ], [
                              currentKind,
                              elements$1
                            ])
                        ];
                }
              }
              
            } else {
              var exit$1 = 0;
              switch (item.tag | 0) {
                case 4 : 
                case 6 : 
                    exit$1 = 1;
                    break;
                default:
                  return /* tuple */[
                          Belt_Array.concat(acc, /* array */[Curry._3(renderItem, undefined, i, item)]),
                          undefined
                        ];
              }
              if (exit$1 === 1) {
                if (match) {
                  return /* tuple */[
                          Belt_Array.concat(acc, /* array */[Curry._3(renderItem, undefined, i, item)]),
                          undefined
                        ];
                } else {
                  var elements$2 = /* array */[Curry._3(renderItem, 1, i, item)];
                  return /* tuple */[
                          acc,
                          /* record */Block.record([
                              "kind",
                              "elements"
                            ], [
                              getKind(item),
                              elements$2
                            ])
                        ];
                }
              }
              
            }
          }));
    return Util.ReactStuff[/* ate */1](match[0]);
  };
  return /* module */Block.localModule(["renderRichText"], [renderRichText]);
}

var RichText = /* module */Block.localModule([
    "Decode",
    "getKind",
    "Make"
  ], [
    Decode,
    getKind,
    Make
  ]);

import 'isomorphic-unfetch'
;

var api = "https://hiking.prismic.io/api";

var endpoint = "https://hiking.prismic.io/graphql";

var Graphql_error = Caml_exceptions.create("Prismic.Query.Graphql_error");

var Ref = /* module */Block.localModule([], []);

function queryMasterRef(param) {
  return fetch(api, Fetch.RequestInit[/* make */0](/* Get */0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (prim) {
                  return prim.json();
                })).then((function (data) {
                return Promise.resolve(Belt_Array.getBy(data.refs, (function (apiRef) {
                                  return apiRef.isMasterRef;
                                })));
              }));
}

function sendQuery(q) {
  var vars = encodeURIComponent(JSON.stringify(q.variables));
  var query = encodeURIComponent(q.query);
  return queryMasterRef(/* () */0).then((function (apiRef) {
                var prismicRef = apiRef !== undefined ? Caml_option.valFromOption(apiRef).ref : "";
                return fetch(endpoint + ("?query=" + (String(query) + ("&variables=" + (String(vars) + "")))), Fetch.RequestInit[/* make */0](/* Get */0, /* array */[
                                    /* tuple */[
                                      "content-type",
                                      "application/json"
                                    ],
                                    /* tuple */[
                                      "Prismic-ref",
                                      prismicRef
                                    ]
                                  ], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (resp) {
                              if (resp.ok) {
                                return resp.json().then((function (data) {
                                              var match = Js_json.decodeObject(data);
                                              if (match !== undefined) {
                                                return Promise.resolve(Curry._1(q.parse, Caml_option.valFromOption(match)["data"]));
                                              } else {
                                                return Promise.reject([
                                                            Graphql_error,
                                                            "Response is not an object"
                                                          ]);
                                              }
                                            }));
                              } else {
                                return Promise.reject([
                                            Graphql_error,
                                            "Request failed: " + resp.statusText
                                          ]);
                              }
                            }));
              }));
}

var Query = /* module */Block.localModule([
    "api",
    "endpoint",
    "Graphql_error",
    "Ref",
    "queryMasterRef",
    "sendQuery"
  ], [
    api,
    endpoint,
    Graphql_error,
    Ref,
    queryMasterRef,
    sendQuery
  ]);

export {
  ResponsiveImage ,
  RichText ,
  Query ,
  
}
/*  Not a pure module */
