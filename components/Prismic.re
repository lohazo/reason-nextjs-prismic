/*
  The Prismic Main module should be treated as a Black-Box, since it knows alot about the
  Prismic data-structures, such as image data and the rich text format.
 */

module ResponsiveImage = {
  open Util.ReactStuff;
  module Image = {
    /* 1280px width */
    module Xl = {
      [@bs.deriving abstract]
      type t = {
        alt: option(string),
        url: string,
      };
    };

    /* 1024px width */
    module Lg = {
      [@bs.deriving abstract]
      type t = {
        alt: option(string),
        url: string,
      };
    };

    /* 768px width */
    module Md = {
      [@bs.deriving abstract]
      type t = {
        alt: option(string),
        url: string,
      };
    };

    /* 640px width */
    module Sm = {
      [@bs.deriving abstract]
      type t = {
        alt: option(string),
        url: string,
      };
    };

    /* 320px width */
    module Xs = {
      [@bs.deriving abstract]
      type t = {
        alt: option(string),
        url: string,
      };
    };

    [@bs.deriving abstract]
    type t = {
      xs: Xs.t,
      sm: Sm.t,
      md: Md.t,
      lg: Lg.t,
      xl: Xl.t,
      url: string,
      alt: string,
    };

    type size = [ | `Sm | `Lg | `Xs | `Md | `Xl | `Original];

    let getVariantUrl = (img: option(t), size: size): option(string) =>
      switch (img) {
      | Some(img) =>
        switch (size) {
        | `Xs => Some(img->xsGet->Xs.urlGet)
        | `Sm => Some(img->smGet->Sm.urlGet)
        | `Md => Some(img->mdGet->Md.urlGet)
        | `Lg => Some(img->lgGet->Lg.urlGet)
        | `Xl => Some(img->xlGet->Xl.urlGet)
        | `Original => Some(img->urlGet)
        }
      | None => None
      };
  };

  [@react.component]
  let make = (~img: Image.t, ~maxSize: option(Image.size)=?, ~children=?) => {
    let xs = Image.(getVariantUrl(Some(img), `Xs));
    let sm = Image.(getVariantUrl(Some(img), `Sm));
    let md = Image.(getVariantUrl(Some(img), `Md));
    let lg = Image.(getVariantUrl(Some(img), `Lg));
    let xl = Image.(getVariantUrl(Some(img), `Xl));
    let original = Image.(getVariantUrl(Some(img), `Original));

    let sources = [|
      (xs, 320),
      (sm, 640),
      (md, 768),
      (lg, 1024),
      (xl, 1280),
    |];

    let maxSizeUrl =
      switch (maxSize) {
      | Some(max) =>
        switch (max) {
        | `Xs => xs
        | `Sm => sm
        | `Md => md
        | `Lg => lg
        | `Xl => xl
        | `Original => original
        }
      | None => xl
      };

    let children =
      switch (children) {
      | None => (src => <img src />)
      | Some(children) => children
      };

    <picture>
      {sources
       ->Belt.Array.mapWithIndex((i, (url, size)) =>
           switch (url) {
           | Some(url) =>
             let media = "(max-width: " ++ string_of_int(size) ++ "px)";
             <source key={string_of_int(i)} media srcSet=url />;
           | None => ReasonReact.null
           }
         )
       ->ate}
      {switch (maxSizeUrl) {
       | Some(src) => children(src)
       | None => ReasonReact.null
       }}
    </picture>;
  };
};

module RichText = {
  open Util.ReactStuff;

  type span = {
    start: int,
    end_: int,
    type_: string,
  };

  type contents = {
    text: string,
    spans: array(span),
  };

  type img = {url: string};

  type t =
    | Heading1(contents)
    | Heading2(contents)
    | Heading3(contents)
    | Heading4(contents)
    | ListItem(contents)
    | Paragraph(contents)
    | OListItem(contents)
    | Image(img)
    | Unknown(string, Js.Json.t);

