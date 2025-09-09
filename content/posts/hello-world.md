+++
date = '2025-06-09T16:04:08-05:00'
draft = false
title = 'Shepherd'
+++

I replaced my init system with GNU Shepherd
===========================================
Why? For fun of course.

## How it started
--------------
I've tried GNU Guix a few times, and I've always found it to be a very
interesting project. For those who aren't familiar, Guix is similar to Nix;
It is a package manager and operating system (built on top of the package manager).
It's declaratively configured similar to Nix, module based, and offers similar
reproducibility that Nix does. However the community is much smaller by comparison
for a number of reasons (such as being terminally afraid of freedom and... <*clutches pearls*>
copyleft licenses!).

Despite having returned to another distribution that I'm more comfortable with,
I kept thinking about whether or not it would be possible to use Shepherd outside
of the Guix distribution. I thought about it more and more, realizing that I'm
probably the only person wondering this; so I decided to do it myself.

## The process
### 1: What's the bare minimum I need?
The first step was identifying what my current init system's capabilities were;
on Void linux, (Runit)[https://smarden.org/runit] is the supported service manager
and init system. I started by writing Shepherd services based on the existing services
I was using. Services such as NetworkManager, `getty` on at least 6 tty's, DBUS, etc.

### 2: What's the *first* thing that happens on boot?
I knew that Runit was starting a set of numbered shell scripts to handle early
things like mounting pseudo-filesystems, applying the needed keyboard layout, bringing
up the network interfaces, and creating volatile temporary directories; so I started
implementing theses scripts on my own.

### 3: Where does Shepherd come in?
Well, If I just make a shell script called `init`, place it where it needs to be,
and have it execute the early boot scripts; then I can just have it hand over the
process to Shepherd with `exec`.

### 4: Putting the rest of puzzle pieces together
The trial and error phase begins; power on my laptop, examine the status of my services,
modify the configuration, reboot. Things were very functional in even the first
iteration, but I wasn't really happy with it yet, it needed more polishing. After
continuous iteration through the course of about 3 days, and things not only worked well,
but I'd even made them look nice as well.

## So, what's it like?
It just works I suppose, it does it's job. I haven't ran into any obvious service
management problems over the weeks that I've been using it. The command line tool
`herd` for interacting with Shepherd is very comfortable as well. It
supports the things you would expect; enable/disable, start/stop, reload, but it also
has some neat functionality like the `doc` and `graph` subcommands. `doc` allows you
to view descriptions of a service and/or it's actions, and `graph` outputs data in
`dot` format (usable with programs like GraphViz), so that you can inspect the
dependencies of services on your system.

## How about the language?
I've grown fond of lisp-like languages over the years, and I've especially began to
like Guile scheme. It may not be the most *normal* way to configure a service manager,
but now that I've really given it a proper chance, I see the appeal.
```scheme
(define dbus
  (service '(dbus dbus-daemon) ;; it can be called by either name listed here
    #:documentation "System IPC Framework" ;; this would show up for 'herd doc dbus'
    #:start (make-forkexec-constructor '("dbus-daemon" "--system" "--nofork"))
    #:stop (make-kill-destructor)
    #:respawn? #t)) ;; It'll be respawned if it dies

(register-services (list dbus))
(start-service dbus)
```
This is essentially the life-cycle of a service in Shepherd, definition, registration
and running. Or you can put all of your services into a list and run them all at once:
```scheme
(define services
  (list udev
        dbus
        network-manager
        sshd
        elogind
        polkit
        syslog-ng))

;; register them all
(register-services services)

(map start-service services)
```

## Not sold on Shepherd?
Yeah, that's okay; it's obvious to even a nerd like myself that it isn't for
everyone. I wrote this all and documented my journey, but not really as a way
to convince anyone to use it. I had little to no resources to work with when trying
to figure this out. It's typical of service managers like this to not have documentation
about how it might be adapted to a system; instead the typical sentiment is something
similar to:
> Don't try to install this on your system! It will break it!

Im sure for many people this is a sensible warning, but for those like myself,
it would be nice to have something like this:
> Well, if you're gonna do it anyway, here are some tips/ideas

With all that being said, I wanted to provide something for anyone who follows
to have something to reference. I know I would've appreciated it. The reference
materials I put together are on [my github page](https://github.com/wreedb/void-shepherd).
