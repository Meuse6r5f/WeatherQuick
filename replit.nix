{ pkgs }: {
  deps = [
    pkgs.mc
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}