  module Decode = {
    let image = json => Json.Decode.{url: json |> field("url", string)};
    let span = json =>
      Json.Decode.{
        start: json |> field("start", int),
        end_: json |> field("end", int),
        type_: json |> field("type", string),
      };

    let contents = json =>
      Json.Decode.{
        text: json |> field("text", string),
        spans: json |> field("spans", array(span)),
      };

    let richText = (json: Js.Json.t) => {
      open Json.Decode;
      let type_ = json |> field("type", string);

      switch (type_) {
      | "heading1" => Heading1(json |> contents)
      | "heading2" => Heading2(json |> contents)
      | "heading3" => Heading3(json |> contents)
      | "heading4" => Heading4(json |> contents)
      | "list-item" => ListItem(json |> contents)
      | "o-list-item" => OListItem(json |> contents)
      | "paragraph" => Paragraph(json |> contents)
      | "image" => Image(json |> image)
      | _ => Unknown(type_, json)
      };
    };

    let decode = (data: option(Js.Json.t)) =>
      switch (data) {
      | Some(data) => Json.Decode.(array(richText, data))
      | None => [||]
      };
  };

  /*
     Used for grouping ListElements / OListElements in <ul> and <ol> tags.
     The group keeps track of the list kinds the group is collecting and the
     list items as React elements itself.

     Keeping track of the kind is important for following edge case (example):
     1. Hi
     2. This
     3. Is
     - Another
     - List

     Without keeping track of the kind, we would group the OListItem and ListItem
     in one group. Also we wouldn't know if we should use an <ul> or <ol> parent.
   */
  type groupKind = [ | `Ul | `Ol];

  type group = {
    kind: groupKind,
    elements: array(ReasonReact.reactElement),
  };

