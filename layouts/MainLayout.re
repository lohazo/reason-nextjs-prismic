%raw
"require('../styles/main.css')";

open Util.ReactStuff;
module Link = Next.Link;

module Navigation = {
  [@react.component]
  let make = () =>
    <nav
      className="p-2 h-12 flex border-b border-gray-200 justify-between items-center text-sm">
      <Link href="/">
        <a className="flex items-center w-1/3">
          <img className="w-8" src="/static/worker-logo.png" />
          <span className="text-xl ml-2 align-middle font-semibold">
            "Reason"->s
            <span className="text-orange-800"> "Workshop"->s </span>
          </span>
        </a>
      </Link>
      <div className="flex w-2/3 justify-end">
        <Link href="/"> <a className="px-3"> "Home"->s </a> </Link>
        <Link href="/hiking">
          <a className="px-3"> "Hiking App"->s </a>
        </Link>
        <Link href="/help"> <a className="px-3"> "Help"->s </a> </Link>
      </div>
    </nav>;
};

[@react.component]
let make = (~children) => {
  let minWidth = ReactDOMRe.Style.make(~minWidth="20rem", ());
  <div style=minWidth className="flex lg:justify-center mb-32">
    <div className="max-w-5xl w-full lg:w-3/4 text-gray-900 font-base">
      <Navigation />
      <main className="mt-4 mx-4 max-w-3xl">
        <Mdx.Provider components=Mdx.components> children </Mdx.Provider>
      </main>
    </div>
  </div>;
};