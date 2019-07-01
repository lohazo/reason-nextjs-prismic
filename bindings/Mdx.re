module Components = {
  type props = {. "children": ReasonReact.reactElement};

  [@bs.deriving abstract]
  type t = {
    [@bs.optional]
    p: React.component(props),
    [@bs.optional]
    li: React.component(props),
    [@bs.optional]
    h1: React.component(props),
    [@bs.optional]
    h2: React.component(props),
    [@bs.optional]
    h3: React.component(props),
    [@bs.optional]
    h4: React.component(props),
    [@bs.optional]
    h5: React.component(props),
    [@bs.optional]
    ul: React.component(props),
    [@bs.optional]
    ol: React.component(props),
    [@bs.optional]
    inlineCode: React.component(props),
    [@bs.optional]
    code: React.component(props),
    [@bs.optional]
    pre: React.component(props),
    [@bs.optional]
    a: React.component({."children": ReasonReact.reactElement, "href": string}),
  };
};

open Text;
let components =
  Components.t(
    ~p=P.make,
    ~h1=H1.make,
    ~h2=H2.make,
    ~h3=H3.make,
    ~ol=Ol.make,
    ~a=A.make,
    ~ul=Ul.make,
    ~li=Li.make,
    ~inlineCode=InlineCode.make,
    ~pre=Pre.make,
    (),
  );

module Provider = {
  [@bs.module "@mdx-js/react"] [@react.component]
  external make:
    (~components: Components.t, ~children: ReasonReact.reactElement=?) =>
    React.element =
    "MDXProvider";
};