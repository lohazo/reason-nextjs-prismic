open Util.ReactStuff;
open Text;

[@react.component]
let default = (~msg: string, ~name: string) =>
  <MainLayout>
    msg->s
    <H1> {(msg ++ " " ++ name ++ "!")->s} </H1>
  </MainLayout>;

let getInitialProps = _ctx =>
  Js.Promise.resolve({
    "msg": "Hello",
    "name": "WorkerConf",
  });

/*
The inject function is a workaround for adding a static class attribute to an existing component binding.
This declaration uses a `raw JS` statement, which allows the direct usage of JS. 

The function receives a component and the getInitialProps function for the assignment.
This is type-safe, that means you will get very lengthy type mismatch errors if you are
resolving a JS object which does not fulfill the shape of your React component props.

So whenever you get an error caused by this, look closely on your props usage and check if
you are using the values with the right type assumptions. Don't look for errors in the type-checking,
you are probably just trying to access a nullable property without using a pattern-match ;-)
*/
let inject: (React.component(Js.t('a)), Next.getInitialPropsFn('a)) => unit = [%bs.raw
  {| (cls, fn) => cls.getInitialProps = fn |}
];


inject(default, getInitialProps);