+++
date = '2025-11-19T12:15:32-06:00'
draft = false
title = "Confidant: Your configuration pal"
+++

The past few weeks, I've been working diligently on a program called 
*Confidant*. I started writing it due to being unsatisfied with the options
available for dotfile management. I've tried a number of solutions, [GNU Stow](https://gnu.org/software/stow),
[Ansible](https://redhat.com/en/ansible-collaborative), [Chezmoi](https://chezmoi.io) and [Yadm](https://yadm.io) just to name a few. All of these left me 
wanting for one reason or another, whether it be a lack of features or an 
over-abundance of them.

## What does it do?

It combines the practical symlink-based approach of GNU Stow with simple (but 
powerful) templating syntax inspired by Ansible to provide a focused, fast and 
easy to use solution.

It uses comfortable configuration syntax (provided by [libucl](https://github.com/vstakhov/libucl)), to define 
symbolic link paths from your repository directory to the locations they 
expected to be.

## Why choose it over *X*, *Y* or *Z*?

You would like **Confidant** if you feel that your current solution does
either too much or too little; it's meant to be a sort of *Goldilocks* of 
dotfile management. It has no special state management, no specific integration 
with a version control system (not everyone uses `git`), and no encryption 
(because keeping your config files and keys together is bad practice).
It makes a symlink from point A to point B, with some nice quality of 
life features along the way.

## How can I get it?

The easiest way you can get **Confidant** by going to the [releases page](https://codeberg.org/wreedb/confidant/releases) 
and downloading a binary, however there are other options as well. For users of 
the [Nix](https://nixos.org) package manager, you can try the flake directly 
with `nix run git+https://codeberg.org/wreedb/confidant.git -- --help`.

If you prefer to build things manually like myself, you can see the [INSTALL.md](https://codeberg.org/wreedb/confidant/src/branch/main/INSTALL.md)
document in the source repository for specific build instructions and requirements.

After that, if you have questions about how to use it, you should go to the 
[website](https://wreedb.github.io/confidant), where everything you need to know is 
documented.
