+++
date = '2025-09-09T14:51:55-05:00'
draft = false
title = 'My LFS journey'
+++

Daily Driving Linux From Scratch
================================

For about a month now, I've been using a fully custom version of Linux
that I built using the instructions from [LFS](https://linuxfromscratch.org).
I don't feel it's right to call it *LFS*, since it deviates quite heavily from
the instructions provided by the LFS authors. However, the guidance of their writings
is immensely valuable.

Motivation
----------

My reason for setting out to create this system was born from the fact that the system I
was looking for did not exist. This is surprising given the comically high number of different
Linux distributions there are to choose from. For one reason or another, nothing seemed to fit
the description of what I wanted.

The system I wanted could be described as a very minimal base for a [GNU](https://gnu.org)-oriented system
that I could build on top of. Many very minimal Linux distributions deviate from this. They might use
[Musl](https://musl-libc.org) as the systems' C library, a BSD set of shell utilities or the [LLVM](https://llvm.org) toolchain.
In many ways these systems can be very competent, but as a GNU enthusiast and libre software advocate, these
systems deviate in exactly the kind of ways that I morally cannot get behind.

Building Blocks
---------------

The pillars of my system are:

#### [The GNU C library (GLIBC)](https://sourceware.org/glibc)
The library, the myth, the legend: GLIBC is the undisputed king
of Unix(-like) system C libraries. It's incredibly mature, stable
and like many GNU projects, has excellent internationalization support.

#### [GNU Compiler Collection (GCC)](https://gcc.gnu.org)
The main system C/C++ compiler, which also provides frontends to compile
Fortran, Ada, Go, Modula-2, Objective-C/C++, D, Rust and Cobol. Additionally,
it contains the GNU C++ library, `libstdc++`.

#### [GNU Binutils](https://sourceware.org/binutils)
The complement to GCC, a package of binary tools such as the system
linker, assembler and archiver among others.

#### [GNU Shepherd](https://gnu.org/software/shepherd)
The service manager and init system of GNU Guix, which I am quite proud
to have managed to set up on my system, as Guix is the only distribution
that officially supports it. It is configured using [Guile Scheme](https://gnu.org/software/guile).

#### [The GNU Coreutils](https://gnu.org/software/coreutils)
The classic, well-known command-line utilities we all know and love.

#### [Bash](https://gnu.org/software/bash)
The main system shell; used extensively across many distributions of
GNU/Linux as the default user shell. Tried and true.

Package Management
------------------

One of the things that systems like *LFS* do not provide is a package manager.
However, I figured that if I want to use this system for any significant amount of
time, I need *something*.

So I got to work on a set of shell scripts. The main process is:

1. Build a package
2. Use things like `DESTDIR=` to do a *fake* staged install of the package
3. Use my shell scripts to generate a manifest of the contents of the package
   into a file name `.manifest`
4. Write the name of the package and its version to a file named `.data`
5. If I know there are things I'd want to run upon install/uninstall,
   write the commands to either `.post-in` or `.post-rm`.
6. If the package contains directories that I know can be safely removed when I
   uninstall it, add the paths of each directory to `.dirs`
7. Invoke the `archive` function of my shell scripts to create a
   `.tar.gz` of the package
8. Invoke the `install` function to:
  + Unpack the archive against my root directory
  + Execute commands from `.post-in` if present
  + Run a few "hooks", such as updating the linker cache with `ldconfig`
  + Write the contents of `.data` to my `world` file
9. If there is a problem, I run the `remove` function to:
  + Remove all of the files from the manifest
  + Remove the directories from `.dirs` (only if they are empty)
  + Execute commands from `.post-rm` if present

Despite being roughly 100 total lines of shell code, it's surprising
competent for managing software, and has saved me from at least two
problematic package installations.

Is it usable?
-------------

Yes, very much so. With the methods of managing my system that I've described.
I have been able to cleanly upgrade packages without worries, and things have
just been very stable. I've gone through 3 Linux kernel and 1 GLIBC upgrades
without destroying my system, as well as a full downgrade from LLVM 21.1.0 to
19.1.7, which would've been genuinely impossible without my package management
scripts.

What is it running?
-------------------

It's currently running the [Niri](https://github.com/yalter/niri) Wayland compositor,
[Kitty](https://github.com/kovidgoyal/kitty) terminal, Mozilla Firefox, and the
[AppArmor](https://apparmor.net) Linux security module. All things considered I'd
say it is a fully featured setup, especially given the fact that it was built
entirely by myself.

Sometimes, you have to make your own path
-----------------------------------------

I was frustrated; I tried many different Linux distributions in pursuit of
one that fulfilled what this system does, but in the end it's clear that making
it myself was not only the only option, but a very rewarding one too.
