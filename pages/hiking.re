%raw
"require('../styles/main.css')";

open Util.ReactStuff;

module ResponsiveImage = Prismic.ResponsiveImage;
module Image = ResponsiveImage.Image;

type spot = {
  name: option(string),
  preview_image: option(Js.Json.t),
  short_description: option(string),
};

module QueryAllHikingSpots = [%graphql
  {|
  query {
    allHikingSpots {
    edges {
      hikingSpot: node @bsRecord {
        name
        preview_image
        short_description
      }
    }
  }
  }
  |}
];

module HikingCard = {
  [@react.component]
  let make =
      (
        ~name: string="",
        ~img: option(Image.t)=?,
        ~short_description: string="",
      ) =>
    <div>
      {switch (img) {
       | Some(img) => <ResponsiveImage img maxSize=`Xs/>
       | None => ReasonReact.null
       }}
      <div> name->s </div>
      <div> short_description->s </div>
    </div>;
};

[@react.component]
let default = (~hikingSpots: array(spot)) =>
  <MainLayout>
    {hikingSpots
     ->Belt.Array.map(spot => {
         let {name, short_description} = spot;
         let img: option(Image.t) = spot.preview_image->Obj.magic;
         <HikingCard ?img ?name ?short_description />;
       })
     ->ate}
  </MainLayout>;

let getInitialProps = _ctx => {
  open Js.Promise;

  let q = QueryAllHikingSpots.make();

  Prismic.Query.sendQuery(q)
  |> then_(data => {
       let allHikingSpots =
         Belt.Option.mapWithDefault(data##allHikingSpots##edges, [||], edges =>
           Belt.Array.keepMap(edges, edge =>
             Belt.Option.map(edge, e => e##hikingSpot)
           )
         );
       resolve({"hikingSpots": allHikingSpots});
     })
  |> catch(error => {
       Js.log2("Error while fetching hikingspots: ", error);
       reject(Not_found);
     });
};

let inject: (React.component(Js.t('a)), Next.getInitialPropsFn('a)) => unit = [%bs.raw
  {| (cls, fn) => cls.getInitialProps = fn |}
];

inject(default, getInitialProps);
