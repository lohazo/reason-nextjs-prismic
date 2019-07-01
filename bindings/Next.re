type getInitialPropsFn('a) =
  {
    .
    "query": Js.Dict.t(string),
    "req": Js.Nullable.t(Js.t('a)),
  } =>
  Js.Promise.t(Js.t('a));

module Link = {
  [@bs.module "next/link"] [@react.component]
  external make:
    (
      ~href: string=?,
      ~_as: string=?,
      ~prefetch: bool=?,
      ~replace: option(bool)=?,
      ~shallow: option(bool)=?,
      ~passHref: option(bool)=?,
      ~children: React.element
    ) =>
    React.element =
    "default";
};

module Router = {
  type props = {. "router": {. "query": Js.Dict.t(string)}};

  [@bs.module "next/router"]
  external withRouter: (props => React.element) => React.element = "";
};

module Head = {
  [@bs.module "next/head"] [@react.component]
  external make: (~children: React.element) => React.element = "default";
};

module Error = {
  [@bs.module "next/head"] [@react.component]
  external make: (~statusCode: int, ~children: React.element) => React.element =
    "default";
};
