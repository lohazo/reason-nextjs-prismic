open Util.ReactStuff;

[@react.component]
let make = (~color: string) => {
  let (count, setCount) = React.useState(_ => 0);

  let color =
    switch (color) {
    | "red" => "red"
    | "blue" => "blue"
    | "yellow" => "yellow"
    | _ => "pink"
    };

  let grade =
    switch (count) {
    | 0
    | 1 => "200"
    | 2
    | 3 => "300"
    | 4
    | 5 => "400"
    | _ => "900"
    };

  let className = {j|bg-$color-$grade w-32 h-32|j};

  <div className>
    <button onClick={_evt => setCount(_state => count + 1)}>
      "PLUS"->s
    </button>
    {count->string_of_int->s}
    <button onClick={_evt => setCount(_state => count - 1)}>
      "MINUS"->s
    </button>
  </div>;
};