  let getKind = item =>
    switch (item) {
    | ListItem(_) => `Ul
    | OListItem(_) => `Ol
    | _ => `Ul
    };

  /*
      We added an abstraction for the rendering functions because different components
      handle RichText differently. E.g. the CookingInstructions component renders huge
      numeric bullet points to signal big cooking steps, but the Hints section keeps it
      more subtle.
   */
  module type RenderT = {
    let renderItem: (~liCount: int=?, int, t) => ReasonReact.reactElement;

    let renderList:
      (~groupId: int, ~kind: groupKind, array(ReasonReact.reactElement)) =>
      ReasonReact.reactElement;
  };

  module Make = (Render: RenderT) => {
    let renderRichText = (elements: array(t)) => {
      /* Keeps track of created groups for React key attributes */
      let groupCount = ref(0);

      let newGroupId = () => {
        groupCount := groupCount^ + 1;
        groupCount^;
      };

      let isLast = i => i + 1 === Js.Array.length(elements);

      let renderList = Render.renderList;
      let renderItem = Render.renderItem;

      /* Delivers a new one-ahead List element number */
      let newLiCount = elements => Belt.Array.length(elements) + 1;

      let (result, _) =
        Belt.Array.reduceWithIndex(
          elements, ([||], None), ((acc, group), item, i) =>
          switch (group, item, isLast(i)) {
          /* If there's already some grouping going on, append any upcoming list item */
          | (Some({kind, elements}), OListItem(_) | ListItem(_), last) =>
            /* If the list kind changes or the last element is being handled, render the list */
            let currentKind = getKind(item);
            let kindChanged = currentKind !== kind;

            switch (kindChanged, last) {
            /* Render current group and last element as new list afterwards */
            | (true, true) =>
              let groupList =
                renderList(~groupId=groupCount^, ~kind, elements);
              let lastElement =
                renderList(
                  ~groupId=newGroupId(),
                  ~kind=currentKind,
                  [|renderItem(~liCount=1, i, item)|],
                );
              (Belt.Array.concat(acc, [|groupList, lastElement|]), group);
            /* Render current group and start a new group */
            | (true, false) =>
              let groupList =
                renderList(~groupId=newGroupId(), ~kind, elements);

              let newGroup = {
                kind: currentKind,
                elements: [|renderItem(~liCount=1, i, item)|],
              };

              (Belt.Array.concat(acc, [|groupList|]), Some(newGroup));

            /* Add last element to group and render the group */
            | (false, true) =>
              let groupList =
                Belt.Array.concat(
                  elements,
                  [|renderItem(~liCount=newLiCount(elements), i, item)|],
                )
                |> renderList(~groupId=newGroupId(), ~kind);

              (Belt.Array.concat(acc, [|groupList|]), None);

            /* Not at the end, kind hasn't changed; add element to group, do not render anything */
            | (false, false) =>
              let elements =
                Belt.Array.concat(
                  elements,
                  [|renderItem(~liCount=newLiCount(elements), i, item)|],
                );

              (acc, Some({kind: currentKind, elements}));
            };

          | (None, OListItem(_) | ListItem(_), last) =>
            /* If last element, don't do any grouping and render the list item directly */
            if (last) {
              (Belt.Array.concat(acc, [|renderItem(i, item)|]), None);
            } else {
              /* Start a new group, if the given list item is not the last element */
              let elements = [|renderItem(~liCount=1, i, item)|];
              (acc, Some({kind: getKind(item), elements}));
            }

          /* Stop collecting and terminate the <ul> group */
          | (Some({kind, elements}), nonListItem, _) =>
            let someList = renderList(~groupId=newGroupId(), ~kind, elements);

            let next = renderItem(i, nonListItem);
            (Belt.Array.concat(acc, [|someList, next|]), None);

          | (None, nonListItem, _) => (
              Belt.Array.concat(acc, [|renderItem(i, nonListItem)|]),
              None,
            )
          }
        );
      result->ate;
    };
  };
};

module Query = {
  %raw
  "import 'isomorphic-unfetch'";

  let api = "https://hiking.prismic.io/api";
  let endpoint = "https://hiking.prismic.io/graphql";

  exception Graphql_error(string);

  [@bs.val] external encodeURIComponent: 'a => string = "";

  module Ref = {
    [@bs.deriving abstract]
    type apiRef = {
      id: string,
      [@bs.as "ref"]
      ref_: string,
      label: string,
      isMasterRef: bool,
    };

    [@bs.deriving abstract]
    type apiResponse = {refs: array(apiRef)};

    external toApiResponse: Js.Json.t => apiResponse = "%identity";
  };

  let queryMasterRef = () =>
    Ref.(
      Bs_fetch.(
        Js.Promise.(
          fetchWithInit(api, RequestInit.make(~method_=Get, ()))
          |> then_(Fetch.Response.json)
          |> then_(data =>
               toApiResponse(data)
               ->refsGet
               ->Belt.Array.getBy(apiRef => apiRef->isMasterRefGet)
               ->resolve
             )
        )
      )
    );

  let sendQuery = q => {
    open Js.Promise;
    let vars = q##variables->Js.Json.stringify->encodeURIComponent;
    let query = encodeURIComponent(q##query);

    queryMasterRef()
    |> then_(apiRef => {
         let prismicRef =
           switch (apiRef) {
           | Some(apiRef') => apiRef'->Ref.ref_Get
           | None => ""
           };

         Bs_fetch.(
           fetchWithInit(
             endpoint ++ {j|?query=$query&variables=$vars|j},
             RequestInit.make(
               ~method_=Get,
               ~headers=
                 HeadersInit.makeWithArray([|
                   ("content-type", "application/json"),
                   ("Prismic-ref", prismicRef),
                 |]),
               (),
             ),
           )
           |> then_(resp =>
                if (Response.ok(resp)) {
                  Response.json(resp)
                  |> then_(data =>
                       switch (Js.Json.decodeObject(data)) {
                       | Some(obj) =>
                         Js.Dict.unsafeGet(obj, "data") |> q##parse |> resolve
                       | None =>
                         reject(Graphql_error("Response is not an object"))
                       }
                     );
                } else {
                  reject(
                    Graphql_error(
                      "Request failed: " ++ Response.statusText(resp),
                    ),
                  );
                }
              )
         );
       });
  };
};