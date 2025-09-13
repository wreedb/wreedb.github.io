+++
date = '2025-09-12T17:43:12-05:00'
draft = false
title = "You shouldn't use software from the UUtils project"
+++

Why you shouldn't use software from the **uutils** project
========================================================

[Uutils](https://github.com/uutils) is a [Rust](https://rust-lang.org)-oriented software development project 
who are responsible for the popular [coreutils](https://github.com/uutils/coreutils) reimplementation. For those who are
unaware, *Coreutils* is a GNU project which contains programs such as *ls*, *cp*, *mv*, *rm*, *dd*, *wc* along with many 
others. There are a number of implementations of this group of utilities, such as (but not limited to):
- [BusyBox](https://busybox.net)
- [Toybox](https://landley.net/toybox)
- [9base](https://tools.suckless.org/9base)
- [BSDUtils](https://codeberg.org/dcantrell/bsdutils)
- [ChimeraUtils](https://github.com/chimera-linux/chimerautils)

A set of software analogous to these is essential on any Unix or Unix-adjacent system. They provide the 
most basic level of system control and manipulation which one would expect to have available. The most 
common implementations of these tool are the [GNU Coreutils](https://gnu.org/software/coreutils) and *BusyBox* implementations.

History
-------
The GNU Coreutils have been around for many years, originally comprised of a handful of separate 
projects which were known as *Fileutils* (1990, David MacKenzie), *Shellutils* and *Textutils* (1991, David MacKenzie).
The projects, which became known as *Coreutils* (2003), and have been maintained by Jim Meyering for the entirety of
their existence. The project was originally licensed under the [GNU General Public License, Version 2](https://gnu.org/licenses/gpl-2.0.html), though 
it was relicensed to [Version 3](https://gnu.org/licenses/gpl-3.0.html) in 2007.

The Problem
-----------
The purpose of the *UUtils* project, as stated on the [README](https://github.com/uutils/coreutils/blob/main/README.md) is as follows:
> uutils coreutils aims to be a drop-in replacement for the GNU utils. Differences with GNU are treated as bugs.

They idea is to be a 1:1 replacement, even going as far as using the GNU Coreutils test suite to detect differences in behavior.
UUtils, unlike Coreutils, is licensed under a "permissive" software license, that being the [MIT license](https://spdx.org/licenses/MIT.html).
In contrast, Coreutils uses the GPL version 3.0, a strong "copyleft" license.

While many people may hold the belief that licenses such as the MIT and BSD family of licenses are "more free" than
their copyleft counterparts like the GPL and MPL, there are nuances that should not be overlooked.

Freedom
-------
Free software is a very poor way to describe the subject, but the name has stuck after all these years. I won't 
humor the idea that the *free as in beer* analogy is useful here; I will instead describe it as it is in a more 
explicit sense. *Free* software is software created with strong principles of freedom in mind.

One of the most important parts of preserving freedom is to ensure that individuals and groups cannot 
encroach on the freedoms of others. In a technological landscape ruled by companies such as Meta, 
Amazon, Google and Apple; it becomes very easy to see where most of the power in software resides.

One of the many ways that corporate interest exerts its' power over the world of software is 
by funding developers and projects which may benefit their goals. Google supports the development 
of projects such as ToyBox, which is the implementation of a Coreutils style package that is 
used in Android (and is licensed permissively under the MIT license). Companies often steer 
clear of software that use copyleft licenses, as it would not allow them to derive something 
from it and re-license it in a manner that restricts it's  source code. Often when a company 
creates such a derivative work; the funding, resources and momentum of their project will outmatch 
the original project quickly.

This typically results in their closed implementation to become more widespread and for the 
original to wither from a lack of resources to keep up. This is commonly known as ***EEE***: embrace, 
extend and extinguish. A very recent example of this is [Redis](https://redis.io), which serves 
as a masterclass in corporate manipulation of narratives.

Many cloud platforms like Amazon's AWS and Google's GCP offered extended support over Redis database 
infrastructure for years while contributing very little back to Redis. This led the team behind 
Redis to augment their licensing, such that it wouldn't be as easy for corporate entities to 
take advantage of their work without contributing back or supporting Redis. When they changed the 
license, everywhere you looked, the general sentiment was that *Redis isn't free anymore!*, despite 
it's usablility being completely unchanged for individuals.

This became the genesis of a derivative work called *Valkey*. Valkey has backing and contributions 
from many corporate entities such as Alibaba, Amazon, Ericsson, Google, Huawei and Tencent. Even the 
[Arch Linux](https://archlinux.org) team, who really should know better than to be tricked by this 
narrative manipulation have pivoted to supporting Valkey, and completely dropping support for Redis.

When a project is licensed under a strong copyleft license like the GPL 3.0, this is not legally 
possible. The derived works are required to use the same license as the original project. It 
ensures that the software remains free, regardless of *who* is distributing it.

Enabling Corporate Tyranny
--------------------------

Licenses like the MIT are often encouraged by companies, and it's not a coincidence why. These 
permissive licenses enable them to take advantage of and exploit the work of good people who 
devote their time making software for personal satisfaction or for the benifit of the greater 
ecosystem.

Often this sentiment is seen as some sort of *tinfoil-hat* conspiracy, or that using copyleft 
licenses just make using the software a hassle for other developers, but this couldn't be further 
from the truth. Using copyleft licenses should be seen as a show of empathy for other developers. 
I know that many people do not understand why the licensing specifics matter, but I cannot in good 
conscience contribute to the rampant corporate exploitation.

Personally, I'd go as far as stating that if you would refuse to support or use software that 
is under a copyleft license such as the GPL, you are not a good person (or are at least ignorant
to the ways in which it protects us).

A Comparison to Privacy
-----------------------

Online privacy has become (practically) impossible over the last 15 years, and everyone now understands 
why this is the case; *we* are the product. It is my view that not caring about your privacy online is 
not only self-sabotaging, but an immense show of privilege. Having "nothing to hide" is not a reason to 
disregard privacy. By disregarding your own privacy, you contribute to the difficulty of obtaining privacy 
for those who *really* need it. Whistleblowers and journalists are two good examples of people who 
may need online privacy, and by collectively allowing ourselves to have no privacy at all, it only makes 
it more unlikely that privacy can be attained by anyone.

Choosing to use permissive licenses is a similar show of privilege. By allowing your software to be taken 
advantage of and exploited by corporate interest, it gives companies more and more power over the software 
ecosystem.

Conclusion
----------

I don't let the reasons for not using licenses which protect the rights of **people** get lost in 
the implementation details. What are you prioritizing here? Do you care more about people? Or do you 
care more about what will potentially help you make money? The argument I'm making will land on deaf 
ears when read by those not acting in good faith. I refuse to normalize taking a harmful stance 
on software licensing just because it's common. You might be the type to avoid political issues, but 
if you choose to use permissive licenses, your choice ***is*** political; the real question is whether 
or not you think you should be conscious of this political choice you've already made.


Do you care more about people or companies?
