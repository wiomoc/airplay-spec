let
  pkgs = import <nixpkgs> {};
in
  with pkgs;
  pkgs.stdenv.mkDerivation {
    name = "airplay-spec";
    src = ./.;
    buildInputs = [mdbook boot jdk12];
}
